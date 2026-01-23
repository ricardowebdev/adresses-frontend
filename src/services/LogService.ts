import axios from 'axios';
import { BaseService } from './BaseService';

class LogService extends BaseService {    
    getAll(): Promise<any> {
        return axios.get(this.url + '/logs');
    }

    show(id: number): Promise<any> {
        return axios.get(`${this.url}/logs/${id}`);
    }
}

export const logService = new LogService();
export default LogService;