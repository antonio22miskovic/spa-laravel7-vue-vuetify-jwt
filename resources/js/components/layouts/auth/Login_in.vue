<template>
	<div>
		<v-card-title primary-title>
        	<h4>Login</h4>
        </v-card-title>
        <v-form >
            <v-text-field prepend-icon="mdi-email" v-model="credenciales.email" name="email" label="email"></v-text-field>
            <v-text-field prepend-icon="mdi-lock" v-model="credenciales.password" name="Password" label="Password" type="password"></v-text-field>
            <v-card-actions>
              	<v-btn primary large block @click="autenticacion">Login</v-btn>
            </v-card-actions>
        </v-form>
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
      }
		}),

		methods:{

      autenticacion(){

        this.$store.commit('auth/login') // llamamos aesta mutacion que activa el loading
        this.$store.dispatch('auth/auth',this.credenciales).then(res => {// acciones para el login
           setAuthorization(res.access_token)// introducimos el token en el header de axios
          this.$store.commit('auth/loginExitoso',res)// si el login es exitoso
          this.$router.push({path:'/home'})// empujamos a la vista home
        })
        .catch((error) => {
          this.$store.commit('auth/authError',error)// validamos el error
        })
      },


		},

		computed:{

		}
	}
</script>