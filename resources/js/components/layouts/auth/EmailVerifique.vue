<template>
	<div>
		<v-card-title primary-title>
        	<h4>Introduzca su email</h4>
        </v-card-title>
		<v-form >
            <v-text-field prepend-icon="mdi-email" v-model="email" name="email" label="email"></v-text-field>
            <v-card-actions>
            	<v-btn primary large block >enviar</v-btn>
            </v-card-actions>
        </v-form>
	</div>
</template>
<script>
import { mapState , mapActions , mapMutations } from 'vuex'

	export default{

		name:'EmailVerifique',

		data: () => ({

			email:''

		}),

		methods:{


		}
	}
</script>