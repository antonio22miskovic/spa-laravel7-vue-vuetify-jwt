<template>
	<div>

         <v-card-text>
		<v-form ref="new">

             <v-text-field
            type="password"
            name="newPassword"
            label="nueva contraseña"
            id="newPassword"
            :rules="[rulesnewpassword.required]"
            v-model="newPassword"
            :error="error"
            @click:append="hidePassword = !hidePassword"/>


            <v-text-field
            :type="hidePassword2 ? 'password' : 'text'"
            :append-icon="hidePassword2 ? 'mdi-eye' : 'mdi-eye-off'"
            name="newPasswordc"
            label="confirma la contraseña"
            id="newPasswordc"
            :rules="[rulesConfirpassword.required]"
            v-model="newPasswordc"
            :error="error"
            @click:append="hidePassword2 = !hidePassword2"/>

            <v-card-actions>
            	 <v-btn block color="success" @click="confirmacion" :loading="loading">actualizar</v-btn>
            </v-card-actions>
        </v-form>
    </v-card-text>
    <div class="text-center">
    	<v-btn text  color="secondary" :to="{name:'login_in'}">login</v-btn>
 	  </div>
	</div>
</template>
<script>
	export default{

		name:'EmailVerifique',

		mounted(){

			if (this.$store.state.auth.resetdatos === null) {
				this.$router.push({name:'login_in'})
			}

			this.title = 'actualiza su contraseña'
		},

		data: () => ({

			newPassword:'',
			newPasswordc:'',
			hidePassword:true,
			hidePassword2:true,
			rulesnewpassword: {
        		required: value => !!value || 'introduzaca su nueva contraseña.'
      		},
      		rulesConfirpassword: {
        		required: value => !!value || 'confirme su contraseña.'
      		},
      		error:false

		}),

		methods:{

			confirmacion(){
				if(!this.$refs.new.validate()){// verificar la validacion
             		 return
          		}
				this.$store.commit('auth/loading') // llamamos aesta mutacion que activa el loading
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