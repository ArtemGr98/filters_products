import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {authApi} from "../api/authApi"
import {setFilters, setProducts} from "./productsSlice";

const initialState = {
    status: null,
    error: null,
    user: {
        email: null,
        id: null,
        name: null,
        profile_image: null,
        isAuth: false
    }
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = {
                email: action.payload.email,
                id: action.payload.id,
                name: action.payload.name,
                profile_image: action.payload.profile_image,
                isAuth: action.payload.isAuth
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(authMeAsync.pending, (state) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(authMeAsync.fulfilled, (state) => {
                state.status = 'fulfilled'
            })
            .addCase(authMeAsync.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
            })
    },
})

export const { setAuth } = authSlice.actions

export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async (loginData, {dispatch, rejectWithValue}) => {
        try {
            const response = await authApi.login(loginData)
            localStorage.setItem('access_token', response.data.access_token)
            dispatch(authMeAsync())
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const authMeAsync = createAsyncThunk(
    'auth/authMeAsync',
    async (_, {dispatch,rejectWithValue}) => {
        try {
            const response = await authApi.authMe()
            dispatch(setAuth({...response.data, isAuth: true}))
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const logoutAsync = createAsyncThunk(
    'auth/logoutAsync',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            await authApi.logout()
            localStorage.removeItem('access_token')
            dispatch(setAuth({isAuth: false, email: null, id: null, name: null, profile_image: null}))
            dispatch(setProducts({data: [], last_page: null}))
            dispatch(setFilters({data_from: '', data_to: '', price_from: '', price_to: '', title: ''}))
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


export default authSlice.reducer