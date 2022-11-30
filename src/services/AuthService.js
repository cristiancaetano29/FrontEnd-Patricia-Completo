import axios from "axios";

//Realizar a troca da rota e verificar o campo User
const API_URL = 'http://localhost:5188/api/Login/login'

const login = async (username, senha) => {
    const response = await axios
        .post(API_URL, {
            username,
            senha,
        })
        .then((response) => {
    if (response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
    })
}

const logout = () => {
    localStorage.removeItem('user')
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const AuthService = {
    login,
    logout,
    getCurrentUser,
}

export default AuthService