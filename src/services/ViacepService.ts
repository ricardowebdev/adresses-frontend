import axios from 'axios';

class ViacepService {    
    get(cep: string): Promise<any> {
        return axios.get(`https://viacep.com.br/ws/${cep}/json`);
    }
}

export const viaCepService = new ViacepService();
export default ViacepService;