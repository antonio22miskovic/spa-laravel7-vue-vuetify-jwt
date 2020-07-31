<template>
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

</script>