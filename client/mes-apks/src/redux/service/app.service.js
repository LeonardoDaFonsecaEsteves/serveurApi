import axios from 'axios';

const baseUrl = `http://dafonseca.freeboxos.fr:8081`

/**
 * Récupere les apks
 */
const fetchApks = async () => await api.get(`${baseUrl}/api/MesApks`).then(({ data }) => data);

/**
 * Connexion
 * @param {*} id
 */
const loginUser = (values) => axios.post(`${baseUrl}/api/connexion`, { ...values }).then(({ data }) => data);

export const AppService = {
    fetchApks,
    loginUser
};
