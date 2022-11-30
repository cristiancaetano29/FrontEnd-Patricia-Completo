import './Menu.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';

export default function Menu(props) {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [isMaster, setIsMaster] = useState(false)
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            const userObject = user.user
            const roles = userObject.role
            if (roles === 'master') {
                setIsMaster(true)
            }
        }
    }, [isMaster]);

    return (
        <nav className='menu'>
            <Link to="/descricao">
                Descrição
            </Link>
            
            {currentUser && isMaster ? (
                <>
                    <Link to="/dadosJogadores">
                        DadosJogadores
                    </Link>

                    <Link to="/poderes">
                        Poderes
                    </Link>
                    
                    <Link to="/newPlayer">
                        NovoPlayer
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/dadosJogadores">
                        DadosJogadores
                    </Link>
                    
                    <Link to="/poderes">
                        Poderes
                    </Link>
                </>
            )}

            {currentUser ? (
                <Link to="/logout">
                    Logout
                </Link>
            ) : (
                <Link to="/login">
                    Login
                </Link>
            )}
        </nav>
    )
}