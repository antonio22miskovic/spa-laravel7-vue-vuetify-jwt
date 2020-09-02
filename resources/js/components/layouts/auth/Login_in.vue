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
      <v-btn text color="secondary" :to="{name:'registro'}"> Registrate </v-btn>
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
          this.$store.commit('AUTH/LOADING') // llamamos aesta mutacion que activa el loading
          this.$store.dispatch('AUTH/AUTH',this.credenciales).then(res => {// acciones para el login
              setAuthorization(res.access_token)// introducimos el token en el header de axios
              this.error = true
              this.$store.commit('AUTH/lOGIN_SUCCESS',res)// si el login es exitoso
              this.$router.push({path:'/home'})// empujamos a la vista home
          })
          .catch((err) => {
              this.$store.commit('AUTH/AUTH_ERROR',err)// validamos el error
              this.ErrorModal = true
              this.error = true
          })
      },


		},

		computed:{
      title:{
        set(value){
          return this.$store.commit('AUTH/TITLE',value)
        },
        get(){
          return this.$store.state.AUTH.title
        }
      },
      loading(){
        return this.$store.state.AUTH.loading
      },
      ErrorModal:{
        set(value){
          return this.$store.commit('AUTH/ERROR_ON',value)
      },
        get(){
          return this.$store.state.AUTH.showResult
      }
    },

		}
	}
</script>
