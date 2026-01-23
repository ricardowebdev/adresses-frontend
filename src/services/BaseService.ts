import axios from 'axios';
import UnauthorizedErrorResponse from '@/helpers/UnauthorizedErrorResponse';


export class BaseService {
    protected url = 'http://192.168.1.141/api';

    formatGetParams(params: any) {
        let urlParams = "";
        
        for (let key in params) {
            if (encodeURIComponent(params[key])) {
                urlParams !== "" ? urlParams += "&" : urlParams += "?";
                urlParams += key + "=" + encodeURIComponent(params[key]);
            }
        }

        return urlParams;
    }
}
