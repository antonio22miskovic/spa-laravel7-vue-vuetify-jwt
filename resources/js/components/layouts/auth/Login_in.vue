<template>
	<div>
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
	</div>
</template>
<script>
import { Auth } from '../../../helpers/auth'
import { mapState , mapActions , mapMutations } from 'vuex'
	export default{

		name:'Login_in',

		data: () => ({

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
		}
	}
</script>