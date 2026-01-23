<template>
    <Loader :showLoader="showLoader" />
    <Alert :msg="msg" :type="type" :time="time" :callback="callBack" @clearAlert="clearAlert" />

    <v-container class="flex-wrap d-flex fullpage" >
        <v-card class="dflex align-center flex-column w-100" rounded-lg>
            <v-card-title class="flex-row page-title" font-size="16">
                Enderecos
            </v-card-title>
            <v-container>
                <v-row justify="space-around" class="mb-3" no-gutters>
                    <v-col class="mr-3" cols="12" md="5" sm="12">
                        <v-text-field 
                            variant="underlined"
                            v-model="endereco.cep"
                            label="Cep *"
                            @focusout="getAddress(endereco.cep)"
                            :error="validaEndereco.msgCep ? true : false"
                            :error-messages="validaEndereco.msgCep"
                            maxlength="10" />
                    </v-col>

                    <v-col cols="12" md="5" sm="12">
                        <v-autocomplete v-if="listEstados"
                            v-model="endereco.uf"
                            label="Estado *"
                            item-title="estado"
                            item-value="sigla"
                            :items="listEstados"
                            filled
                            underlined />
                        <span class="alert" v-if="validaEndereco.msgUF ? true : false">
                            {{ validaEndereco.msgUF }}
                        </span>
                    </v-col>                    
                </v-row>

            <v-row justify="space-around" class="mb-3" no-gutters>
                <v-col class="mr-3" cols="12" md="5" sm="12">
                    <v-text-field 
                        variant="underlined"
                        v-model="endereco.cidade"
                        label="Cidade *"
                        :error="validaEndereco.msgCidade ? true : false"
                        :error-messages="validaEndereco.msgCidade"
                        maxlength="50" />
                </v-col>

                <v-col class="mr-3" cols="12" md="5" sm="12">
                    <v-text-field 
                        variant="underlined"
                        v-model="endereco.bairro"
                        label="Bairro"
                        maxlength="50" />
                </v-col>                
            </v-row>

            <v-row justify="space-around" class="mb-3" no-gutters>
                <v-col cols="12" md="11" sm="12">
                    <v-text-field 
                        variant="underlined"
                        v-model="endereco.logradouro"
                        label="Logradouro *"
                        :error="validaEndereco.msgLogradouro ? true : false"
                        :error-messages="validaEndereco.msgLogradouro"
                        maxlength="100" />
                </v-col>
                <v-col cols="12" md="11" sm="12">
                    <v-text-field 
                        variant="underlined"
                        v-model="endereco.numero"
                        label="Numero "
                        maxlength="15" />
                </v-col>                
            </v-row>

            <v-divider class="mb-5 mt-5"></v-divider>

            <v-row justify="space-around" class="mb-3" no-gutters>
                <v-col cols="12" md="5" sm="12">
                    <v-text-field 
                        variant="underlined"
                        v-model="endereco.nome"
                        label="Nome *"
                        :error="validaEndereco.msgNome ? true : false"
                        :error-messages="validaEndereco.msgNome"
                        maxlength="100" />
                </v-col>

                <v-col cols="12" md="5" sm="12">
                    <v-text-field 
                        variant="underlined"
                        v-model="endereco.telefone"
                        label="Telefone "
                        maxlength="100" />
                </v-col>                
            </v-row>

            <v-row justify="space-around" class="mb-3" no-gutters>
                <v-col cols="12" md="11" sm="12">
                    <v-text-field 
                        variant="underlined"
                        v-model="endereco.email"
                        label="E-mail *"
                        :error="validaEndereco.msgEmail ? true : false"
                        :error-messages="validaEndereco.msgEmail"
                        maxlength="150" />
                </v-col>
            </v-row>

            <v-row justify="center" no-gutters class="mt-6">
                <v-btn color="#cecece" class="mr-2" @click="$router.push('/')">
                    <span class="material-icons md-16 black">cancel</span>
                    <b>Cancelar</b>
                </v-btn>

                <v-btn color="#ffbd1e" @click="setEndereco()" :disabled="isDisabled">
                    <span class="material-icons md-16 black">check_circle</span>
                    <b>Confirmar</b>
                </v-btn>
            </v-row>          
            </v-container>
        </v-card>
    </v-container>        
</template>

<script lang="ts" src="./EnderecoForm.ts" />
