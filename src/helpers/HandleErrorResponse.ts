export default class HandleErrorResponse {
    handleResponse(response: any) {
        if (response.response && response.response.status && response.response.status == 401)
            window.location.href = '/loggout';                

        let result = [] as Array<string>;
        if (response.reponse !== undefined && response.response.data.errors !== undefined) {            
            let errors = response.response.data.errors;

            errors = Object.values(errors);
            errors.forEach((error: any) => {
                
                if(error[0] !== undefined) {
                    result.push(error[0])
                } else {
                    result.push(error);
                }
            });

            return result;
        }

        if (response.response !== undefined && response.response.data.message !== undefined) {
            result.push(response.response.data.message);
            return result;
        }

        if (response.errors !== undefined) {
            response.errors = Object.values(response.errors);
            response.errors.forEach((error: any) => {
                if(error[0] !== undefined) {
                    result.push(error[0])
                } else {
                    result.push(error);
                }
            });

            return result;
        }

        if (response.message !== undefined && typeof(response.message) === 'string') {
            result.push(response.message);
            return result;
        }

        if (response.response.message !== undefined && typeof(response.response.message) === 'string') {
            result.push(response.response.message);
            return result;
        }

        result.push('Sinto muito, mas ocorreu um erro durante o processo, por favor tente novamente mais tarde');
        return result;
    } 
    
    displayErrors(msgs: any): string {
        let errors = '';
        msgs?.forEach((msg: String) => {errors += errors !== '' ? ' | ' + msg : msg });
        return errors;
    }
}