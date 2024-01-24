import { API_URL } from '@/constants/constants.js';
import ApiError from './ApiError.js';

export default class Message {

    getList(dialogueId) {
        let token = 'a9638f8ba36918524f7cf6091ce07802674834aa3f5d1968a2e4749b9d17c221';
        let url = `${API_URL}/dialogues/${dialogueId}/messages/`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) ApiError.return('server_error');
                return response.json();
            })
            .then(data => console.log(data));
    }
}