<!-- <template>
	 <v-container>
    <v-layout row class="text-xs-center">
      <v-flex xs3 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
        <v-card height="500px"></v-card>
      </v-flex>
      <v-flex xs4 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <router-view/>
          </v-card>
                 <v-alert class="my-8" v-if="error != null" type="error">
                    {{ error }}
                 </v-alert>
                <v-btn :to="{name:'emailVerifique'}"> olvidaste tu contraseña </v-btn>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {

		name:'Login',

     created(){

      this.initError()

    },

    data:() =>({

    }),

        methods:{

          initError(){
              this.error = null
          }

      },

        computed:{

          error:{

            get(){

              return this.$store.state.auth.auth_error

            },

            set(value){

              this.$store.commit('auth/refreshError')

            }
          },
    },

}

</script> -->
<template>
  <v-app id="login" class="secondary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
                <router-view/>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar
        v-model="ErrorModal"
        :timeout="2000"
        top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
export default {

  name:'Login',

  data: () => ({

  }) ,

  methods: {

  },
  computed:{
    ErrorModal:{
      set(value){
          return this.$store.commit('auth/MostrarError',value)
      },
      get(){
          return this.$store.state.auth.showResult
      }
    },

    result(){
      return this.$store.state.auth.auth_error
    }

  }
}
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
