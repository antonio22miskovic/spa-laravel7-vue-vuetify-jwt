<template>
	<div>
		<div class="layout column align-center">
        <img src="/logos/logo.png" alt="Vue Material Admin" width="180" height="180">
        <h1 class="flex my-4 primary--text">Login</h1>
    </div>
    <v-card-text>
        <v-form>

          <v-text-field
            append-icon="mdi-account"
            name="login"
            label="Login"
            type="text"
            v-model="credenciales.email"
            :error="error"
            :rules="[rules.required]"/>

          <v-text-field
            :type="hidePassword ? 'password' : 'text'"
            :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
            name="password"
            label="Password"
            id="password"
            :rules="[rules.required]"
            v-model="credenciales.password"
            :error="error"
            @click:append="hidePassword = !hidePassword"/>
             <v-card-actions>
          <v-btn block color="primary" @click="autenticacion" :loading="loading">Login</v-btn>
          <br>
   </v-card-actions>

        </v-form>
    </v-card-text>

   <v-btn link :to="{name:'emailVerifique'}">recuperar contraseña</v-btn>


	</div>

</template>

<script>
import { setAuthorization } from '../../../helpers/axiosDefaultHeaders'
	export default{

		name:'Login_in',

		data: () => ({

      credenciales:{
        email:'',
        password:'',
      },
      rules: {
        required: value => !!value || 'Required.'
      },
      hidePassword: true,
      error: false,

		}),

		methods:{

      autenticacion(){
          this.$store.commit('auth/login') // llamamos aesta mutacion que activa el loading
          if (!this.credenciales.email || !this.credenciales.password) {
              this.$store.commit('auth/authError','Email y contraseña requeridos')
              this.ErrorModal = true
            return
          }
          this.$store.dispatch('auth/auth',this.credenciales).then(res => {// acciones para el login
              setAuthorization(res.access_token)// introducimos el token en el header de axios
              this.error = true
              this.$store.commit('auth/loginExitoso',res)// si el login es exitoso
              this.$router.push({path:'/home'})// empujamos a la vista home
          })
          .catch((err) => {
              this.$store.commit('auth/authError',err)// validamos el error
              this.ErrorModal = true
              this.error = true
          })
      },


		},

		computed:{
      loading(){
        return this.$store.state.auth.loading
      },
      ErrorModal:{
      set(value){
          return this.$store.commit('auth/MostrarError',value)
      },
      get(){
          return this.$store.state.auth.showResult
      }
    },

		}
	}
</script>
