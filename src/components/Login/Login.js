import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import AuthService from '../../services/AuthService'
import Main from '../templates/Main'
import Logo from '../../assets/imagens/logo_rpg.png'
import Video from '../../assets/imagens/videoLogin.mp4'
import './Login.css'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(evento) {
        evento.preventDefault()
        if (!username || !password)
            setMessage('Preencha o username e a senha para continuar!')

        else {
            AuthService.login(username, password).then(
                () => {
                    console.log('localStorage: ' + localStorage.getItem('user'))
                    navigate('/')
                    window.location.reload()
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                    setMessage(resMessage)
                }
            )
        }
    }

    return (
        <div class="container_login" >
            <div class="screen">
                <div class="screen__content">
                    <h1 className="tituloAuth">Login</h1>
                    <form class="login" onSubmit={handleSubmit}>
                        <div class="login__field">
                            <i class="login__icon fas fa-user"></i>
                            <input
                                type="text"
                                class="login__input"
                                value={username}
                                placeholder="Digite o username"
                                onChange={({ target }) => {
                                    setUsername(target.value)
                                    setMessage('')
                                }}
                            />
                        </div>
                        <div class="login__field">
                            <i class="login__icon fas fa-lock"></i>
                            <input
                                type="password"
                                value={password}
                                placeholder="Digite a senha"
                                class="login__input"
                                onChange={({ target }) => {
                                    setPassword(target.value)
                                    setMessage('')
                                }}
                            />
                        </div>
                        <button class="button login__submit" type="submit">Login</button>
                        <h4 className="msgErro">{message}</h4>

                            </form>
                        </div>
                        <div class="screen__background">
                            <span class="screen__background__shape screen__background__shape4"></span>
                            <span class="screen__background__shape screen__background__shape3"></span>
                            <span class="screen__background__shape screen__background__shape2"></span>
                            <span class="screen__background__shape screen__background__shape1"></span>
                        </div>
                </div>
            </div >
            )
}

