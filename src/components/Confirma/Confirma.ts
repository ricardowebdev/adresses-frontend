import { defineComponent } from 'vue';
import { LoginService } from '@/services/LoginService';
import HandleErrorResponse from '@/helpers/HandleErrorResponse';
import Loader from '@/components/Loader/Loader.vue';
import Alert from '@/components/Alert/Alert.vue';

export default defineComponent({
    name: 'Confirma',
    components: {
        Alert, Loader
    },
    data() {
        return {
            btnDisabled: false,
            showLoader: false,
            processMsg: 'Processando...',
            type: "" as string,
            msg: "" as string,
            time: 0 as number,
            callBack: '' as string,
            errorResponse: new HandleErrorResponse(),
            email: '' as any,
            token: '' as any
        }
    },
    created() {
        this.email = this.$route.params.email;
        this.token = this.$route.params.token;
        this.confirmar();
    },
    methods: {
        async confirmar() {
            const service = new LoginService();
            this.showLoader = true;
            await service.confirma(this.email, this.token)
                .then((response: any) => {
                    if (response.data.status === "success") {
                        try {
                            this.processMsg = 'Solicitação realizada com sucesso dentro de instantes sua nova senha será enviada via e-mail';
                        } catch(error) {
                            this.processMsg = 'Falha ao realizar recuperação de senha tente novamente mais tarde e ou tente contato com o suporte técnico';
                            let msgs = this.errorResponse.handleResponse(error);
                            this.setAlert(this.errorResponse.displayErrors(msgs) || "Ocorreram erros durante o processo", "error", false);
                        }
                    }
                    this.showLoader = false;
                })
                .catch((error: any) => {
                    let msgs = this.errorResponse.handleResponse(error);
                    this.setAlert(this.errorResponse.displayErrors(msgs) || "Ocorreram erros durante o processo", "error", false);
                });
        },
        setAlert(msg: string, type: string, callBack?: boolean, time?: number) {
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