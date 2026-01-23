<template>
    <div class="w-100 flex-column d-flex flex-column pt-4 pl-3 pr-3 menu-container">
        <v-row align="start">
            <v-col class="v-col-9">
                <button @click="navigateUrl()">
                    <img alt="Enderecos Logo" class="logo mr-4" src="@/assets/images/logo.png" width="70" height="70" @click="navigateUrl()" />
                </button>

                <button @click="navigateUrl()">
                    <span class="menu-title logo mr-4">Enderecos</span>                
                </button>
            </v-col>

            <v-col class="v-col-1">
                <v-menu transition="slide-x-transition">
                    <template v-slot:activator="{ props }">
                        <v-btn color="black" v-bind="props">
                            <span class="material-icons md-10">menu</span>
                            <b>Menu</b>
                        </v-btn>
                    </template>
                    <v-list style="width: 100%;">
                        <v-list-item 
                            v-for="cadastro in cadastros"
                            :key="cadastro.id"
                            class="navigable"
                            :title="cadastro.modulo"
                            :prepend-avatar="cadastro.image"
                            @click="navigateUrl(cadastro.rota)" />
                        <hr />
                        <v-list-item 
                            v-for="modulo in modulos" 
                            :key="modulo.id"                             
                            :prepend-avatar="modulo.image"
                            :title="modulo.modulo"
                            @click="navigateUrl(modulo.rota)" />
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import router from '@/router';
    import Endereco from '@/assets/images/enderecos.png';
    import Log from '@/assets/images/logs.png';
    import Mapa from '@/assets/images/maps.png';

    export default defineComponent({
        name: 'Menu',

        data() {
            return {
                cadastros: [] as any,
                modulos: [] as any,
            }
        },

        created() {
            this.cadastros = this.getItems();
            this.modulos = this.getModulos();
        },
        methods: {
            getItems() {
                const itens = [];
                itens.push({ 
                    id: 1,
                    modulo: "Enderecos",
                    image: Endereco,
                    rota: "/"
                });
                
                return itens;
            },

            getModulos() {
                const modulos = [];
                modulos.push({ 
                    id: 1,
                    modulo: "Log",
                    image: Log,
                    rota: "/logs",
                });
                // modulos.push({ 
                //     id: 2,
                //     modulo: "Mapa",
                //     image: Mapa,
                //     rota: "/mapas",
                // });                

                return modulos;
            },

            navigateUrl(url = '/' as String) {
                this.$router.push('' + url);
            },
        }
    });
</script>
<style>
  .menu-title {
    color: black;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
  }
  .title:hover {
    color:black;
  }
  .navigable {
    cursor: pointer;
  }
  .navigable:hover {
    cursor: pointer;
    background-color: lightgray;
  }
  .center {
    text-align: center;
  }
</style>
<style scoped>
.menu-container {
  background-color: #f5c21f;
  padding: 1rem 2rem;
}

@media (max-width: 600px) {
  .menu-container {
    padding: 0.5rem 0.5rem;
  }
  .menu-title {
    font-size: 20px;
  }
  .logo {
    width: 40px !important;
    height: 40px !important;
  }
  .v-col-9, .v-col-1 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .v-row {
    flex-direction: column !important;
  }
  .v-btn {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>