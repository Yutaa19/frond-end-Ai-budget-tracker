import TransactionForm from "@/pages/Transactionform"

export default function CreateTransactionPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Buat Transaksi Baru</h1>
            <TransactionForm />
        </div>
    )
}