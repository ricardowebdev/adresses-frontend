import { defineComponent } from 'vue';
import { logService } from '@/services/LogService';
import { Log } from '@/models/Log'
import HandleErrorResponse from '@/helpers/HandleErrorResponse';
import Alert from '@/components/Alert/Alert.vue';
import Loader from '@/components/Loader/Loader.vue';

export default defineComponent({
    name: 'LogDetalhes',
    components: {
        Alert, Loader
    },
    data() {
        return {
            id: 0 as any,
            log: new Log(),
            formValid: false as Boolean,
            errorResponse: new HandleErrorResponse(),
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
            this.findLog();
    },
    methods: {
        async findLog() {  
            this.showLoader = true;          
            await logService.show(this.id)
                .then((response: any) => {
                    if (response.data.status === "success") {
                        this.log = response.data.data;
                    }
                    this.showLoader = false;
                })
                .catch((error: any) => {
                    this.setAlert("Não encontramos o Log Solicitado", "error", true);
                });
        },
        setAlert(msg: string, type: string, callBack?: boolean, time?: number) {
            this.msg = msg;
            this.type = type;
            this.time = time ? time : 3000;
            this.callBack = callBack ? '/logs' : '';
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