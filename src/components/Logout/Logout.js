import React, { useEffect } from "react";
import AuthService from "../../services/AuthService";
import { useNavigate } from 'react-router'
import Main from '../templates/Main'

export default function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        AuthService.logout()
        navigate('/')
        window.location.reload()
    }, [])

    return (
        <Main title="Logout">
            <div>Logout efetuado com sucesso!</div>
        </Main>
    )
}
