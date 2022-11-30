import React from "react";
import './Descricao.css'
import Main from '../templates/Main'


const Descricao = () => {
    const title = "Descrição"
    const desc = () => {
        return (
            <div className="">
                <h1 className="t-descricao">OrdemRpg</h1>
                <p className="text-descricao">
                    Bem vindo(a) ao OrdemRpg! O site de criação e organização de personagens para mesas de Rpg (roleplaying game).
                    Rpg é um jogo para jogar entre amigos, desenvolvendo a criatividade e embarcando em mistérios e aventuras.
                </p>
                <p className="text-descricao">
                    Para aproveitar nosso sistema, temos dois sistemas de login, um para o mestre e outro para os jogadores.

                    Complete o <a href="/login">Login</a> para começar sua missão conosco.</p>
            </div>
        )
    }

    return (
        <>
            <Main title={title}>
                {desc()}
            </Main>
        </>
    )
}

export default Descricao