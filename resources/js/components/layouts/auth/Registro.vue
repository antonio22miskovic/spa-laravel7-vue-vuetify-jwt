<template>
	<div>
		<v-card-text>

        	<v-form ref="registro">

        		<v-text-field
        			append-icon="mdi-account"
      				v-model="data.name"
      				:counter="10"
      				:rules="[(validation === null) || validation.name[0],
        					v => !!v || 'Introduzaca el nombre del usuario',
        					v => (v && v.length <= 10) || 'No puedes tener un usuario con mas de 10 caracteres']"
      				label="usuario"
      				required
    			></v-text-field>

   				<v-text-field
   					append-icon="mdi-email"
      				v-model="data.email"
      				:rules="emailRules"
      				label="E-mail"
      				required
   		 		></v-text-field>

   		 		<v-text-field
   		 			append-icon="mdi-lock"
            		type="password"
            		name="Password"
            		label="nueva contraseña"
            		id="Password"
            		:rules="[v => !!v || 'Contraseña requerida']"
            		v-model="data.password"
            		/>


            	<v-text-field
            		:type="hidePassword ? 'password' : 'text'"
            		:append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
            		name="confirm_password"
            		label="confirma la contraseña"
            		id="confirm_password"
            		:rules="[(data.password === confirm_password) || 'contraseña no coinciden']"
            		v-model="confirm_password"
            		@click:append="hidePassword = !hidePassword"/>

             <v-card-actions>
         		<v-btn color="warning" @click="reset"> clear </v-btn>
          		<v-spacer></v-spacer>
          		<v-btn color="secondary" @click="registrar"> registrar </v-btn>
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

		name:'Registro',
		mounted(){
			this.title = 'Registrate es gratis!!!'
		},

		data: () => ({
			data:{
				name:'',
				email:'',
				password:''
			},
      		nameRules: [

      		],
      		emailRules: [
        		v => !!v || 'Debe introducir un E-mail',
        		v => /.+@.+\..+/.test(v) || 'Introduzaca un E-mail Valido',
      		],
			confirm_password:'',
			hidePassword:true,
			validation:null
		}),


		methods:{
			registrar(){
				if(!this.$refs.registro.validate()){// verificar la validacion
             		 return
          		}

          		this.$store.dispatch('auth/store',this.data).then(res => {
          			if (res.validation === undefined) {
          				console.log('usuario creado con exito')
          			}else{
          				this.validation = res.validation
          				console.log(this.validation)
          			}

          		})
          		.catch(err => console.log(err))

			},
			reset(){
        		this.$refs.registro.reset()
      		},
      		resetValidation () {
        		this.$refs.registro.resetValidation()
      		},
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
		}
	}
</script>