<template>
	<div>
		<v-card-text>

        	<v-form ref="registro">

        		<v-text-field
        			append-icon="mdi-account"
      				v-model="data.name"
      				:counter="10"
      				:rules="[(validation.user === null) || validation.user,
        					v => !!v || 'Introduzaca el nombre del usuario',
        					v => (v && v.length <= 10) || 'No puedes tener un usuario con mas de 10 caracteres']"
      				label="usuario"
      				required
    			></v-text-field>

   				<v-text-field
   					append-icon="mdi-email"
      				v-model="data.email"
      				:rules="[(validation.email === null) || validation.email,
                  rules.required,
                  rules.email]"
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
          	    <v-btn color="secondary" @click="registrar" :loading='loading'> registrar </v-btn>
          	</v-card-actions>
        	</v-form>
    	</v-card-text>
    	<div class="text-center">
    	<v-btn text color="secondary" :to="{name:'login_in'}">login</v-btn>
 		</div>
	</div>
</template>
<script>
import Swal from 'sweetalert2'
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
			confirm_password:'',
			hidePassword:true,
      validation:{
        user:null,
        email:null
      },
      rules:{
        required: value => !!value || 'Introduzca un E-mail.',
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'E-mail Invalido.'
        },
      },

		}),


		methods:{

			registrar(){

        if (this.$refs.registro.resetValidation()) {
            return
        }
        this.$store.commit('AUTH/LOADING') // llamamos a esta mutacion que activa el loading
        this.$store.dispatch('AUTH/STORE_USER',this.data).then(res => {

          if (res.validation === undefined) {// comprobamos si hay errores de validacion
              this.$store.commit('AUTH/LOADING_FALSE')
               Swal.fire({
                position:'center',
                icon: 'success',
                title: 'Su registro fue exitoso',
                showConfirmButton: false,
                timer: 1500
              })
              this.reset()
              this.$router.push({name:'login_in'})
          }else{// si hay errores  veremos cual es
            this.validacion(res.validation)
            this.$store.commit('AUTH/LOADING_FALSE')
          }

        })
        .catch(err => console.log(err))
        this.$store.commit('AUTH/LOADING_FALSE')
			},

			reset(){
        		this.$refs.registro.reset()
      		},

      resetValidation(){
        	 return this.$refs.registro.resetValidation()
      		},

      validacion(datos){

        if (datos.name !== undefined) {// primero el usuario
          this.validation.user = datos.name[0]
        }else{
          this.validation.user = null
        }

        if (datos.email !== undefined) {// segundo el email
          this.validation.email = datos.email[0]
        }else{
           this.validation.email = null
        }

        if(!this.$refs.registro.validate()){// verificar la validacion
           return
        }

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
		}
	}
</script>