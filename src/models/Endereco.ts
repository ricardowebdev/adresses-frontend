
export class Endereco {
    id?: number = 0;
    cep: string = "";
    uf: string = "";
    cidade: string = "";
    bairro: string = "";
    logradouro: string = "";
    numero: string = "";
    nome: string = "";
    telefone: string = "";
    email: string = "";
}

export class ValidateEndereco {
    msgCep: string = "";
    msgUF: string = "";
    msgCidade: string = "";
    msgBairro: string = "";
    msgLogradouro: string = "";
    msgNumero: string = "";
    msgNome: string = "";
    msgTelefone: string = "";
    msgEmail: string = "";
    valid: boolean = true;

    constructor(endereco: Endereco, valida: boolean) {
        if (!valida) return;

        if (endereco.cep == "") {
            this.msgCep += "Cep é requerido";
            this.valid = false;
        } else if (endereco.cep.length < 8) {
            this.msgCep += "Cep deve ter no minimo 8 digitos";
            this.valid = false;
        }

        if (endereco.uf == "") {
            this.msgUF += "Estado é requerido";
            this.valid = false;
        }        

        if (endereco.logradouro == "") {
            this.msgLogradouro += "Logradouro é requerido";
            this.valid = false;
        }
        

        if (endereco.cidade == "") {
            this.msgCidade += "Cidade é requerido";
            this.valid = false;
        }
            
        if (endereco.nome == "") {
            this.msgNome += "Nome é requerido";
            this.valid = false;''
        }            

        if (endereco.email && !this.validEmail(endereco .email)) {
            this.msgEmail += "E-mail não é valido";
            this.valid = false;
        }
    }

    validEmail(email: string) : boolean {
        let isValid = true;

        if (email.indexOf('.') < 0) isValid = false;
        if (email.indexOf('@') < 0) isValid = false;
        if (email.length < 10) isValid = false;
        
        return isValid;
    }
}



