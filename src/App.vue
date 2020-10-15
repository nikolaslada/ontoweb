<template>
  <div id="app">
    <nav-bar/>
    <Loader v-if="isLoading" />
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from './components/NavBar.vue';
import Loader from './components/Loader.vue';
import Footer from './components/Footer.vue';

import {
  IS_REQUEST_LOADING,
} from './stores/MainStore/constants';

export default {
  name: 'App',
  components: {
    NavBar,
    Loader,
    Footer,
  },
  computed: {
    ...mapGetters('MainStore', {
      isLoading: IS_REQUEST_LOADING,
    }),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.code {
  text-align: left;
  font-weight: bold;
}

.construct {
  font-weight: bold;
}

.operator {
  color: darkcyan;
}

.not:before {
  font-size: 125%;
  content: '¬';
}

.className {
  color: black;
}

.circle:before {
  color: gold;
  font-size: 150%;
  content: ' \25CF';
}

.propertyName {
  color: darkolivegreen;
}

.propertyRestriction {
  color: firebrick;
}

.propertyValue {
  color: black;
}

[data-move='1'] {
  padding-left: 2em;
}

[data-move='2'] {
  padding-left: 4em;
}

[data-move='3'] {
  padding-left: 6em;
}

[data-move='4'] {
  padding-left: 8em;
}

[data-move='5'] {
  padding-left: 10em;
}
</style>
