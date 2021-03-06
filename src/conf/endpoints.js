import api from '../services/api';
import { URL } from './api';

export const getMyOntologyList = (offset, limit) => (
  api.get(`${URL.API_ONTOWEB_BO}/my-ontologies`, {
    baseUrl: URL.API_ONTOWEB_BO,
    params: {
      offset,
      limit,
    },
  })
);

export const getOntology = (id) => (
  api.get(`${URL.API_ONTOWEB_BO}/ontology/${id}`, {
    baseUrl: URL.API_ONTOWEB_BO,
  })
);

export const getClassTree = (id) => (
  api.get(`${URL.API_ONTOWEB_BO}/class-tree/${id}`, {
    baseUrl: URL.API_ONTOWEB_BO,
  })
);

export const getClassNode = (id) => (
  api.get(`${URL.API_ONTOWEB_BO}/class-node/${id}`, {
    baseUrl: URL.API_ONTOWEB_BO,
  })
);

export const partialEditClassNode = (id, payload) => (
  api.patch(`${URL.API_ONTOWEB_BO}/class-node/${id}`, payload, {
    baseUrl: URL.API_ONTOWEB_BO,
  })
);

export const checkCondition = (id, payload) => (
  api.put(`${URL.API_ONTOWEB_BO}/check-condition/${id}`, payload, {
    baseUrl: URL.API_ONTOWEB_BO,
  })
);

export const deleteClassNode = (id) => (
  api.delete(`${URL.API_ONTOWEB_BO}/class-node/${id}`, {
    baseUrl: URL.API_ONTOWEB_BO,
  })
);

export const createClassNode = (payload) => (
  api.post(`${URL.API_ONTOWEB_BO}/class-node`, payload, {
    baseUrl: URL.API_ONTOWEB_BO,
  })
);

export const getPropertyTree = (id) => (
  api.get(`${URL.API_ONTOWEB_BO}/property-tree/${id}`, {
    baseUrl: URL.API_ONTOWEB_BO,
  })
);

export const getProperty = (id) => (
  api.get(`${URL.API_ONTOWEB_BO}/property/${id}`, {
    baseUrl: URL.API_ONTOWEB_BO,
  })
);

export const partialEditProperty = (id, payload) => (
  api.patch(`${URL.API_ONTOWEB_BO}/property/${id}`, payload, {
    baseUrl: URL.API_ONTOWEB_BO,
  })
);

export const deleteProperty = (id) => (
  api.delete(`${URL.API_ONTOWEB_BO}/property/${id}`, {
    baseUrl: URL.API_ONTOWEB_BO,
  })
);
