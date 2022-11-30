import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './components/templates/Main'
import AuthService from './services/AuthService'
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout'
import PowersForPlayers from './components/PlayerComponents/Powes/Powers'
import PowersFromAdmim from './components/AdmimComponents/Powes/Powers'
import PlayersForPlayers from './components/PlayerComponents/DadosJogadores/DadosJogadores'
import PlayersFromAdmim from './components/AdmimComponents/DadosJogadores/DadosJogadores'
import AddNewPlayer from './components/AdmimComponents/AddNewPlayer/AddNewPlayer'
import Descricao from './components/Descricao/Descricao'


export default function Rotas() {

    const [currentUser, setCurrentUser] = useState(undefined)
    const [isMaster, setIsMaster] = useState(false)
    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (user) {
            setCurrentUser(user)
            const userObject = user.user
            const roles = userObject.role
            if (roles === 'master') {
                setIsMaster(true)
            }
        }
    }, [isMaster])
    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main title="Bem Vindo!">
                        <div>OrdemRpg</div>
                    </Main>
                }
            />

            {currentUser && isMaster ? (
                <>
                    <Route exact path='/newPlayer'
                        element={
                            <AddNewPlayer />
                        }
                    />
                </>
            ) : (
                <>

                </>
            )}

            {currentUser && isMaster ? (
                <Route exact path='/poderes'
                    element={
                        <PowersFromAdmim />
                    }
                />
            ) : (
                <Route exact path='/poderes'
                    element={
                        <PowersForPlayers />
                    }
                />
            )}

            {currentUser && isMaster ? (
                <Route exact path='/dadosJogadores'
                    element={
                        <PlayersFromAdmim />
                    }
                />
            ) : (
                <Route exact path='/dadosJogadores'
                    element={
                        <PlayersForPlayers />
                    }
                />
            )}
            <Route exact path='/descricao'
                element={
                    <Descricao />
                }
            />  

            <Route path='/login'
                element={
                    <Login />
                }
            />
            <Route path='/logout' element={<Logout />} />
            <Route path="*" to='/' />
        </Routes>
    )
}