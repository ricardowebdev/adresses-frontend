import axios from 'axios';
import { BaseService } from './BaseService';


class EnderecoService extends BaseService {    
    getAll(payload: Object = {}): Promise<any> {
        return axios.get(this.url + '/enderecos' + this.formatGetParams(payload));
    }

    show(id: number): Promise<any> {
        return axios.get(`${this.url}/enderecos/${id}`);
    }

    destroy(id: any|number): Promise<any> {
        return axios.delete(`${this.url}/enderecos/${id}`);
    }

    edit(id: number, payload: any): Promise<any> {
        return axios.put(`${this.url}/enderecos/${id}`, payload);
    }

    insert(payload: any): Promise<any> {
        return axios.post(`${this.url}/enderecos`, payload);
    }
    
    excel(payload: any) {
        return axios.post(
            `${this.url}/enderecos/excel`,
            payload,
            {
                responseType: 'blob'
            }
        ).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', 'enderecos.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }  
}

export const enderecoService = new EnderecoService();
export default enderecoService;