<template>
	<div>
		<Navbar/>
		<Drawer/>
		<v-container>
			<p>estoy en el home</p>

		</v-container>
	</div>
</template>
<script>
import Navbar from '../../components/layouts/navbar/Navbar'
import Drawer from '../../components/layouts/sidebar/Drawer'
	export default{
		name:'Home',
		components:{
			Navbar,
			Drawer
		},
		mounted(){

		},
		data : () => ({

		}),
		methods:{
			}
		}
</script>