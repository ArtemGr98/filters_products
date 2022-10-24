import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {productsApi} from "../api/productsApi";
const initialState = {
    status: null,
    error: null,
    productsData: {
        data: [],
        last_page: null,
    },
    filters: {
        data_from: '',
        data_to: '',
        price_from: '',
        price_to: '',
        title: '',
        currentPage: 1
    }
}
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload}
        },
        setProducts: (state, action) => {
            state.productsData.data = [...action.payload.data]
            state.productsData.last_page = action.payload.last_page
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductsAsync.pending, (state) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(getProductsAsync.fulfilled, (state) => {
                state.status = 'fulfilled'
            })
            .addCase(getProductsAsync.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
            })
    },
})

export const { setProducts, setFilters } = productsSlice.actions

export const getProductsAsync = createAsyncThunk(
    'products/getProductsAsync',
    async (_, {getState, dispatch, rejectWithValue}) => {
        try {
            const filters = getState().products.filters
            const response = await productsApi.getProducts(filters)
            dispatch(setProducts(response.data))
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export default productsSlice.reducer