import api from "@/api"
import { handleApiError } from "@/utils/handleApiError"
import getTokenHeader from "@/utils/getTokenHeader"


export const fetchAllcategories = async () => {
    try{
        const res = await api.get(`/category/`, {
            headers: getTokenHeader(),
        }) 
        return res.data
    }catch (error){
        handleApiError(error, "Failed to fecth categori id");
    }
}

export const fetchAllcategoriesById = async (id: number) => {
    try{
        const res = await api.get(`/category/${id}`, {
            headers: getTokenHeader(),
        }) 
        return res.data
    }catch (error){
        handleApiError(error, "Failed to fecth categori id");
    }
}
export const createCategory = async (data: {name: string; description?: string}) => {
    try{
        const res = await api.post('/category', data,{
            headers: getTokenHeader(),
        }) 
        return res.data;
    }catch (error){
        handleApiError(error, "Failed to fecth category id");
    }
}
export const upddateCategory = async (id: number, data: {name: number; description?: string}) => {
    try{
        const res = await api.put(`/category/${id}`, data, {
            headers: getTokenHeader(),
        }) 
        return res.data
    }catch (error){
        handleApiError(error, "Failed to fecth categories");
    }
}
export const deleteCategory = async (id: number) => {
    try{
        const res = await api.delete(`/category/${id}`, {
            headers: getTokenHeader(),
        }) 
        return res.data
    }catch (error){
        handleApiError(error, "Failed to fecth categories");
    }
}