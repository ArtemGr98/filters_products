import {instance} from "./instance";

export const authApi = {
     login: loginData => instance.post('/auth/login', {...loginData}),
     authMe: () => instance.get('auth/user-profile'),
     logout: () => instance.post('auth/logout'),
     refreshToken: () => instance.post('auth/refresh')
}