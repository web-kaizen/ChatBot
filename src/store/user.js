import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        email: null,
        user_id: null,
        isAuth: false
    }),
    actions: {
        setEmail(email) {
            this.email = email
        },

        setUserId(user_id) {
            this.user_id = user_id
        },

        setIsAuth(isAuth) {
            this.isAuth = isAuth
        },

        logout() {
            this.email = null
            this.user_id = null
            this.isAuth = false
        }
    },
    getters: {
        getEmail() {
            return this.email
        },

        getUserId() {
            return this.user_id
        },

        getIsAuth() {
            return this.isAuth
        }
    }
})