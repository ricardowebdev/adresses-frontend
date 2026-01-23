<template>
    <Alert :msg="msg" :type="type" :time="time" :callback="callBack" @clearAlert="clearAlert" />

    <v-container class="flex-wrap d-flex fullpage" >
        <v-card class="d-flex align-center flex-column w-100" rounded-lg>
            <v-row class="mt-1">
                <v-col class="text-right">
                    <v-btn class="no-margin" size="small" color="black" @click="legendaDialog = true">
                        <span class="material-icons md-16">equalizer</span>
                        <b>Legenda</b>
                    </v-btn>
                </v-col>
                <v-col class="text-right">
                    <v-btn class="no-margin" size="small" color="black" @click="buscarDialog = true">
                        <span class="material-icons md-16">search</span>
                        <b>Buscar</b>
                    </v-btn>
                </v-col>
            </v-row>
            <v-container class="fullpage mr-0" v-if="showMap">
                <GoogleMap api-key="AIzaSyChNvps5atvCqz18BcgpOMtuRlSJh2rRVM" style="height: 850px" 
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
                                icon: location.type != 'key' ? torre : buscaTipo(location)
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
                                <v-container class="flex-wrap w-100 fs-15" v-if="location.type == 'key'">
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
                                        <v-col class="p-6"><b>{{ location.online }}</b></v-col>
                                        <v-col class="p-6">
                                            <v-btn class="no-margin" size="x-small" color="#f5c21f" @click="showKeyDetails(location)">
                                                <span class="material-icons md-16 black">equalizer</span>&nbsp;
                                                <b>Medidas</b>
                                            </v-btn>                                                
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col class="text-left column-black p-6"><b>Gateway</b></v-col>
                                        <v-col class="text-left column-black p-6"><b>Comando</b></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="text-left">                                            
                                            <b>{{ location.gateway }}</b>                                             
                                        </v-col>
                                        <v-col class="text-left">
                                            <v-btn size="x-small" color="#f5c21f" class="no-margin" @click="showCommands(location)">
                                                <span class="material-icons md-16 black">send</span>&nbsp;
                                                <b>Enviar</b> 
                                            </v-btn>
                                        </v-col>
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
                                    <v-row>
                                        <v-col class="text-left" colspan="2">
                                            <v-btn size="x-small" color="#f5c21f" class="mr-2 mb-3" @click="navigate('/chave/' + location.id)">
                                                <span class="material-icons md-16 black">visibility</span>&nbsp;
                                                <b>Detalhes</b> 
                                            </v-btn>
                                            <v-btn size="x-small" color="#f5c21f" class="mr-2 mb-3" @click="navigate('/rearmes?id_chave=' + location.id)">
                                                <span class="material-icons md-16 black">visibility</span>&nbsp;
                                                <b>Rearmes</b> 
                                            </v-btn>
                                            <v-btn size="x-small" color="#f5c21f" class="mr-2 mb-3" @click="navigate('/comandos?id_chave=' + location.id)">
                                                <span class="material-icons md-16 black">visibility</span>&nbsp;
                                                <b>Comandos</b> 
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <!-- Gateways -->
                                <v-container class="flex-wrap w-100 fs-15" v-else>
                                    <v-row>
                                        <v-col class="text-left column-black p-6"><b>Id</b></v-col>
                                        <v-col class="text-left column-black p-6"><b>Nome</b></v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col class="p-6"><b>{{ location.id }}</b></v-col>
                                        <v-col class="p-6"><b>{{ location.name }}</b></v-col>
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

    <!-- Medidas Dialog -->
    <v-dialog v-model="medidasDialog">
        <v-card>
            <v-card-text class="pb-2 pt-2">
                <!-- Tabs -->
                <v-card>
                    <v-tabs v-model="tab" bg-color="#f5c21f">
                        <v-tab value="medidas" @click="showKeyDetails(selectedLocation)"><b>Medidas</b></v-tab>
                        <v-tab value="gauger" @click="showKeyDetails(selectedLocation)"><b>Gauger</b></v-tab>
                        <v-tab value="potencia" @click="showKeyDetails(selectedLocation)" v-if="selectedLocation.versao === 'v2' && canShowPotencia"><b>Potência</b></v-tab>
                        <v-tab value="impedancia" @click="showKeyDetails(selectedLocation)" v-if="selectedLocation.versao === 'v2' && canShowImpedancia"><b>Impedância</b></v-tab>
                        <v-tab value="sinal" @click="showKeyDetails(selectedLocation)" v-if="selectedLocation.versao === 'v2' && canShowSinal"><b>Sinal</b></v-tab>
                        <v-tab value="sobrecorrente" @click="showKeyDetails(selectedLocation)" v-if="selectedLocation.versao === 'v2' && canShowSobrecorrente"><b>Sobre Corrente</b></v-tab>
                        <v-tab value="intervalo" @click="showKeyDetails(selectedLocation)" v-if="selectedLocation.versao === 'v2' && canShowIntervalo"><b>Parametrizações</b></v-tab>
                    </v-tabs>
                    <v-card-text>
                        <v-tabs-window v-model="tab">
                            <v-tabs-window-item value="gauger">
                                <div v-if="canShowCharts">
                                    <v-row class="pt-3 center title-dialog">
                                        <v-col>
                                            <b>{{ selectedLocation.id.toUpperCase() }}</b><br />
                                        </v-col>
                                        <v-col>
                                            <b>{{ selectedLocation.name.toUpperCase() }}</b>
                                        </v-col>
                                        <v-col>
                                            <b>{{ medidas[0].data }}</b>
                                        </v-col>
                                    </v-row>

                                    <v-row class="pt-3 center">
                                        <v-col class="v-col-4 mr-10 mb-10">
                                            <Doughnut
                                                class="grafico w-100"
                                                :key="`${chartKey}-${tab}-${selectedLocation.id}-volts-1`"
                                                :id="'gauge-volts-1'"
                                                :options="chartOptions"
                                                :data="getChartData('volts', 0)"
                                                                         
                                            />
                                        </v-col>                                        

                                        <v-col class="v-col-4 mr-10 mb-10">
                                            <Doughnut
                                                class="grafico w-100"                                                
                                                :id="'gauge-amperes-1'"
                                                :key="`${chartKey}-${tab}-${selectedLocation.id}-amperes-1`"
                                                :options="chartOptions"
                                                :data="getChartData('amperes', 0)"
                                            />
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-tabs-window-item>
                            <v-tabs-window-item value="medidas">
                                <v-row class="pt-3 center">
                                    <v-col class="center yellow custom-title">
                                        <b>{{ selectedLocation.id.toUpperCase() }}</b><br />
                                            <b>{{ selectedLocation.name.toUpperCase() }}</b>
                                    </v-col>
                                </v-row>
                                <div class="responsive-table mt-3 pt-3 fs-16">
                                    <v-data-table :items="medidas"
                                        class="elevation-1 fs-16"
                                        items-per-page="15"
                                        items-per-page-text="Itens por pagina">
                                        <template v-slot:headers class="elevation-1">
                                            <tr>
                                                <th class="text-left column-black pl-2 fs-16 bold">Id</th>
                                                <th class="text-left column-black pl-2 fs-16 bold">Chave</th>
                                                <th class="text-left column-black pl-2 fs-16 bold">Volts</th>
                                                <th class="text-left column-black pl-2 fs-16 bold">Amperes</th>
                                                <th class="text-left column-black pl-2 fs-16 bold">Lux</th>
                                                <th class="text-left column-black pl-2 fs-16 bold">Data</th>
                                            </tr>
                                        </template>
                                    </v-data-table>
                                </div>
                            </v-tabs-window-item>
                            <v-tabs-window-item value="potencia">
                                <v-row class="pt-3 center title-dialog">
                                    <v-col>
                                        <b>{{ selectedLocation.id.toUpperCase() }}</b><br />
                                    </v-col>
                                    <v-col>
                                        <b>{{ selectedLocation.name.toUpperCase() }}</b>
                                    </v-col>
                                </v-row>
                                <v-row class="text-right mb-5">
                                    <v-col>
                                        <v-btn block color="black" style="padding: 28px !important" @click="enviaComandoV2(selectedLocation.id, '6', '01')">
                                            <b>Medir Potência</b>
                                        </v-btn>
                                    </v-col>
                                </v-row>                            

                                <v-table>
                                    <thead>
                                        <tr>
                                            <th class="text-left column-black">Potência</th>
                                            <th class="text-left column-black">Fator</th>
                                            <th class="text-left column-black">Volt Amper</th>
                                            <th class="text-left column-black">Volt Amper Reativo</th>
                                            <th class="text-left column-black">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="potencia in potencias" :key="potencia.id">
                                            <td>{{ potencia.potencia || 'Não Informado' }}</td>
                                            <td>{{ potencia.potencia_fator || 'Não Informado'}}</td>
                                            <td>{{ potencia.volt_amper || 'Não Informado'}}</td>
                                            <td>{{ potencia.volt_amper_reativo || 'Não Informado'}}</td>
                                            <td>{{ potencia.created_at }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>    
                            </v-tabs-window-item>
                            <v-tabs-window-item value="impedancia">
                                <v-row class="pt-3 center title-dialog">
                                    <v-col>
                                        <b>{{ selectedLocation.id.toUpperCase() }}</b><br />
                                    </v-col>
                                    <v-col>
                                        <b>{{ selectedLocation.name.toUpperCase() }}</b>
                                    </v-col>
                                </v-row>
                                <v-row class="text-right pt-2">
                                    <v-btn block color="black" style="padding: 28px !important" @click="enviaComandoV2(selectedLocation.id, '9', '01')">
                                        <b>Medir Impedância</b>
                                    </v-btn>
                                </v-row>

                                <v-table class="w-100 pt-5">
                                    <thead>
                                        <tr>
                                            <th class="text-left column-black w-50">Impedância</th>
                                            <th class="text-left column-black w-50">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="impedancia in impedancias" :key="impedancia.id">
                                            <td>{{ impedancia.impedancia }}</td>
                                            <td>{{ impedancia.created_at }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>

                            </v-tabs-window-item>
                            <v-tabs-window-item value="sinal">
                                <v-row class="pt-3 center title-dialog">
                                    <v-col>
                                        <b>{{ selectedLocation.id.toUpperCase() }}</b><br />
                                    </v-col>
                                    <v-col>
                                        <b>{{ selectedLocation.name.toUpperCase() }}</b>
                                    </v-col>
                                </v-row>
                                <v-row class="text-right pt-2">
                                    <v-btn block color="black" style="padding: 28px !important" @click="enviaComandoV2(selectedLocation.id, '13', '01')">
                                        <b>Medir Sinal</b>
                                    </v-btn>
                                </v-row>

                                <v-table class="w-100 pt-5">
                                    <thead>
                                        <tr>
                                            <th class="text-left column-black">UP RSSI</th>
                                            <th class="text-left column-black">UP SNR</th>
                                            <th class="text-left column-black">DOWN RSSI</th>
                                            <th class="text-left column-black">DOWN SNR</th>
                                            <th class="text-left column-black">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="sinal in sinais" :key="sinal.id">
                                            <td>{{ sinal.RSSI }}</td>
                                            <td>{{ sinal.SNR }}</td>
                                            <td>{{ sinal.DownRSSI }}</td>
                                            <td>{{ sinal.DownSNR }}</td>
                                            <td>{{ sinal.created_at }}</td>                                            
                                        </tr>
                                    </tbody>
                                </v-table>

                            </v-tabs-window-item>
                            <v-tabs-window-item value="intervalo">
                                <v-row class="pt-3 center title-dialog">
                                    <v-col>
                                        <b>{{ selectedLocation.id.toUpperCase() }}</b><br />
                                    </v-col>
                                    <v-col>
                                        <b>{{ selectedLocation.name.toUpperCase() }}</b>
                                    </v-col>
                                </v-row>
                                <v-row class="text-right pt-2 pb-2">
                                    <v-col cols="12" md="6" sm="12" class="pr-3">
                                        <v-select
                                            label="Versão *"
                                            v-model="selectedLocation.intervalo_uplink"
                                            item-title="text"
                                            item-value="value"
                                            :items="intervaloOptions">
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" md="6" sm="12" class="pl-3">
                                        <v-btn block color="black" style="padding: 28px !important" @click="enviaComandoV2(selectedLocation.id, '12', selectedLocation.intervalo_uplink)">
                                            <b>Setar Intervalo</b>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <hr class="m-5"/>

                                <v-row class="pl-2 pt-2 pb-2">
                                    <v-col cols="12" md="6" sm="12" class="pr-3 mt-4">
                                       <label for=""><b>Firmware: </b>{{ firmware }}</label> 
                                    </v-col>
                                    <v-col cols="12" md="6" sm="12" class="pr-3">
                                        <v-btn block color="black" style="padding: 28px !important" @click="enviaComandoV2(selectedLocation.id, '17', '01')">
                                            <b>Consultar versão atual</b>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <hr class="m-5"/>

                                <v-row class="pl-2 pt-2" v-if="canResetChave">
                                    <v-col cols="12" md="6" sm="12" class="pr-3 mt-4">                                       
                                    </v-col>
                                    <v-col cols="12" md="6" sm="12" class="pr-3">
                                        <v-btn block color="black" style="padding: 28px !important" @click="enviaComandoV2(selectedLocation.id, '7', '01')">
                                            <b>Resetar Chave</b>
                                        </v-btn>
                                    </v-col>
                                </v-row>


                            </v-tabs-window-item>
                            <v-tabs-window-item value="sobrecorrente">
                                <v-row class="pt-3 center title-dialog">
                                    <v-col>
                                        <b>{{ selectedLocation.id.toUpperCase() }}</b><br />
                                    </v-col>
                                    <v-col>
                                        <b>{{ selectedLocation.name.toUpperCase() }}</b>
                                    </v-col>
                                </v-row>
                                <v-table class="w-100 pt-5">
                                    <thead>
                                        <tr>
                                            <th class="text-left column-black w-50">Sobrecorrente</th>
                                            <th class="text-left column-black w-50">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="sobrecorrente in sobrecorrentes" :key="sobrecorrente.id">
                                            <td>{{ sobrecorrente.sobrecorrente }}</td>
                                            <td>{{ sobrecorrente.created_at }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>

                            </v-tabs-window-item>                            
                        </v-tabs-window>
                    </v-card-text>
                </v-card>
            </v-card-text>
        </v-card>
    </v-dialog>

    <!-- Comandos Dialog -->
    <v-dialog v-model="commandosDialog" class="commandDialog">
        <v-card>            
            <v-row class="center pt-2">
                <v-col class="comand-title">
                    <b>{{ selectedLocation.id.toUpperCase() }}</b><br />
                        <b>{{ selectedLocation.name.toUpperCase() }}</b>
                </v-col>
            </v-row>

            <v-row class="center">
                <v-col class="yellow">
                    <div class="alert-title">
                        <b>!!! Atenção !!! um comando enviado incorretamente pode afetar o funcionamento da chave</b>
                    </div>
                </v-col>
            </v-row>
                  
            <v-row class="center yellow md-20">
                <v-col v-if="selectedLocation.status_disjuntor == '0' && selectedLocation.status_comando == '0'" class="no-padding">
                    <div class="status">
                        <b>Status: <span style="color:red">Offline</span></b>
                    </div>                            
                </v-col>
                <v-col v-if="selectedLocation.status_disjuntor == '0' && selectedLocation.status_comando == '1'" class="no-padding">
                    <div class="status">
                        <b>Status: <span style="color:purple">Offline com comando</span></b>
                    </div>                            
                </v-col>
                <v-col v-if="selectedLocation.status_disjuntor == '1' && selectedLocation.status_comando == '0'" class="no-padding">
                    <div class="status">
                        <b>Status: <span style="color:green">Online sem comando</span></b>
                    </div>
                </v-col>
                <v-col v-if="selectedLocation.status_disjuntor == '1' && selectedLocation.status_comando == '1'" class="no-padding">
                    <div class="status">
                        <b>Status: <span style="color:#f5c21f">Online</span></b>
                    </div>                            
                </v-col>
            </v-row>

            <v-row class="center mt-5" justify="center" no-gutters>
                <v-col cols="12" sm="5" xs="6" class="text-center p-7">
                    <v-btn block color="#116322" class="comando-btn" @click="enviaComando(selectedLocation, 'arme')">
                        <b>Disjuntor ON</b>
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="5" xs="6" class="text-center p-7">
                    <v-btn block color="#ff0808" class="comando-btn" @click="enviaComando(selectedLocation, 'desarme')">
                        <b>Disjuntor OFF</b>
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="5" xs="6" class="text-center p-7">
                    <v-btn block color="#116322" class="comando-btn" @click="enviaComando(selectedLocation, 'liga_comando')">
                        <b>Comando ON</b>
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="5" xs="6" class="text-center p-7">
                    <v-btn block color="#ff0808" class="comando-btn" @click="enviaComando(selectedLocation, 'desliga_comando')">
                        <b>Comando OFF</b>
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="5" xs="6" class="text-center p-7">
                    <v-btn block color="black" class="comando-btn" @click="enviaComando(selectedLocation, 'envia_dados')">
                        <b>Status</b>
                    </v-btn>
                </v-col>                    
            </v-row>                    
        </v-card>
    </v-dialog>

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
                            v-model="chave_id"
                            variant="underlined"
                            class="p-2"
                            @keypress.enter="getChaves(); buscarDialog = false;">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field 
                            label="Nome"
                            v-model="chave_nome"
                            variant="underlined"
                            class="p-2"
                            @keypress.enter="getChaves(); buscarDialog = false;">
                        </v-text-field>
                    </v-col>
                </v-row>


                <v-row justify="space-between" class="mb-3" no-gutters>
                    <v-col cols="12" md="6" sm="12">
                        <v-autocomplete v-if="gateways"
                            v-model="id_gateway"
                            label="Gateways"
                            item-title="name"
                            item-value="id"
                            class="p-2"
                            :items="gateways"
                            filled
                            outlined
                        >
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                        <v-autocomplete v-if="tipos"
                            v-model="tipo"
                            label="Status Chave"
                            item-title="name"
                            item-value="id"
                            :items="tipos"
                            class="p-2"
                            filled
                            outlined
                        >
                        </v-autocomplete>
                    </v-col>
                </v-row>

                <v-row justify="center" class="mb-3" no-gutters>
                    <v-col cols="12" md="12" sm="12" class="text-center">
                        <v-btn class="no-margin" size="small" color="black" @click="getChaves(); buscarDialog = false;">
                            <b>Buscar</b>
                        </v-btn>
                    </v-col>
                </v-row>
             
            </v-card-text>
        </v-card>
    </v-dialog>

    <!-- Legenda Dialog -->
    <v-dialog v-model="legendaDialog" class="legendaDialog">
        <v-card>
            <v-card-text class="pb-2 pt-2">
                <v-row class="center">
                    <v-col>
                        <div class="legenda-title">Legenda</div>
                    </v-col>
                </v-row>

                <v-table class="w-100 text-center">
                    <tbody>
                        <tr v-for="(legenda, i) in legendas" :key="i" class="text-left">
                            <td><img alt="{{legenda.text}}" :src="legenda.image" /></td>
                            <td><label class="md-16">{{ legenda.text }}</label></td>
                        </tr>
                    </tbody>
                </v-table>                
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" src="./MapaGeral.ts" />
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