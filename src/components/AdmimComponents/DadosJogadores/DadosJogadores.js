import React, { useState, useEffect } from "react";
import UserService from "../../../services/UserService";
import './DadosJogadores.css'
import Main from '../../templates/Main'

const DadosJogadores = () => {
    const title = "DadosJogadores"
    const API_URL = 'http://localhost:5188/api/Dadosjogadores'
    const initialStates = {
        dadosJogadores: { id: 0, namePlayer: '', namePersonagem: '', agilidade: 0, vigor: 0, presenca: 0, forca: 0, origem: '', classe: '' },
        list: [],
        mens: []
    }

    const [dadosJogadores, setDadosJogadores] = useState(initialStates.dadosJogadores)
    const [list, setList] = useState(initialStates.list)
    const [mens, setMens] = useState(initialStates.mens)

    useEffect(() => {
        UserService.getDadosDosJogadores().then(
            (response) => {
                console.log('useEffect getDadosJogadores', response.data)
                setList(response.data)
                setMens(null)
            },
            (error) => {
                const _mens = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                setMens(_mens)
                console.error('_mens', _mens)
            }
        )
    }, [dadosJogadores])

    const limparCampos = () => setDadosJogadores(initialStates.dadosJogadores)

    const saveNewDadosJogadores = () => {
        const method = dadosJogadores.id ? 'put' : 'post'
        const url = dadosJogadores.id ? `${API_URL}/${dadosJogadores.id}` : API_URL

        dadosJogadores.id = Number(dadosJogadores.id)

        UserService.salvarDadosJogadores(method, url, dadosJogadores)
            .then((resp) => {
                const newList = getListaAtualizda(resp.data)
                setDadosJogadores(initialStates.dadosJogadores)
                setList(newList)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const getListaAtualizda = (dadosJogadores, add = true) => {
        const listUpdate = list.filter((u) => u.id !== dadosJogadores.id)
        if (add) listUpdate.unshift(dadosJogadores)
        return listUpdate
    }

    const atualizaCampo = (event) => {
        const { name, value } = event.target
        setDadosJogadores({ ...dadosJogadores, [name]: value })
    }

    const atualizaJogador = (dadosJogadores) => setDadosJogadores(dadosJogadores)

    const deletarJogador = (jogador) => {
        if (!window.confirm(`Deseja realmente deletar o jogador ${jogador.namePersonagem}?`))
            return

        UserService.deletarDadosJogadores(jogador.id)
            .then((_resp) => {
                const listUpd = getListaAtualizda(jogador, false)
                setDadosJogadores(initialStates.dadosJogadores)
                setList(listUpd)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const cardJogadores = () => {
        return (
            <>
                <section class="section-plans" id="section-plans">
                    <div class="u-center-text u-margin-bottom-big">
                        <h2 class="heading-secondary">
                            Players
                        </h2>
                    </div>

                    <div class="row">
                        {list.map((jogador) => (
                        <div class="col-1-of-3">
                            <div class="cardd">
                                <div class="card__side card__side--front-1">
                                    <div class="card__title card__title--1">
                                        <i class="fas fa-paper-plane"></i>
                                        <h4 class="card__heading">{jogador.namePlayer}</h4>
                                    </div>

                                    <div class="card__details" key={jogador.id}>
                                        <ul>
                                            <li>Personagem: {jogador.namePersonagem}</li>
                                            <li>Agilidade: {jogador.agilidade}</li>
                                            <li>Vigor: {jogador.vigor}</li>
                                            <li>presença: {jogador.presenca}</li>
                                            <li>força: {jogador.forca}</li>
                                            <li>origem: {jogador.origem}</li>
                                            <li>classe: {jogador.classe}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </section>
            </>
        )
    }

    return (
        <Main title={title}>
            {
                (mens != null) ? 'Problemas com a conexão ou autorização, Caso o problema persista, contate o administrador' :
                    <>
                        {cardJogadores()}
                    </>
            }
        </Main>
    )
}

export default DadosJogadores