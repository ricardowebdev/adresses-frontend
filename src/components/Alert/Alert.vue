<template>    
    <div v-if="showAlert">        
        <v-alert v-if="$props.type == 'success'"
            :text="$props.msg"
            border="start"
            type="success"
            closable
            :title="title"
            close-label="Close Alert"
            >
        </v-alert>
        <v-alert v-if="$props.type == 'error'" 
            :text="$props.msg"
            border="start"
            type="error"
            closable
            :title="title"
            close-label="Close Alert"
            >
        </v-alert>
        <v-alert v-if="$props.type == 'warning'" 
            :text="$props.msg"
            border="start"
            type="warning"
            closable
            :title="title"
            close-label="Close Alert"
            >
        </v-alert>
        <v-alert v-if="$props.type == 'info'" 
            :text="$props.msg"
            border="start"
            type="info"
            closable
            :title="title"
            close-label="Close Alert"
            >
        </v-alert>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Alert',
    props: {
        time: {
            type: Number
        },
        msg: {
            type: String
        },
        type: {
            type: String
        },
        callback: {
            type: String
        }
    },
    emits: ['clearAlert'],

    data() {
        return {
            title: "" as string
        }
    },
    created() {              
    },
    computed: {
        showAlert(): boolean {           
            if (this.$props.time) {
                if (this.$props.type) {
                    switch(this.$props.type) {
                        case "error":
                            this.title = "Lamento, ocorreram erros durante o processo";
                            break;
                        case "success":
                            this.title = "Sucesso";
                            break;
                        case "warning":
                            this.title = "Atenção pode ser que o processo tenha tido algum problema durante sua execução";                        
                            break;
                        default:
                            this.title = "Notificação";
                            break;
                    }
                }

                setTimeout(() => {
                    this.$emit('clearAlert');
                    if (this.$props.callback)
                        this.$router.push(this.$props.callback);
                }, this.$props.time);

                return true;
            }
            return false;
        }
    },
    methods: {
    }
})
</script>
<style> 
 </style>