<template>
	<v-app>
		 <v-content>
      		<Navbar/>
      		<Drawer v-if="currentUser"> </Drawer>
     		 <router-view/>
    	 </v-content>
	</v-app>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import Navbar from './components/layouts/navbar/Navbar'
import Drawer from './components/layouts/sidebar/Drawer'
	export default{

		name:'Render',
		components:{
			Navbar,
			Drawer
		},
		computed:{
		...mapState(['currentUser'])
		},
	}
</script>