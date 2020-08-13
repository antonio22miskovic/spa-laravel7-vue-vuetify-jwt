<template>
	<div>
		<div class="layout column align-center">
        	<img src="logos/logo.png" alt="recuperacion de password" width="180" height="180">
        	<h1 class="flex my-4 primary--text">Actualize su contraseña</h1>
    	</div>
         <v-card-text>
		<v-form >

             <v-text-field
            :type="hidePassword ? 'password' : 'text'"
            :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
            name="newPassword"
            label="nueva contraseña"
            id="newPassword"
            :rules="[rules.required]"
            v-model="newPassword"
            :error="error"
            @click:append="hidePassword = !hidePassword"/>


            <v-text-field
            :type="hidePassword2 ? 'password' : 'text'"
            :append-icon="hidePassword2 ? 'mdi-eye' : 'mdi-eye-off'"
            name="newPasswordc"
            label="confirmacion"
            id="newPasswordc"
            :rules="[rules.required]"
            v-model="newPasswordc"
            :error="error"
            @click:append="hidePassword2 = !hidePassword2"/>

            <v-card-actions>
            	 <v-btn block color="primary" @click="confirmacion" :loading="loading">actualizar</v-btn>
            </v-card-actions>
        </v-form>
    </v-card-text>
    <v-btn link :to="{name:'login_in'}">login</v-btn>
	</div>
</template>
<script>
	export default{

		name:'EmailVerifique',

		mounted(){

			if (this.$store.state.auth.resetdatos === null) {
				this.$router.push({name:'login_in'})
			}
		},

		data: () => ({

			newPassword:'',
			newPasswordc:'',
			hidePassword:true,
			hidePassword2:true,
			rules: {
        		required: value => !!value || 'Required.'
      		},
      		error:false

		}),

		methods:{

			confirmacion(){
				 this.$store.commit('auth/login') // llamamos aesta mutacion que activa el loading
				if (this.newPasswordc === this.newPassword) {
					let datos = {
						email       : this.$store.state.auth.resetdatos.email,
						codigo      : this.$store.state.auth.resetdatos.codigo,
						newPassword : this.newPassword
					}

					this.$store.dispatch('auth/passwordReset',datos).then(res => {
						this.error = false
						this.$store.commit('auth/clearReset')
						this.$router.push({name:'login_in'})
					})
					.catch( err => {
						this.$store.commit('auth/authError',err)
					})
				}else{
					this.error = true
					this.newPasswordc = null
					this.$store.commit('auth/authError','contraseña no coinciden')
					this.ErrorModal = true
				}

			}

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