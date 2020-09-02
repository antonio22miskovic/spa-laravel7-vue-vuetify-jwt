<template>
	<div>
    <v-card-text min-height="180" >
		<v-form ref="email">
            <v-text-field prepend-icon="mdi-email"
            	v-model="email"
              	name="email"
                :rules="rules"
                :error="error"
                label="introduzaca su email">
            </v-text-field>
            <v-card-actions>
            	  <v-btn block color="success" @click="confirmacion" :loading="loading">enviar</v-btn>
            </v-card-actions>
        </v-form>
    </v-card-text>
      <div class="text-center mt-10">
    	<v-btn text  color="secondary" :to="{name:'login_in'}">login</v-btn>
 	</div>
	</div>
</template>
<script>
import { mapState , mapActions , mapMutations } from 'vuex'
import Swal from 'sweetalert2'
	export default{

		name:'EmailVerifique',

		mounted(){
			this.title = 'recupera tu contraseña'
		},

		data: () => ({

			email:'',
			error:false,
			rules:[
        		value => !!value || 'El email es requerido.',
        		v => /.+@.+\..+/.test(v) || 'Introduzaca un E-mail Valido'
      		]

		}),

		methods:{

			confirmacion(){
				this.error = false
				if(!this.$refs.email.validate()){// verificar la validacion
             		 return
          		}
				this.$store.commit('AUTH/LOADING') // llamamos aesta mutacion que activa el loading
				this.$store.dispatch('AUTH/EMAIL_RESET_PASSWORD',this.email).then(res => {
					this.$store.commit('AUTH/SET_RESET_EMAIL',res.email)
          Swal.fire({
                position:'center',
                icon: 'success',
                title: 'El Codigo fue enviado a su Email',
                showConfirmButton: false,
                timer: 1500
            })
					this.$router.push({name:'codigoVerifique'})
				})
				.catch( err => {
					this.$store.commit('AUTH/AUTH_ERROR',err)
					this.error = true
					this.ErrorModal = true
				})
			}

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