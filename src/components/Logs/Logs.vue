<template>
    <Alert :msg="msg" :type="type" :time="time" :callback="callBack" @clearAlert="clearAlert" />
    <v-container class="flex-wrap d-flex fullpage" >
        <v-card class="d-flex align-center flex-column w-100 no-padding" rounded-lg>
            <v-card-title class="flex-row page-title">
                Logs
            </v-card-title>
            <v-container>
                <v-row justify="end" class="mb-3" no-gutters>
                    <v-col cols="12" md="12" sm="12" class="text-right">
                        <v-btn size="small" color="#cecece" class="mr-2" @click="search()">
                            <span class="material-icons md-16 black">search</span>
                            <b>Buscar</b>
                        </v-btn>
                        <v-text-field 
                            label="Busca"
                            v-model="searchText"
                            variant="underlined"
                            class="mr-2"
                            @keypress.enter="search()"
                            @keyup="filterLocal()"></v-text-field>
                    </v-col>
                </v-row>

                <div class="responsive-table">
                    <v-data-table :items="logs" 
                        class="elevation-1 striped-table"
                        items-per-page="15"
                        items-per-page-text="Itens por pagina">
                        <template v-slot:item.acoes="{ item }">
                            <v-btn size="x-small" color="black" class="ml-2" @click="openInNewTab(item.id)">
                                <span class="material-icons md-16">edit</span>
                                <b>Visualizar</b>
                            </v-btn>
                        </template>
                    </v-data-table>
                </div>
            </v-container>
        </v-card>
    </v-container>        

    <Loader :showLoader="showLoader" />
</template>

<script lang="ts" src="./Logs.ts" />
<style>
    .white {
        color: white;
    }
    .modal-text {
        text-align: center;      
    }
    .modal-title {
        text-align: center;
        font-weight: 500;
    }
    .m-0 {
        margin: 0px !important;
    }
    .m-4 {
        margin: 4px !important;
    }
    .container-control {
        grid-area: control;
    }
    .no-margin {
        margin: 0px !important;
    }
    .no-padding {
        padding: 0px !important;
    }
    .dataTables_length {
        display: none !important;
    }
    .link {
        break-after: always;
        padding: 6px;
        background-color: black;
        color: white;
        font-weight: 700;
        border-radius: 6px;        
    }
</style>
<style>
    th {
        background-color: black !important;
        color: white !important;
        font-weight: bold !important;
        font-size: 16px !important;
    }
</style>