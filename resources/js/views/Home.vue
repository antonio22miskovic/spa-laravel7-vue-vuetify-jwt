<template>
	<div>
		<v-container>
			<p>estoy en el home</p>

		</v-container>
	</div>
</template>
<script>

	export default{
		name:'Home',
		mounted(){
			this.getPrducto()
		},
		data : () => ({

			producto:[]

		}),
		methods:{

			getPrducto(){
				axios.get('api/producto').then(res =>{
					this.producto = res.data
					console.log(this.producto)
				})
				.catch(e =>{
					console.log(e)
				})
			}
		}

	}
</script>