require "test_helper"

class UpdateTransactionDisplayInputsWorkerTest < ActiveSupport::TestCase
  setup do
    Sidekiq::Testing.fake!
  end

  test "prevents duplicate jobs" do
    block = create(:block, :with_block_hash)
    ckb_transactions = create_list(:ckb_transaction, 10, block: block)

    assert_not_nil UpdateTransactionDisplayInfosWorker.perform_async(ckb_transactions.pluck(:id))
    assert_nil UpdateTransactionDisplayInfosWorker.perform_async(ckb_transactions.pluck(:id))
  end

  test "queuing in the transaction_info_updater" do
    block = create(:block, :with_block_hash)
    ckb_transactions = create_list(:ckb_transaction, 10, block: block)

    UpdateTransactionDisplayInfosWorker.perform_async(ckb_transactions.pluck(:id))

    assert_equal 1, Sidekiq::Queues["transaction_info_updater"].size
    assert_equal "UpdateTransactionDisplayInputsWorker", Sidekiq::Queues["transaction_info_updater"].first["class"]
  end

  test "should invoke update_ckb_transaction_display_inputs function in CkbSync::Persist" do
    Sidekiq::Testing.inline! do
      block = create(:block, :with_block_hash)
      ckb_transactions = create_list(:ckb_transaction, 10, block: block)
      CkbSync::Persist.expects(:update_ckb_transaction_display_infos).with(ckb_transactions).once
      UpdateTransactionDisplayInfosWorker.perform_async(ckb_transactions.pluck(:id))
    end
  end
end
