module CkbSync
  class InauthenticSync
    class << self
      def sync_node_data(inauthentic_sync_numbers)
        sync_number_arr = Concurrent::Array.new
        ivars =
          inauthentic_sync_numbers.each_slice(1000).map do |numbers|
            worker_args_producer = CkbSync::DataSyncWorkerArgsProducer.new(sync_number_arr)
            worker_args_producer.async.produce_sync_numbers(numbers)
          end

        worker_args_consumer = CkbSync::BlockHashConsumer.new(sync_number_arr, "SaveBlockWorker", "current_inauthentic_sync_round")
        worker_args_consumer.consume_block_hashes(ivars)
      end
    end
  end
end
