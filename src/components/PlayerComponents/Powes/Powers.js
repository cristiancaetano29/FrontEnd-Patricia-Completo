import React, { useState, useEffect } from "react";
import UserService from "../../../services/UserService";
import './Powers.css'
import Main from '../../templates/Main'

const Powers = () => {
    //http://localhost:3000
    const title = "Poderes"
    const initialStates = {
        poderes: { id: 0, nome: '', tipo: '', descricao: '' },
        list: [],
        mens: []
    }

    const [poderes, setPoderes] = useState(initialStates.poderes)
    const [list, setList] = useState(initialStates.list)
    const [mens, setMens] = useState(initialStates.mens)

    useEffect(() => {
        UserService.getPoderes().then(
            (response) => {
                console.log('useEffect getPowers', response.data)
                setList(response.data)
                setMens(null)
            },
            (error) => {
                const _mens = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                setMens(_mens)
                console.error('_mens', _mens)
            }
        )
    }, [poderes])

    const CardPowers = () => {
        return (
            <div class="container">
                {list.map((poderes) => (
                    <div class="card" key={poderes.id}>
                        <div class="content">
                            <h2>Nome: {poderes.nome}</h2>
                            <span>Tipo: {poderes.tipo}</span>
                            <p>Descrição: {poderes.descricao}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Main title={title}>
            {
                (mens != null) ? 'Problemas com a conexão ou autorização, Caso o problema persista, contate o administrador' :
                    <>
                        {CardPowers()}
                    </>
            }
        </Main>
    )
}

export default Powers