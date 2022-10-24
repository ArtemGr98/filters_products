import {instance} from "./instance"

export const productsApi = {
    getProducts: ({currentPage, data_from, data_to, price_from, price_to, title}) => {
        return  instance.get(`/products?page=${currentPage}&from=${data_from}&to=${data_to}&price_from=${price_from}&price_to=${price_to}&title=${title}`)
    }
}