import axios from 'axios';
import { AuthRequestI } from './interfaces/auth.request';
import { AuthResponseI } from './interfaces/auth.response';

const api_url = process.env.API_URL_PROFILE || '';

export const login = async (auth: AuthRequestI) => {
    console.log('llega service', auth);
    try {
        await axios.post<AuthResponseI>(`${api_url}/api/auth/login`, auth)
            .then((response) => {
                // console.log('response', response.data);
                return response;
            });
    } catch (error) {
        return error.statusCode;
    }
}
