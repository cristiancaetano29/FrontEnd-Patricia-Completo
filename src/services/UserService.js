import axios from "axios";
import AuthService from "./AuthService";

//trocar a URL
const API_URL = 'http://localhost:5188/api/'

const headerAuthorization = () => {
    return {
        headers: {
            Authorization: 'Bearer ' + AuthService.getCurrentUser().token
        }
    }
}

const getDadosDosJogadores = async () => {
    return await axios.get(API_URL + 'DadosJogadores', headerAuthorization())
}

const salvarDadosJogadores = async (method, url, dadosJogadores) => {
    return await axios[method](url, dadosJogadores, headerAuthorization())
}

const deletarDadosJogadores = async (id) => {
    return await axios.delete(API_URL + 'DadosJogadores/' + id, headerAuthorization())
}

const getPoderes = async () => {
    return await axios.get(API_URL + 'poderes', headerAuthorization())
}

const salvarPoderes = async (method, url, poderes) => {
    return await axios[method](url, poderes, headerAuthorization())
}

const deletarPoderes = async (id) => {
    return await axios.delete(API_URL + 'poderes/' + id, headerAuthorization())
}

const UserService = {
    getDadosDosJogadores: getDadosDosJogadores,
    salvarDadosJogadores: salvarDadosJogadores,
    deletarDadosJogadores: deletarDadosJogadores,
    getPoderes: getPoderes,
    salvarPoderes: salvarPoderes,
    deletarPoderes: deletarPoderes,
}

export default UserService