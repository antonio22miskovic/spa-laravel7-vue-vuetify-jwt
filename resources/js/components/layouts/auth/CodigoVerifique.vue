<template>
	<div>

        <v-card-text>
		<v-form ref="codigo">
            <v-text-field
            	prepend-icon="mdi-email"
             	v-model="codigo"
             	:rules="[rules.required]"
             	name="codigo"
             	:error="error"
             	label="codigo">
            </v-text-field>
            <v-card-actions>
            	<v-btn color="primary" @click="actualizar" :loading="loading2">actualizar</v-btn>
            	 <v-spacer></v-spacer>
            	<v-btn color="success" @click="confirmacion" :loading="loading">enviar</v-btn>
            </v-card-actions>
        </v-form>
    </v-card-text>
    <div class="text-center mt-10">
    	<v-btn text color="secondary" :to="{name:'login_in'}">login</v-btn>
 	</div>
	</div>
</template>
<script>
import Swal from 'sweetalert2'
	export default{

		name:'EmailVerifique',

		mounted(){

			if (this.$store.state.AUTH.resetemail === null) {
				this.$router.push({name:'login_in'})
			}
			this.title = 'confirmacion de codigo'
		},

		data: () => ({

			codigo:'',
			error:false,
			loading2:false,
			rules: {
        		required: value => !!value || 'El codigo es requerido.'
      		}

		}),

		methods:{

			confirmacion(){
				this.error = false
				if(!this.$refs.codigo.validate()){// verificar la validacion
             		 return
          		}
				this.$store.commit('AUTH/LOADING')// llamamos aesta mutacion que activa el loading
				let datos = {
					email  : this.$store.state.AUTH.resetemail,
					codigo : this.codigo
				}

				this.$store.dispatch('AUTH/CODIGO_RESET_PASSWORD',datos).then(res => {
					this.$store.commit('AUTH/SET_RESET_DATOS',res.datos)
					this.$router.push({name:'updatePassword'})
				})
				.catch( err => {
					this.$store.commit('AUTH/AUTH_ERROR',err)
					this.error = true
					this.ErrorModal = true
				})
			},

			actualizar(){
				this.error = false
				this.loading2 = true
				this.codigo = null
				let datos = { email : this.$store.state.AUTH.resetemail }
				this.$store.dispatch('AUTH/UPDATE_CODIGO_RESET_PASSWORD',datos).then(res => {
						Swal.fire({
  							position:'center',
  							icon: 'success',
  							title: 'Se actualizo el Codigo verifique su E-mail',
  							showConfirmButton: false,
  							timer: 1500
						})
						this.loading2 = false
						this.$store.commit('AUTH/AUTH_ERROR',res)// uso el error para anunciar la actualizacion
						this.ErrorModal = true

				})
				.catch( err =>{
					this.loading2 = false
					this.$store.commit('AUTH/AUTH_ERROR','no se pudo actualizar el codigo')
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