<template>
    <v-dialog v-model="$props.showLoader" width="auto">
        <v-card>
            <v-card-title>
                <v-row justify="center" class="mt-6 mb-6">
                    <span class="modal-title">Carregando</span>
                </v-row>
            </v-card-title>
            <v-card-text class="mr-6 ml-6 pb-6 pt-6">
                <img :src="loader" alt="Carregando dados" />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Loader from '@/assets/images/loader.gif';

export default defineComponent({
    name: 'Loader',
    props: {
        showLoader: {
            type: Boolean
        }
    },    
    data() {
        return {
            loader: Loader
        }
    }
})
</script>
