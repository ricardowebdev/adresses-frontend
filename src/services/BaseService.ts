import axios from 'axios';
import { LoggedUser } from '@/models/LoggedUser';
import UnauthorizedErrorResponse from '@/helpers/UnauthorizedErrorResponse';


export class BaseService {
    user: LoggedUser = new LoggedUser();
    protected url = 'https://192.168.0.21:8585/api';

    mountHeaders() {        
        const temp = localStorage.getItem('lgd') || '';
        if (temp) {
            this.user = JSON.parse(temp);

            return {
                headers: {
                    Authorization: `Bearer ${this.user.auth_token}`
                }
            }
        } else {
            return {};
        }
    }

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
