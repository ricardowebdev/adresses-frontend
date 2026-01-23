<template>
    <Alert :msg="msg" :type="type" :time="time" :callback="callBack" @clearAlert="clearAlert" />

    <v-container class="flex-wrap d-flex fullpage" >
        <v-card class="d-flex align-center flex-column w-100" rounded-lg>
            <v-card-title class="flex-row page-title" font-size="16">
                Logs
            </v-card-title>
            <v-container>
            <v-row justify="center" class="mb-3">
                <v-col class="v-col-6">
                    <span>Usuario: </span>{{ log.usuario }}
                </v-col>
                <v-col class="v-col-6">
                    <span>Tipo: </span>{{ log.tipo }}
                </v-col>
            </v-row>

            <v-row justify="center" class="mb-3">
                <v-col class="v-col-6">
                    <span>Ação: </span>{{ log.acao }}
                </v-col>
                <v-col class="v-col-6">
                    <span>Data: </span>{{ log.created_at }}
                </v-col>
            </v-row>

            <v-row justify="center" class="mb-3">
                <v-col class="v-col-12">
                    <span>Arquivo: </span>{{ log.arquivo }}
                </v-col>
            </v-row>

            <v-row>
                <v-col class="v-col-12">
                    <span>Descrição: </span>{{ log.descricao }}
                </v-col>
            </v-row>

            <v-row justify="center" no-gutters class="mt-6">
                <v-btn color="#cecece" class="mr-2" @click="$router.push('/logs')">
                    <span class="material-icons md-16 black">arrow_back</span>
                    <b>Voltar</b>
                </v-btn>
            </v-row>          
            </v-container>
        </v-card>
    </v-container>        
    
    <Loader :showLoader="showLoader" />
</template>

<script lang="ts" src="./LogsDetalhes.ts" />
<style>
    span {
        font-weight: bold;
    }
</style>
