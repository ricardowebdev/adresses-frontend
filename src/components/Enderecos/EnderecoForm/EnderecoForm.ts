import { defineComponent } from 'vue';
import { enderecoService } from '@/services/EnderecoService';
import { viaCepService } from '@/services/ViacepService';
import { Endereco, ValidateEndereco } from '@/models/Endereco'
import HandleErrorResponse from '@/helpers/HandleErrorResponse';
import { Estados } from '@/resources/Estados';
import Alert from '@/components/Alert/Alert.vue';
import Loader from '@/components/Loader/Loader.vue';

export default defineComponent({
    name: 'EnderecoForm',
    components: {
        Alert, Loader
    },
    data() {
        return {
            id: 0 as any,
            endereco: new Endereco(),
            formValid: false as Boolean,
            errorResponse: new HandleErrorResponse(),
            validaEndereco: new ValidateEndereco(new Endereco(), false),
            estados: new Estados(),
            type: "" as string,
            msg: "" as string,
            time: 0 as number,
            callBack: '' as string,
            showLoader: false
        }
    },
    created() {    
        this.id = this.$route.params.id || 0;
        
        if (this.id)
            this.findEndereco();
    },
    computed: {
        isDisabled() {
            const endereco = this.endereco;
            let changedFields = endereco.cep !== "" ? true : false
                || endereco.uf !== "" ? true : false
                || endereco.cidade  !== "" ? true : false
                || endereco.logradouro  !== "" ? true : false
                || endereco.nome  !== "" ? true : false

            if (this.id || changedFields == true) {
                this.validaEndereco = new ValidateEndereco(this.endereco, true);
                return !this.validaEndereco.valid                    
            } else {
                this.validaEndereco = new ValidateEndereco(this.endereco, false);
                return true                    
            }
        },
        listEstados() {
            return this.estados.getEstados();
        }
    },
    methods: {
        findEndereco() {
            this.showLoader = true;
            enderecoService.show(this.id)
                .then((response: any) => {
                    if (response.data.status === "success") {
                        this.endereco = response.data.data;
                    }
                    this.showLoader = false;
                })
                .catch((error: any) => {
                    this.setAlert("Não encontramos o endereço Solicitado", "error", true);
                });
        },
        setEndereco() {
            const payload = this.endereco;
            const currentEndereco = this.endereco;
            const id = this.endereco.id;
            this.endereco = new Endereco();
            delete payload['id'];
            this.showLoader = true;

            if (id) {                
                enderecoService.edit(id, payload)
                .then((response: any) => {
                    this.setAlert(response.data.message || "Ocorreram erros durante o processo", response.data.status || "error", true);
                })
                .catch((error: any) => {
                    let msgs = this.errorResponse.handleResponse(error);
                    this.setAlert(this.errorResponse.displayErrors(msgs) || "Ocorreram erros durante o processo", "error", false);
                    this.endereco = currentEndereco;
                });
            } else {
                enderecoService.insert(payload)
                .then((response: any) => {
                    this.setAlert(response.data.message || "Ocorreram erros durante o processo", response.data.status || "error", true);
                })
                .catch((error: any) => {
                    let msgs = this.errorResponse.handleResponse(error);
                    this.setAlert(this.errorResponse.displayErrors(msgs) || "Ocorreram erros durante o processo", "error", false);
                    this.endereco = currentEndereco;
                });
            }
        },
        async getAddress(cep: any) {
            if (cep == null || cep.length < 8) {
                return;
            }
            await viaCepService.get(cep)
                .then((response: any) => {
                    console.log(response.data);
                    if (response.data.cep !== undefined) {
                        this.endereco.cep = response.data.cep;
                        this.endereco.logradouro = response.data.logradouro;
                        this.endereco.bairro  = response.data.bairro;
                        this.endereco.uf = response.data.uf;
                        this.endereco.cidade = response.data.localidade;    
                    }
                })
                .catch((error: any) => {
                    let msgs = this.errorResponse.handleResponse(error);
                    this.setAlert(this.errorResponse.displayErrors(msgs) || "Ocorreram erros durante o processo", "error", false);
                });
        },
        somenteNumero() {
            this.endereco.telefone = this.endereco.telefone.replace(/\D/g, '');
        },
        setAlert(msg: string, type: string, callBack?: boolean, time?: number) {
            window.scrollTo({ top: 0, behavior: 'auto' });
            this.msg = msg;
            this.type = type;
            this.time = time ? time : 3000; 
            this.callBack = callBack ? '/' : '';    
            this.showLoader = false;
        },
        clearAlert() {
            this.msg = "";
            this.type = "";
            this.time = 0;
            this.callBack = "";    
        }
    }
})