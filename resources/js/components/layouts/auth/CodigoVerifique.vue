<template>
	<div>
		<div class="layout column align-center">
        	<img src="logos/logo.png" alt="recuperacion de password" width="180" height="180">
        	<h1 class="flex my-4 primary--text">Confirme el codigo</h1>
    	</div>
        <v-card-text>
		<v-form >
            <v-text-field prepend-icon="mdi-email" v-model="codigo" :rules="[rules.required]" name="codigo" label="codigo"></v-text-field>
            <v-card-actions>
            	 <v-btn block color="primary" @click="confirmacion" :loading="loading">enviar</v-btn>
            </v-card-actions>
        </v-form>
    </v-card-text>
    <div class="text-center">
    	<v-btn text :to="{name:'login_in'}">login</v-btn>
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
		},

		data: () => ({

			codigo:'',
			rules: {
        		required: value => !!value || 'Required.'
      		}

		}),

		methods:{

			confirmacion(){
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