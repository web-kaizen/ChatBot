import { API_URL } from '@/constants/constants.js';
import ApiError from './ApiError.js';

export default class Message {

    static async getList(dialogueId) {
        let token = 'a9638f8ba36918524f7cf6091ce07802674834aa3f5d1968a2e4749b9d17c221';
        let url = `${API_URL}/dialogues/${dialogueId}/messages`;

        console.log(url);

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            const json = await response.json();

            if ('result' in json) {
                return { "status": json['result']['status'] }
            } else if ('error' in json) {
                // Returning an object with an error property
                return { "error": json['error']['code'] };
            }
        } catch (error) {
            // Returning an object with an error property
            return { "error": error.message || "Unknown error" };
        }
    }
}