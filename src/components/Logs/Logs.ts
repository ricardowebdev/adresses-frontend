import { defineComponent } from 'vue';
import { Log } from '@/models/Log'
import { logService } from '@/services/LogService';
import HandleErrorResponse from '@/helpers/HandleErrorResponse';
import Alert from '@/components/Alert/Alert.vue';
import Loader from '@/components/Loader/Loader.vue';
import { permissible } from '@/services/PermissibleService';

export default defineComponent({
    name: 'Logs',
    components: {
        Alert,
        Loader
    },
    data() {
        return {
            logs: [] as Array<Log>,
            OriginalLogs: [] as Array<Log>,
            SelectedLog: new Log(),
            searchText: "" as String,
            errorResponse: new HandleErrorResponse(),
            type: "" as string,
            msg: "" as string,
            time: 0 as number,
            callBack: '' as string,
            showLoader: false,
            columns: [] as Array<any>,
            dataLogs: [] as Array<any>
        }
    },
    created() {
        if (!permissible.hasPermission(permissible.LISTAR_LOGS))
            this.$router.push('/dashboard');

        this.getLogs();
    },
    methods: {        
        async getLogs() {
            this.showLoader = true;
            const result = await logService.getAll()
                .then((response: any) => {
                    if (response.data.status === "success") {
                        this.logs = this.formatLogs(response.data.data);
                        this.OriginalLogs = response.data.data;
                    }
                    this.showLoader = false;
                })
                .catch((error: any) => {
                    let msgs = this.errorResponse.handleResponse(error);
                    this.setAlert(this.errorResponse.displayErrors(msgs) || "Ocorreram erros durante o processo", "error", false);
                    this.logs = [];
                    this.OriginalLogs = this.logs;
                });
        },
        search() {
            this.getLogs();            
            this.logs = this.formatLogs(this.filterItems(this.logs, this.searchText));
        },
        filterItems(arr: Array<any>, query: String) {
            return arr.filter((el) => 
                el.usuario.toLowerCase().includes(query.toLowerCase()) ||
                el.tipo.toLowerCase().includes(query.toLowerCase()) ||
                el.acao.toLowerCase().includes(query.toLowerCase()) ||
                el.created_at.toLowerCase().includes(query.toLowerCase())
            );
        },
        filterLocal() {
            this.logs = this.OriginalLogs;
            this.logs = this.formatLogs(this.filterItems(this.logs, this.searchText));
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
        },
        formatLogs(logs: Array<Log>) {
            const logsFormatados = [] as Array<any>;
            logs.forEach((log) => {
                logsFormatados.push({
                    'id': log.id,
                    'usuario': log.usuario,
                    'tipo': log.tipo,
                    'data': log.created_at,
                    'metodo': log.acao,
                    'acoes': ''
                });
            })
            return logsFormatados;
        },
        openInNewTab(id: any) {
            const url = `${window.location.origin}/logs/${id}`;
            window.open(url, '_blank');
        }
    }
})