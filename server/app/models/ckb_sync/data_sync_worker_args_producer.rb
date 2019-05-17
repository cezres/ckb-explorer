module CkbSync
  class DataSyncWorkerArgsProducer
    include Concurrent::Async

    def initialize(current_sync_numbers)
      super()
      @current_sync_numbers = current_sync_numbers
    end

    def produce_sync_numbers(numbers)
      numbers.each do |number|
        @current_sync_numbers << number
      end
    end
  end
end
