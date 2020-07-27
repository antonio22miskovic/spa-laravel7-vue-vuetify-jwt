<template>
	 <v-container>
    <v-layout row class="text-xs-center">
      <v-flex xs3 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
        <v-card height="500px"></v-card>
      </v-flex>
      <v-flex xs4 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Login</h4>
            </v-card-title>
            <v-form >
            <v-text-field prepend-icon="mdi-user" v-model="email" name="email" label="email"></v-text-field>
            <v-text-field prepend-icon="mdi-lock" v-model="password" name="Password" label="Password" type="password"></v-text-field>
            <v-card-actions>
              <v-btn primary large block @click="autenticacion">Login</v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { Auth } from '../../../helpers/auth'
import { mapState , mapActions , mapMutations } from 'vuex'

export default {

		name:'Login',

    data:() =>({

      email:'',
      password:'',
      errors:'',

    }),

        methods:{

          ...mapActions('auth', [ 'login' ]),
          ...mapMutations('auth',['loginexitoso','loginfallido']),
          autenticacion(){

              this.login()
              Auth(this.email, this.password).then(res => {
                  this.loginexitoso(res)
                  this.$router.push({path:'/home'})

              })
              .catch((error) => {
                  this.loginfallido(error)
              })

        },

      },

        computed:{

      ...mapState('auth',['auth_error'])

    },

}

</script>