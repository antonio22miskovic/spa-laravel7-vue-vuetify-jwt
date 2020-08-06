<template>
		<v-app-bar
  			color="deep-purple accent-4"
        dense
    		 >
         <!-- NAV PARA USUARIO NO LOGUEADO -->
         <template v-if="!currentUser">
              <v-toolbar-title>
                  <router-link to="/" tag="span" style="cursor:pointer">vuetify</router-link>
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-toolbar-items>

                      <v-btn color="primary" text small>
                        <router-link to="/login"tag="span">login</router-link>
                      </v-btn>

                      <v-btn color="primary" text small>
                        <router-link to="/registro" tag="span">registrate</router-link>
                      </v-btn>

                </v-toolbar-items>
         </template>
         <!-- NAV PARA USUARIO NO LOGUEADO -->

         <!-- NAV PARA USUARIO LOGUEADO -->
         <template v-else>
             <v-app-bar-nav-icon ></v-app-bar-nav-icon>
              <v-toolbar-title>
                  <router-link to="/home" tag="span" style="cursor:pointer">vuetify</router-link>
              </v-toolbar-title>

                <v-spacer></v-spacer>

               <v-toolbar-items>

                      <v-btn color="primary" text small>
                        <router-link to=""tag="span">{{ currentUser.name }}</router-link>
                      </v-btn>

                      <v-btn color="primary" text small>
                        <span @click="cerrar_session"> logout </span>
                      </v-btn>

                </v-toolbar-items>
         </template>
         <!-- NAV PARA USUARIO LOGUEADO -->
  		</v-app-bar>
</template>
<script>
	import {mapState, mapMutations} from 'vuex'
	export default{

		name:'Navbar',

		data: () => ({
       activeBtn: 1,
		}),

		computed:{
      ...mapState('auth',['currentUser'])
		},
    methods:{

      cerrar_session(){
        this.$store.commit('auth/logout')
        this.$router.push('/login')
      }
    },
	}
</script>