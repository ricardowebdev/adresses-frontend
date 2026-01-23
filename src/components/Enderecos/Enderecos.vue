<template>
    <Alert :msg="msg" :type="type" :time="time" :callback="callBack" @clearAlert="clearAlert" />

    <v-container class="flex-wrap d-flex fullpage" >
        <v-card class="d-flex align-center flex-column w-100" rounded-lg>
            <v-card-title class="flex-row page-title">
                Endereços Cadastrados
            </v-card-title>
            <v-container>
                <v-row justify="end" class="mb-3" no-gutters>
                    <v-col cols="12" md="12" sm="12" class="text-right">
                        <v-btn size="small" color="#cecece" class="mr-2" @click="search()">
                            <span class="material-icons md-16 black">search</span>
                            <b>Buscar</b>
                        </v-btn>
                        <v-btn size="small" color="#f5c21f" @click="$router.push('/endereco')" v-show="canAdd">
                            <span class="material-icons md-16 black">add</span>
                            <b>Adicionar</b>
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

                <v-row justify="center" class="mb-3" no-gutters>
                    <v-container class="d-flex align-center flex-row container-control no-padding">
                        <v-data-table :items="enderecos" 
                            class="elevation-1 striped-table"
                            items-per-page="15"
                            items-per-page-text="Itens por pagina">
                            <template v-slot:item.acoes="{ item }">
                                <v-btn size="x-small" color="#f5c21f" class="ml-2" @click="setEdit(item)" v-show="canEdit">
                                    <span class="material-icons md-16 black">edit</span>
                                    <b>Editar</b>
                                </v-btn>
                                <v-btn size="x-small" color="#000000" class="ml-2 white" @click="setDelete(item)" v-show="canDelete">
                                    <span class="material-icons md-16" >delete</span>
                                    <b>Excluir</b>
                                </v-btn>
                            </template>                            
                        </v-data-table>                          
                    </v-container>
                </v-row>      
            </v-container>
        </v-card>
    </v-container>        

    <Loader :showLoader="showLoader" />
    
    <!-- Exclusão -->
    <v-dialog v-model="dialog" width="auto">
        <v-card>
          <v-card-title>
            <v-row justify="center" class="mt-6 mb-6">
                <span class="modal-title">Exclusão</span>
            </v-row>
          </v-card-title>
          <v-card-text class="mr-6 ml-6 pb-6 pt-6">
            <v-row class="modal-title mt-0 mb-3">
                Tem certeza de que deseja excluir este Perfil ?
            </v-row>
            <v-row class="modal-text column-grey m-4">
                <b class="mr-2">Cep: </b> {{ SelectedEndereco.cep }}
            </v-row>
            <v-row class="modal-text column-white m-4">
                <b class="mr-2">UF / Cidade: </b> {{ SelectedEndereco.uf }} / {{ SelectedEndereco.cidade }}
            </v-row>
            <v-row class="modal-text column-grey m-4">
                <b class="mr-2">Logradouro: </b> {{ SelectedEndereco.logradouro }}  {{ SelectedEndereco.numero }}
            </v-row>
          </v-card-text>
          <v-card-actions class="mt-6">
            <v-row justify="end" class="mr-6 mb-6">
                <v-btn color="#f5c21f" @click="dialog = false">
                    Fechar
                </v-btn>

                <v-btn color="#000000" @click="confirmDelete()">
                    Confirmar
                </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" src="./Enderecos.ts" />
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
</style>
<style>
    th {
        background-color: black !important;
        color: white !important;
        font-weight: bold !important;
        font-size: 16px !important;
    }
</style>