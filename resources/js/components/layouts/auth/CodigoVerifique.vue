<template>
	<div>

        <v-card-text>
		<v-form ref="codigo">
            <v-text-field prepend-icon="mdi-email" v-model="codigo" :rules="[rules.required]" name="codigo" label="codigo"></v-text-field>
            <v-card-actions>
            	<v-btn color="primary" @click="actualizar" :loading="loading">actualizar</v-btn>
            	 <v-spacer></v-spacer>
            	<v-btn color="success" @click="confirmacion" :loading="loading">enviar</v-btn>
            </v-card-actions>
        </v-form>
    </v-card-text>
    <div class="text-center">
    	<v-btn text color="secondary" :to="{name:'login_in'}">login</v-btn>
 	</div>
	</div>
</template>
<script>

	export default{

		name:'EmailVerifique',

		mounted(){

			if (this.$store.state.auth.resetemail === null) {
				this.$router.push({name:'login_in'})
			}
			this.title = 'confirmacion de codigo'
		},

		data: () => ({

			codigo:'',
			rules: {
        		required: value => !!value || 'El codigo es requerido.'
      		}

		}),

		methods:{

			confirmacion(){
				if(!this.$refs.codigo.validate()){// verificar la validacion
             		 return
          		}
				 this.$store.commit('auth/login') // llamamos aesta mutacion que activa el loading
				let datos = {
					email  : this.$store.state.auth.resetemail,
					codigo : this.codigo
				}

				this.$store.dispatch('auth/codigoVerificacion',datos).then(res => {
					this.$store.commit('auth/setResetDatos',res.datos)
					this.$router.push({name:'updatePassword'})
				})
				.catch( err =>{
					this.$store.commit('auth/authError',err)
					this.ErrorModal = true
				})
			},

			actualizar(){
				this.codigo = null
				let datos = { email : this.$store.state.auth.resetemail }
				this.$store.dispatch('auth/CodigoUpdate',datos).then(res => {
						this.$store.commit('auth/authError',res)// uso el error para anunciar la actualizacion
						this.ErrorModal = true

				})
				.catch( err =>{

					this.$store.commit('auth/authError','no se pudo actualizar el codigo')
					this.ErrorModal = true

				})

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