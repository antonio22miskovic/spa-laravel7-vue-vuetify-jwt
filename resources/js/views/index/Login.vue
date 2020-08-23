
<template>
  <v-app id="login" class="secondary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <div class="layout column align-center">
                <img src="/logos/logo.png" alt="Vue Material Admin" width="180" height="180">
                <h1 class="primary--text text-center">{{title}}</h1>
              </div>
              <v-container max-width="100" max-height="100">
                <transition name="fade" mode="out-in">
                  <router-view/>
                </transition>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar
        v-model="ErrorModal"
        :timeout="2000"
        top>
        {{ result }}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
export default {

  name:'Login',

  data: () => ({
    transitionName:'slide-left'
  }) ,

  methods: {

  },
  computed:{

    title(){
      return this.$store.state.auth.title
    },

    ErrorModal:{
      set(value){
          return this.$store.commit('auth/MostrarError',value)
      },
      get(){
          return this.$store.state.auth.showResult
      }
    },

    result(){
      return this.$store.state.auth.auth_error
    }

  },

}
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }

  .fade-enter {
      opacity: 0;
  }

.fade-enter-active {
    transition: opacity 0.50s ease;
}

.fade-leave {

}

.fade-leave-active {
    transition: opacity 0.50s ease;
    opacity: 0;
}
</style>
