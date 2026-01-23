import { defineComponent } from 'vue';
import { enderecoService } from '@/services/EnderecoService';
import { Endereco } from '@/models/Endereco'
import { Coordinates } from '@/models/Coordinates';
import { KeyCoordinates } from '@/models/KeyCoordinates';
import HandleErrorResponse from '@/helpers/HandleErrorResponse';
import Alert from '@/components/Alert/Alert.vue';
import Loader from '@/components/Loader/Loader.vue';

// @ts-ignore
import { GoogleMap, Marker, MarkerCluster,CustomControl, InfoWindow } from "vue3-google-map";

export default defineComponent({
    name: 'LogDetalhes',
    components: {
        Alert, Loader, GoogleMap, Marker, MarkerCluster,CustomControl, InfoWindow
    },
    data() {
        return {
            tipo: '' as number|string,
            center: { lat: -23.188386, lng: -46.9242174 } as Coordinates,
            zoom: 16 as number,
            locations: [] as Array<KeyCoordinates>,
            endereco: new Endereco(),
            enderecos: [] as Array<Endereco>,
            selectedLocation: new KeyCoordinates(),
            errorResponse: new HandleErrorResponse(),
            type: "" as string,
            msg: "" as string,
            time: 0 as number,
            callBack: '' as string,
            showLoader: false,
            buscarDialog: false,
            id: '' as string,
            logradouro: '' as string,
            cep: '' as string,
            cidade: '' as string,
            estado: '' as string,
            showMap: false,
            chartKey: 0,
            chartOptions: {
                responsive: true,
                circumference: 180,
                rotation: -90, 
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
            }
        }
    },
    created: async function() {
        this.id = this.$route.query.id?.toString() || '';
        this.getEnderecos();
    },
    methods: {
        async getEnderecos() {
            this.showMap = false;
            this.locations = [];
            this.showLoader = true;
            const payload = {
                logradouro:  this.logradouro,
                id:     this.id,
                cep:   this.cep,
                cidade: this.cidade
            };

            try {
                const response: any = await enderecoService.getAll(payload);

                if (response.data && response.data.status === "success") {
                    this.enderecos = response.data.data || [];
                    this.showMap = true;
                } else {
                    this.showMap = false;
                    const msg = (response.data && response.data.message) ? response.data.message : "Nenhuma endereço encontrado";
                    this.setAlert(msg, "warning", false);
                }
            } catch (error: any) {
                const msgs = this.errorResponse.handleResponse(error);
                this.setAlert(this.errorResponse.displayErrors(msgs) || "Ocorreram erros durante o processo", "error", true);
                this.showMap = false;
            } finally {
                this.showLoader = false;
            }
        },
        async showKeyDetails(endereco: Endereco) {            
            this.endereco = endereco;
            this.showLoader = true;
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
        },
        navigate(url: string) {
            window.open(url, '_blank');
        },
    }
})