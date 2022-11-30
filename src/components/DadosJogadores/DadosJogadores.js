import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import './DadosJogadores.css'
import Main from '../templates/Main'

const DadosJogadores = () => {
    const title = "DadosJogadores"
    const API_URL = 'http://localhost:5188/api/Dadosjogadores'
    const initialStates = {
        dadosJogadores: {id: 0, namePlayer: '', namePersonagem: '', agilidade: 0, vigor: 0, presenca: 0, forca: 0, origem: '', classe: ''},
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
        if(!window.confirm(`Deseja realmente deletar o jogador ${jogador.namePersonagem}?`)) 
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
            <div className="">
                <div className="">
                    <h5 className="">Dados dos Jogadores</h5>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            <div className="">
                                <label>Nome do Jogador</label>
                                <input type="text" className="" id="" name="namePlayer" value={dadosJogadores.namePlayer} onChange={atualizaCampo} placeholder="Nome do Jogador" />
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <label>Nome do Personagem</label>
                                <input type="text" className="" id="" name="namePersonagem" value={dadosJogadores.namePersonagem} onChange={atualizaCampo} placeholder="Nome do Personagem" />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                                <label>Agilidade</label>
                                <input type="number" className="" id="" name="agilidade" value={dadosJogadores.agilidade} onChange={atualizaCampo} placeholder="Agilidade" />
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <label>Vigor</label>
                                <input type="number" className="" id="" name="vigor" value={dadosJogadores.vigor} onChange={atualizaCampo} placeholder="Vigor" />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                                <label>Presença</label>
                                <input type="number" className="" id="" name="presenca" value={dadosJogadores.presenca} onChange={atualizaCampo} placeholder="Presença" />
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <label>Inteligência</label>
                                <input type="number" className="" id="" name="inteligencia" value={dadosJogadores.inteligencia} onChange={atualizaCampo} placeholder="Inteligência" />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                                <label>Força</label>
                                <input type="number" className="" id="" name="forca" value={dadosJogadores.forca} onChange={atualizaCampo} placeholder="Força" />
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <label>Carisma</label>
                                <input type="number" className="" id="" name="carisma" value={dadosJogadores.carisma} onChange={atualizaCampo} placeholder="Carisma" />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <button className="" onClick={(e) => saveNewDadosJogadores(e)}>Salvar</button>
                            <button className="" onClick={(e) => limparCampos(e)}>Limpar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
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