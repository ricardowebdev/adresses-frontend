import { defineComponent } from 'vue';
import { Endereco } from '@/models/Endereco'
import { enderecoService } from '@/services/EnderecoService';
import HandleErrorResponse from '@/helpers/HandleErrorResponse';
import Alert from '@/components/Alert/Alert.vue';
import Loader from '@/components/Loader/Loader.vue';

export default defineComponent({
    name: 'Enderecos',
    components: {
        Alert, Loader
    },
    data() {
        return {
            enderecos: [] as Array<Endereco>,
            originalEnderecos: [] as Array<Endereco>,
            dialog: false,
            dialogActive: false,
            SelectedEndereco: new Endereco(),
            searchText: "" as String,
            errorResponse: new HandleErrorResponse(),
            type: "" as string,
            msg: "" as string,
            time: 0 as number,
            callBack: '' as string,
            showLoader: false,
            cep: "" as string,
            uf: "" as string,
            cidade: "" as string,
            logradouro: "" as string,
        }
    },
    created() {
        this.getEnderecos();
        this.originalEnderecos = this.enderecos;
    },
    computed: {
        enderecosPayload() {
            return {
                cep: this.cep,
                uf: this.uf,
                cidade: this.cidade,
                logradouro: this.logradouro,
            };
        }
    },
    methods: {
        setDelete(endereco: Endereco|any): void {
           this.SelectedEndereco = endereco;
           this.dialog = true;
        },
        setEdit(endereco: Endereco|any): void {
            this.SelectedEndereco = endereco;
            this.$router.push(`/endereco/${endereco.id}`);
        },
        async getEnderecos() {
            this.showLoader = true;
            await enderecoService.getAll(this.enderecosPayload)
                .then((response: any) => {
                    if (response.data.status === "success") {
                        this.enderecos = this.formatEnderecos(response.data.data);
                        this.originalEnderecos = response.data.data;
                    }
                    this.showLoader = false;
                })
                .catch((error: any) => {
                    const msgs = this.errorResponse.handleResponse(error);
                    this.setAlert(this.errorResponse.displayErrors(msgs) || "Ocorreram erros durante o processo", "error", false);
                    this.enderecos = [];
                    this.originalEnderecos = this.enderecos;
                });
        },
        async confirmDelete() {
            this.dialog = false;
            this.showLoader = true;
            await enderecoService.destroy(this.SelectedEndereco.id)
                .then((response: any) => {
                    this.setAlert(response.data.message || "Ocorreram erros durante o processo", response.data.status || "error", false);
                    this.getEnderecos();
                })
                .catch((error: any) => {
                    let msgs = this.errorResponse.handleResponse(error);
                    this.setAlert(this.errorResponse.displayErrors(msgs) || "Ocorreram erros durante o processo", "error", false);
                    this.enderecos = [];
                    this.originalEnderecos = this.enderecos;
                });
        },
        excel() {
            enderecoService.excel(this.enderecosPayload);
        },
        search() {
            this.getEnderecos();
            this.originalEnderecos = this.enderecos;
            this.enderecos = this.formatEnderecos(this.filterItems(this.enderecos, this.searchText));
        },
        filterItems(arr: Array<any>, query: String) {
            return arr.filter((el) => 
                el.logradouro.toLowerCase().includes(query.toLowerCase()) ||
                el.cep.toLowerCase().includes(query.toLowerCase()) ||
                el.cidade.toLowerCase().includes(query.toLowerCase()) ||
                el.uf.toLowerCase().includes(query.toLowerCase())
            );
        },
        filterLocal() {
            this.enderecos = this.originalEnderecos;
            this.enderecos = this.formatEnderecos(this.filterItems(this.enderecos, this.searchText));
        },
        setAlert(msg: string, type: string, callBack?: boolean, time?: number) {
            window.scrollTo({ top: 0, behavior: 'auto' });
            this.msg = msg;
            this.type = type;
            this.time = time ? time : 3000;
            this.callBack = callBack ? '/enderecos' : '';
            this.showLoader = false;
        },
        clearAlert() {
            this.msg = "";
            this.type = "";
            this.time = 0;
            this.callBack = "";    
        },
        formatEnderecos(enderecos: Array<Endereco>) {
            const enderecosFormatados = [] as Array<any>;
            enderecos.forEach((endereco) => {
                enderecosFormatados.push({
                    'id': endereco.id,
                    'cep': endereco.cep,
                    'uf': endereco.uf,
                    'cidade': endereco.cidade,
                    'logradouro': endereco.logradouro + ' ' + endereco.numero,
                    'acoes': ''
                });
            })
            return enderecosFormatados;
        }
    }
})