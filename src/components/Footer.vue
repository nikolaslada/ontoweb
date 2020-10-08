<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row text-left">
        <div class="col-sm-2">
          <router-link to="/" class="btn btn-link" role="button">
            {{ NAMES.HOME }}
          </router-link>
        </div>
      </div>
      <div class="row text-left">
        <div class="col-sm-2">
          <router-link to="/my-ontologies" class="btn btn-link" role="button">
            {{ NAMES.MY_ONTOLOGIES }}
          </router-link>
        </div>
      </div>
      <div class="row text-left">
        <div class="col-sm-2">
          <router-link to="/" class="btn btn-link" role="button">
            {{ NAMES.CLASSES }}
          </router-link>
        </div>
      </div>
      <div class="row text-left">
        <div class="col-sm-2">
          <router-link to="/" class="btn btn-link" role="button">
            {{ NAMES.OBJECT_PROPERTIES }}
          </router-link>
        </div>
      </div>
      <div class="row text-left">
        <div class="col-sm-2">
          <router-link to="/" class="btn btn-link" role="button">
            {{ NAMES.INDIVIDUALS }}
          </router-link>
        </div>
      </div>
      <div class="row text-left">
        <div class="col-sm-2">
          <router-link to="/" class="btn btn-link" role="button">
            {{ NAMES.ABOUT }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  NAMES,
} from '../conf/constants';

export default {
  name: 'Footer',
  data() {
    return {
      NAMES,
    };
  },
};
</script>
