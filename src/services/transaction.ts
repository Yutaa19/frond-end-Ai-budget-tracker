import api from '@/api'
import { handleApiError } from '@/utils/handleApiError'
import getTokenHeader from '@/utils/getTokenHeader'

export const fecthTransaction = async (page = 1, limit = 10, seacrh = "") => {
    try {
        const params = new URLSearchParams({ page:String(page), limit: String(limit)});
        if(seacrh) params.append("search", seacrh);

        const res = await api.get(`/transaction?${params.toString()}`, {
            headers: getTokenHeader(),
        })
        return res.data
    } catch(error) {
        handleApiError(error, "Transaction Error")
    }
}
export const fecthTransactionById = async (id: number) => {
    try {
        const res = await api.get(`/transaction?${id}`, {
            headers: getTokenHeader(),
        })
        return res.data
    } catch(error) {
        handleApiError(error, "Transaction Error")
    }
}

export const createTransaction = async (data: Record<string, unknown>) => {
    try {
        const res = await api.post(`/transaction`, data, {
            headers: getTokenHeader(),
        })
        return res.data
    } catch(error) {
        handleApiError(error, "Transaction Error")
    }
}
export const editTransaction = async (id: number, data: Record<string, unknown>) => {
    try {
        const res = await api.put(`/transaction/${id}`, data, {
            headers: getTokenHeader(),
        })
        return res.data
    } catch(error) {
        handleApiError(error, "Transaction Error")
    }
}
export const deleteTransaction = async (id: number) => {
    try {
        const res = await api.delete(`/transaction/${id}`, {
            headers: getTokenHeader(),
        })
        return res.data
    } catch(error) {
        handleApiError(error, "Transaction Error")
    }
}

export const fecthMonthlySummary = async (id: number) => {
    try {
        const res = await api.get(`/transaction/monhtly-summary`, {
            headers: getTokenHeader(),
        })
        return res.data
    } catch(error) {
        handleApiError(error, "Transaction Error")
    }
}

export const fecthMonthlyChart = async (id: number) => {
    try {
        const res = await api.get(`/transaction/monhtly-chart`, {
            headers: getTokenHeader(),
        })
        return res.data
    } catch(error) {
        handleApiError(error, "Transaction Error")
    }
}

export const fecthTodayTransaction = async () => {
    try {
        const res = await api.get(`/transaction/today-transaction`, {
            headers: getTokenHeader(),
        })
        return res.data
    } catch(error) {
        handleApiError(error, "Transaction Error")
    }
}

export const fecthTotalExpenseStat = async () => {
    try {
        const res = await api.get(`/transaction/today-expense-stats`, {
            headers: getTokenHeader(),
        })
        return res.data
    } catch(error) {
        handleApiError(error, "Transaction Error")
    }
}
