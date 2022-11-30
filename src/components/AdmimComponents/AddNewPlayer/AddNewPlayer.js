import React, { useState, useEffect } from "react";
import './AddNewPlayer.css'
import UserService from "../../../services/UserService";
import Main from '../../templates/Main'

const AddNewPlayer = () => {
    const title = "Adicionar novo jogador"
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
                alert('Dados do jogador salvo com sucesso!')
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

    const listDataFromApi = () => {
        return(
            <>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr className="lista-dados-jogadores">
                            <th>Nome do jogador</th>
                            <th>Nome do personagem</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((dadosJogadores) => {
                            return (
                                <tr key={dadosJogadores.id}>
                                    <td>{dadosJogadores.namePlayer}</td>
                                    <td>{dadosJogadores.namePersonagem}</td>
                                    <td>
                                        <button className="btn-update" onClick={() => atualizaJogador(dadosJogadores)}>
                                            Editar
                                        </button>
                                        <button className="btn-deletar" onClick={() => deletarJogador(dadosJogadores)}>
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    }

    const formsForPlayer = () => {
        return (
            <>
                <div class="form-style-3">
                    <form>
                        <fieldset>
                            <legend>Dados do Personagens</legend>
                            <label>
                                <span> Nome do Jogador
                                    <span className="required">
                                        *
                                    </span>
                                </span>
                                <input 
                                    type="text" 
                                    className="input-field" 
                                    name="namePlayer" 
                                    value={dadosJogadores.namePlayer} 
                                    onChange={atualizaCampo} 
                                    placeholder="Nome do Jogador"
                                    />
                            </label>

                            <label>
                                <span> Nome do Personagem
                                    <span className="required">
                                        *
                                    </span>
                                </span>
                                <input 
                                    type="text" 
                                    className="input-field" 
                                    name="namePersonagem"
                                    value={dadosJogadores.namePersonagem} 
                                    onChange={atualizaCampo} 
                                    placeholder="Nome do Personagem"
                                    />
                            </label>

                            <label>
                                <span> Agilidade
                                    <span className="required">
                                        *
                                    </span>
                                </span>
                                <input 
                                    type="number" 
                                    className="input-field" 
                                    name="agilidade" 
                                    value={dadosJogadores.agilidade} 
                                    onChange={atualizaCampo} 
                                    placeholder="Agilidade"
                                    />
                            </label>

                            <label>
                                <span> Vigor
                                    <span className="required">
                                        *
                                    </span>
                                </span>
                                <input 
                                    type="number" 
                                    className="input-field" 
                                    name="vigor"
                                    value={dadosJogadores.vigor} 
                                    onChange={atualizaCampo} 
                                    placeholder="Vigor"
                                    />
                            </label>

                            <label>
                                <span> Presença
                                    <span className="required">
                                        *
                                    </span>
                                </span>
                                <input 
                                    type="number" 
                                    className="input-field" 
                                    name="presenca"
                                    value={dadosJogadores.presenca} 
                                    onChange={atualizaCampo} 
                                    placeholder="Presença"
                                    />
                            </label>

                            <label>
                                <span> Inteligência
                                    <span className="required">
                                        *
                                    </span>
                                </span>
                                <input 
                                    type="number" 
                                    className="input-field" 
                                    name="inteligencia"
                                    value={dadosJogadores.inteligencia} 
                                    onChange={atualizaCampo} 
                                    placeholder="Inteligência"
                                    />
                            </label>

                            <label>
                                <span> Força
                                    <span className="required">
                                        *
                                    </span>
                                </span>
                                <input 
                                    type="number" 
                                    className="input-field" 
                                    name="forca"
                                    value={dadosJogadores.forca} 
                                    onChange={atualizaCampo} 
                                    placeholder="Força"
                                    />
                            </label>

                            <label>
                                <span> Origem
                                    <span className="required">
                                        *
                                    </span>
                                </span>
                                <input 
                                    type="text" 
                                    className="input-field" 
                                    name="origem"
                                    value={dadosJogadores.origem} 
                                    onChange={atualizaCampo} 
                                    placeholder="Origem"
                                    />
                            </label>

                            <label>
                                <span> Classe
                                    <span className="required">
                                        *
                                    </span>
                                </span>
                                <input 
                                    type="text" 
                                    className="input-field" 
                                    name="classe"
                                    value={dadosJogadores.classe} 
                                    onChange={atualizaCampo} 
                                    placeholder="Classe"
                                    />
                            </label>
                        </fieldset>
                        <label>
                            <button className="" onClick={(e) => saveNewDadosJogadores(e)}>Salvar</button>
                            <button className="" onClick={(e) => limparCampos(e)}>Limpar</button>
                        </label>
                    </form>
                </div>
            </>
        )
    }
    return (
        <>
            <Main title={title}>
                {formsForPlayer()}
                {listDataFromApi()}
            </Main>
        </>
    )
}

export default AddNewPlayer;