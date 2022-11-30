import './Logo.css';
import logo from '../../assets/imagens/logo_rpg.png';
import React from 'react';

export default function Logo(props) {
    return (
        <aside className="logo">
            <a href="/" className="logo">
            <img src={ logo } alt="Logo" />
            </a>
        </aside>
    )
}