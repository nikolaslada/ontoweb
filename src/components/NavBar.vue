<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <a class="navbar-brand" href="#">{{ BRAND_NAVBAR }}</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link to="/" tag="li" class="nav-item" active-class="active" exact>
          <a class="nav-link" href="#">{{ NAMES.HOME }}</a>
        </router-link>
        <router-link to="/my-ontologies" tag="li" class="nav-item" active-class="active">
          <a class="nav-link" href="#">{{ NAMES.MY_ONTOLOGIES }}</a>
        </router-link>
        <router-link to="/classes" tag="li" class="nav-item" active-class="active">
          <a class="nav-link" href="#">{{ NAMES.CLASSES }}</a>
        </router-link>
        <router-link to="/about" tag="li" class="nav-item" active-class="active">
          <a class="nav-link" href="#">{{ NAMES.ABOUT }}</a>
        </router-link>
        <li v-if="activeOntology && activeOntology.name" class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
            Choosed Ontology: {{ activeOntology.name }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {
  BRAND_NAVBAR,
  NAMES,
} from '../conf/constants';

export default {
  name: 'NavBar',
  data() {
    return {
      BRAND_NAVBAR,
      NAMES,
      activeOntology: {
        name: 'Test Ontology',
      },
    };
  },
};
</script>
