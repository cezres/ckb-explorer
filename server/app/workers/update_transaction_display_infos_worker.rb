class UpdateTransactionDisplayInfosWorker
  include Sidekiq::Worker
  sidekiq_options retry: false, queue: "transaction_info_updater", lock: :until_executed

  def perform(ckb_transaction_ids)
    ckb_transactions = CkbTransaction.where(id: ckb_transaction_ids)

    CkbSync::Persist.update_ckb_transaction_display_infos(ckb_transactions)
  end
end
