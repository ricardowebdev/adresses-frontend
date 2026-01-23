<template>
    <Alert :msg="msg" :type="type" :time="time" :callback="callBack" @clearAlert="clearAlert" />

    <v-container class="flex-wrap d-flex fullpage" >
        <v-card class="d-flex align-center flex-column w-100" rounded-lg>
            <v-row class="mt-1">
                <v-col class="text-right">
                    <v-btn class="no-margin" size="small" color="black" @click="buscarDialog = true">
                        <span class="material-icons md-16">search</span>
                        <b>Buscar</b>
                    </v-btn>
                </v-col>
            </v-row>
            <v-container class="fullpage mr-0" v-if="showMap">
                <GoogleMap api-key="" style="height: 850px" 
                    :center="center" 
                    :zoom="zoom"
                    :options="{
                        styles: {
                            hide: [
                                {
                                    featureType: 'poi.business',
                                    styles: [{ visibility: 'off' }],
                                },
                                {
                                    featureType: 'transit',
                                    styles: [{ visibility: 'off' }],
                                },
                            ]
                        }
                    }"
                >
                    <MarkerCluster>
                        <Marker v-for="(location, i) in locations" 
                            :key="i" 
                            :options="{ 
                                position: location,
                            }" >
                            <InfoWindow                                 
                                :options="{ 
                                    position: { lat: location.lat, lng: location.lng }, 
                                    anchorPoint: 'CENTER',
                                    minWidth: 300,
                                    minHeight: 300,                                    
                                }" 
                                class="infowindow">
                                <!-- Keys -->
                                <v-container class="flex-wrap w-100 fs-15">
                                    <v-row>
                                        <v-col class="text-left column-black p-6"><b>Id</b></v-col>
                                        <v-col class="text-left column-black p-6"><b>Nome</b></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="p-6"><b>{{ location.id }}</b></v-col>
                                        <v-col class="p-6"><b>{{ location.name }}</b></v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col class="text-left column-black p-6"><b>Comando</b></v-col>
                                        <v-col class="text-left column-black p-6"><b>Disjuntor</b></v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col class="p-6"><b>{{ location.status_comando == '1' ? 'ON' : 'OFF' }}</b></v-col>
                                        <v-col class="p-6"><b>{{ location.status_disjuntor == '1' ? 'ON' : 'OFF' }}</b></v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col class="text-left column-black p-6"><b>DPS</b></v-col>
                                        <v-col class="text-left column-black p-6"><b>Foto Celula</b></v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col class="p-6"><b>{{ location.DPS == '0' ? 'Atuado' : 'Não Atuado' }}</b></v-col>
                                        <v-col class="p-6"><b>{{ location.status_foto_celula === '1' ? 'Ligado' : 'Desligado' }}</b></v-col>
                                    </v-row>                                    

                                    <v-row>
                                        <v-col class="text-left column-black p-6"><b>Online</b></v-col>
                                        <v-col class="text-left column-black p-6"><b>Medidas</b></v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col class="text-left column-black p-6"><b>Gateway</b></v-col>
                                        <v-col class="text-left column-black p-6"><b>Comando</b></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="text-left column-black p-6"><b>Versão</b></v-col>
                                        <v-col class="text-left column-black p-6"><b>Firmware</b></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="text-left p-6"><b>{{ location.versao }}</b></v-col>
                                        <v-col class="text-left p-6"><b>{{ location.firmware }}</b></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="text-left column-black p-6" colspan="2"><b>Info</b></v-col>
                                    </v-row>                                                                        
                                </v-container>
                            </InfoWindow>
                        </Marker>
                    </MarkerCluster>
                </GoogleMap>  
            </v-container>
        </v-card>
    </v-container>        
    
    <Loader :showLoader="showLoader" />

    <!-- Busca Dialog -->
    <v-dialog v-model="buscarDialog" class="buscarDialog">
        <v-card>
            <v-card-text class="pb-2 pt-2">
                <v-row justify="space-between" class="mb-3" no-gutters>
                    <v-col cols="12" md="12" sm="12" class="modal-title" >Buscar</v-col>
                </v-row>

                <v-row justify="space-between" class="mb-3" no-gutters>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field 
                            label="ID"
                            v-model="endereco.id"
                            variant="underlined"
                            class="p-2"
                            @keypress.enter="getEnderecos(); buscarDialog = false;">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field 
                            label="Cep"
                            v-model="endereco.cep"
                            variant="underlined"
                            class="p-2"
                            @keypress.enter="getEnderecos(); buscarDialog = false;">
                        </v-text-field>
                    </v-col>
                </v-row>


                <v-row justify="space-between" class="mb-3" no-gutters>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field 
                            label="Cidade"
                            v-model="endereco.cidade"
                            variant="underlined"
                            class="p-2"
                            @keypress.enter="getEnderecos(); buscarDialog = false;">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field 
                            label="UF"
                            v-model="endereco.uf"
                            variant="underlined"
                            class="p-2"
                            @keypress.enter="getEnderecos(); buscarDialog = false;">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row justify="center" class="mb-3" no-gutters>
                    <v-col cols="12" md="12" sm="12" class="text-center">
                        <v-btn class="no-margin" size="small" color="black" @click="getEnderecos(); buscarDialog = false;">
                            <b>Buscar</b>
                        </v-btn>
                    </v-col>
                </v-row>
             
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" src="./Mapa.ts" />
<style scoped>
    .pl-2 {
        padding-left: 2px;
    }
    .bold {
        font-weight: bold !important;
    }
    span {
        font-weight: bold;
    }
    .custom-btn {
        box-sizing: border-box;
        background: white;
        height: 40px;
        width: 40px;
        border-radius: 2px;
        border: 0px;
        margin: 10px;
        padding: 0px;
        font-size: 1.25rem;
        text-transform: none;
        appearance: none;
        cursor: pointer;
        user-select: none;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
        overflow: hidden;
    }
    th {
        padding: 8px !important;
        margin: 0px;
    }
    td {
        margin: 8px !important;
        padding: 8px !important;
    }
    .yellow {
        background-color: #f5c21f;
        font-weight: 600;        
    }
    .red {
        color: red;
        font-weight: 500;
    }
    .p-20 {
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .comando-btn {
        color: white;
        font-weight: bold;
    }
    .p-6 {
        padding: 6px !important;
    }
    .no-margin {
        margin-top: 0px !important;
    }
    .gm-style-iw {
        height: 100px;
        width: 400px;
    }
    v-row {
        margin: 0px !important;
    }
    .commandDialog {
        height: 670px !important;
        overflow-y: none !important;
    }
    @media (min-width: 1024px) {
        .commandDialog {
            width: 50% !important;
        }
    }
    .title-dialog {
        background-color: #f5c21f;
        color: black;
        font-weight: bold;
        font-size: 24px;
    }
    .modal-title {
        font-size: 26px;
        font-weight: bold;
        text-align: center;
    }
    .status {
        background-color: black;
        color: white;
    }
    .custom-title {
        font-size: 24px;
        line-height: 1.3;
        background-color: #f5c21f;
        color: black;
    }
    .alert-title {
        line-height: 1.3;
        color: red;
        font-size: 24px;
        font-weight: bold;
    }
    .comand-title {
        font-size: 24px;
        line-height: 1.3;
        background-color: black;
        color: #f5c21f;
    }
    .legenda-title {
        font-weight: bold;
        font-size: 26px;
    }
</style>
<style scoped>
@media (max-width: 600px) {
  .comando-btn {
    font-size: 1.1rem;
    padding: 18px 0 !important;
  }
}
</style>