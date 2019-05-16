module CkbSync
  class BlockHashConsumer
    include Concurrent::Async

    def initialize(current_block_numbers, worker_name, current_round_key)
      super()
      @current_block_numbers = current_block_numbers
      @worker_name = worker_name
      @current_round_key = current_round_key
    end

    def sync_block(block_hashes)
      block_hashes.each do |block_hash|
        CkbSync::Persist.call(block_hash)
      end
    end

    def validate_block(block_hashes)
      block_hashes.each do |block_hash|
        CkbSync::Validator.call(block_hash)
      end
    end

    def consume_block_hashes(ivars)
      timer_task =
        Concurrent::TimerTask.new(execution_interval: 1) do |task|
          if ivars.all?(&:complete?) && @current_block_numbers.empty?
            Rails.cache.delete(@current_round_key)
            task.shutdown && (return)
          end
          if @current_block_numbers.size >= 100 || ivars.all?(&:complete?)
            args = @current_block_numbers.shift(100)
            if @worker_name == "SaveBlockWorker"
              async.sync_block(args)
            else
              async.validate_block(args)
            end
          end
        end
      timer_task.add_observer(TaskObserver.new)
      timer_task.execute
    end

    class TaskObserver
      def update(_time, result, _error)
        return if result

        Rails.cache.delete(@current_round_key)
      end
    end
  end
end
