"use client";
import { TransaksiProps } from "@/interfaces"
import React, {useState, useEffect}from "react"
import { CategoryOption, TransactionFormData } from "@/interfaces/ITransaction"
import { fetchAllcategories } from "@/services/category"
import converNumRupiah from "@/utils/convertNumRupiah"

const TransactionForm = () => {
    const [form, setForm] = useState<TransactionFormData>({
        type: "expense",
        amount: "",
        date: new Date().toISOString().slice(0, 10),
        note: "",
        categoryId: "",
    });

    const [categories, setCategories] = useState<CategoryOption[]>([]);

    const loadCategories = async () => {
        try{
            const res = await fetchAllcategories();
            setCategories(res.data)
        } catch(error) {
            if(error instanceof Error) {
                console.error({ message: error.message, type: "danger"});

            } else{
                console.error({ message: "Terjadi kesalahan", type: "danger"})
            }
        }
    }

    useEffect(() => {
        loadCategories();
    }, [])

    return(
        <form action="" className="space-y-4 max-w-xl">
            <div>
                <label htmlFor="jumlah" className="block mb-1 text-sm">Jumlah</label>
                <select 
                name="type" 
                value=""
                className="w-full border px-3 py-2 rounded"
                >
                    <option value="income">Pemasukan</option>
                    <option value="expense">Pengeluaran</option>

                </select>
            </div>
            
            <div>
                 <label htmlFor="tanggal" className="block mb-1 text-sm">Tanggal</label>
                 <input type="date" 
                 name="date"
                 value=""
                 className="w-full border px-3 py-2 rounded"
                 placeholder="contoh: Rp: 10.000"
                 required/>
                
            </div>
            <div>
                 <label htmlFor="catatan" className="block mb-1 text-sm">Catatan</label>
                 <input type="text" 
                 name="note"
                 value=""
                 className="w-full border px-3 py-2 rounded"
                 placeholder="contoh: Rp: 10.000"
                 required/>
                
            </div>
            <div>
                 <label htmlFor="catatan" className="block mb-1 text-sm">Catatan</label>
                    <select name="categoryId"
                            className="w-full border px-3 py-2 rounded"
                            required
                    >

                        <option value="">-- Pilih Kategori --</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                        
                    </select>
                
            </div>

            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Simpan
            </button>
        </form>
    )
}

export default TransactionForm;