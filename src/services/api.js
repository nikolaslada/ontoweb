import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

import {
  REQUEST_START,
  REQUEST_END,
  GET_LANGUAGE_ISO,
  GET_LOCALE_ISO,
} from '../stores/MainStore/constants';

import {
  USE_PROMISE_REJECT,
} from '../conf/constants';

import {
  URL,
  TIMEOUT,
} from '../conf/api';

const vueInstance = new Vue();

const api = axios.create({
  baseURL: URL.API_ONTOWEB_BO,
  timeout: TIMEOUT.API_ONTOWEB_BO,
  paramsSerializer: (params) => (
    qs.stringify(
      params,
      {
        arrayFormat: 'repeat',
        skipNulls: true,
      },
    )
  ),
});

api.interceptors.request.use((config) => {
  vueInstance.$noCycleStore.commit(`MainStore/${REQUEST_START}`);

  const languageIso = vueInstance.$noCycleStore.getters[`MainStore/${GET_LANGUAGE_ISO}`];
  const localeIso = vueInstance.$noCycleStore.getters[`MainStore/${GET_LOCALE_ISO}`];
  const adjustedConfig = {
    ...config,
    headers: {
      ...(config.headers || {}),
      common: {
        'language-iso': languageIso,
        'locale-iso': localeIso,
        'Content-Type': 'application/json',
        // apiaryApiKey: '',
      },
    },
  };

  // content-type header for GET and DELETE method workaround https://github.com/axios/axios/issues/86
  if (['get', 'delete'].includes(config.method)) {
    adjustedConfig.data = null;
  }

  return adjustedConfig;
});

api.interceptors.response.use((response) => {
  vueInstance.$noCycleStore.commit(`MainStore/${REQUEST_END}`);

  return response;
}, (error) => {
  vueInstance.$noCycleStore.commit(`MainStore/${REQUEST_END}`);

  if (error?.config?.[USE_PROMISE_REJECT]) {
    return Promise.reject(error);
  }

  return error;
});

export default api;
