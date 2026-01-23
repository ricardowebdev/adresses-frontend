import axios from 'axios';
import { BaseService } from './BaseService';

class LogService extends BaseService {    
    getAll(): Promise<any> {
        return axios.get(this.url + '/logs', super.mountHeaders());
    }

    show(id: number): Promise<any> {
        return axios.get(`${this.url}/logs/${id}`, super.mountHeaders());
    }
}

export const logService = new LogService();
export default LogService;