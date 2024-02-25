import { BASE_PROXY, URL_PROXY } from '@/constants/constants'
import ApiError from './ApiError'

export default class Request {
    static getProxyURL() {
        // let token = this.getAccessToken()

        // if (token) {
        //     return { path: URL_PROXY }
        // }

        return { path: BASE_PROXY }
    }

    static getAccessToken() {
        return localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
    }

    static saveAccessToken(token) {
        localStorage.setItem('accessToken', token)
    }

    static async send(path, method = 'GET', successCallbabk, body = null) {
        let token = this.getAccessToken()
        let headers = {
            'Content-Type': 'application/json'
        }

        if (body) {
            body = JSON.stringify(body)
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        let url = this.getProxyURL().path

        await fetch(url + path, {
            method: method,
            headers: headers,
            body: body
        })
            .then(async (response) => {
                let json = await response.json();

                if (json['result']) {
                    if (json['result']['access_token']) {
                        this.saveAccessToken(json['result']['access_token'])
                    }
                    typeof successCallbabk === 'function' && successCallbabk(json['result'])
                } else if (json['error']) {
                    ApiError.return(json['code'], json['message'])
                }
            })
    }
}