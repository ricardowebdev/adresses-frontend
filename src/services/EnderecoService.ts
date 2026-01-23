import axios from 'axios';
import { BaseService } from './BaseService';


class EnderecoService extends BaseService {    
    getAll(): Promise<any> {
        return axios.get(this.url + '/enderecos', super.mountHeaders());
    }

    show(id: number): Promise<any> {
        return axios.get(`${this.url}/enderecos/${id}`, super.mountHeaders());
    }

    destroy(id: any|number): Promise<any> {
        return axios.delete(`${this.url}/enderecos/${id}`, super.mountHeaders());
    }

    edit(id: number, payload: any): Promise<any> {
        return axios.put(`${this.url}/enderecos/${id}`, payload, super.mountHeaders());
    }

    insert(payload: any): Promise<any> {
        return axios.post(`${this.url}/enderecos`, payload, super.mountHeaders());
    }
}

export const enderecoService = new EnderecoService();
export default enderecoService;