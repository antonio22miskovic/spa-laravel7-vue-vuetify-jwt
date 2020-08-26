<template>
	<div>

         <v-card-text>
		<v-form ref="email" >
            <v-text-field prepend-icon="mdi-email" v-model="email" name="email" :rules="[rules.required]" label="introduzaca su email"></v-text-field>
            <v-card-actions>
            	  <v-btn block color="success" @click="confirmacion" :loading="loading">enviar</v-btn>
            </v-card-actions>
        </v-form>
    </v-card-text>
      <div class="text-center">
    	<v-btn text  color="secondary" :to="{name:'login_in'}">login</v-btn>
 	</div>
	</div>
</template>
<script>
import { mapState , mapActions , mapMutations } from 'vuex'

	export default{

		name:'EmailVerifique',

		mounted(){
			this.title = 'recupera tu contraseña'
		},

		data: () => ({

			email:'',
			rules: {
        		required: value => !!value || 'El email es requerido.'
      		}

		}),

		methods:{

			confirmacion(){
				if(!this.$refs.email.validate()){// verificar la validacion
             		 return
          		}
				 this.$store.commit('auth/login') // llamamos aesta mutacion que activa el loading
				this.$store.dispatch('auth/emailVerificacion',this.email).then(res => {
					this.$store.commit('auth/setResetEmail',res.email)
					this.$router.push({name:'codigoVerifique'})
				})
				.catch( err => {
					this.$store.commit('auth/authError',err)
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