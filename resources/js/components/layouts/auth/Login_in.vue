<template>
	<div>

    <v-card-text>
        <v-form ref="login">

          <v-text-field
            append-icon="mdi-account"
            name="login"
            label="usuario"
            type="text"
            v-model="credenciales.email"
            :error="error"
            :rules="[rulesUser.required]"/>

          <v-text-field
            :type="hidePassword ? 'password' : 'text'"
            :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
            name="password"
            label="contraseña"
            id="password"
            :rules="[rulesPassword.required]"
            v-model="credenciales.password"
            :error="error"
            @click:append="hidePassword = !hidePassword"/>
             <v-card-actions>
          <v-btn block color="success" @click="autenticacion" :loading="loading">Login</v-btn>
          <br>
   </v-card-actions>

        </v-form>
    </v-card-text>
    <div class="text-center">
      <v-btn text color="secondary"  :to="{name:'emailVerifique'}"> Olvidaste tu Contraseña? </v-btn>
    </div>
    <div class="text-center">
      <v-btn text color="secondary" :to="{name:'emailVerifique'}"> Registrate </v-btn>
    </div>
	</div>
</template>

<script>
import { setAuthorization } from '../../../helpers/axiosDefaultHeaders'
	export default{

		name:'Login_in',

    mounted(){
      this.title = 'login'
    },

		data: () => ({

      credenciales:{
        email:'',
        password:'',
      },
      rulesUser: {
        required: value => !!value || 'debe introducir su usuario.'
      },
      rulesPassword: {
        required: value => !!value || 'Por favor introduzca la contraseña.'
      },
      hidePassword: true,
      error: false,

		}),

		methods:{

      autenticacion(){

          if(!this.$refs.login.validate()){// verificar la validacion
              return
          }
          this.$store.commit('auth/login') // llamamos aesta mutacion que activa el loading
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
      title:{
            set(value){
              return this.$store.commit('auth/updateTitle',value)
            },
            get(){
              return this.$store.state.auth.title
            }
      },
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
