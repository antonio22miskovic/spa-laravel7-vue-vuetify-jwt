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
import { mapState , mapGetters , mapActions , mapMutations } from 'vuex'
	export default{
		name:'Login',
    data:() =>({

      email:'',
      password:'',
      errors:'',

    }),

        methods:{

          ...mapMutations(['header']),

          autenticacion(){

              this.$store.dispatch('login')
              const autorizacion = new Auth(this.email, this.password)

                autorizacion.login().then(res =>{

                  this.$store.commit('loginexitoso', res)
                  this.header()
                  this.$router.push({path:'/home'})

                  })
                  .catch((error) => {

                  this.$store.commit('loginfallido', {error})

                  })

        },
      },
        computed:{

      ...mapState(['auth_error'])

    },

	}
</script>