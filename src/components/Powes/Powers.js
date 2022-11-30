import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import './Powers.css'
import Main from '../templates/Main'

const Powers = () => {
    //http://localhost:3000
    const title = "Poderes"
    const API_URL = 'http://localhost:5188/api/poderes'
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

    const limparCampos = () => setPoderes(initialStates.poderes)

    const saveNewPower = () => {
        const method = poderes.id ? 'put' : 'post'
        const url = poderes.id ? `${API_URL}/${poderes.id}` : API_URL

        poderes.id = Number(poderes.id)

        UserService.salvarPoderes(method, url, poderes)
            .then((resp) => {
                const newList = getListaAtualizda(resp.data)
                setPoderes(initialStates.poderes)
                setList(newList)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const getListaAtualizda = (poderes, add = true) => {
        const listUpdate = list.filter((u) => u.id !== poderes.id)
        if (add) listUpdate.unshift(poderes)
        return listUpdate
    }

    const atualizaCampo = (event) => {
        const { name, value } = event.target

        setPoderes({
            ...poderes,
            [name]: value,
        })
    }

    const atualizaPoder = (poder) => setPoderes(poder)

    const deletarPoder = (poder) => {
        if (!window.confirm(`Deseja realmente deletar o poder ${poder.nome}?`)) 
            return

        UserService.deletarPoderes(poder.id)
            .then((_resp) => {
                const listUpd = getListaAtualizda(poder, false)
                setPoderes(initialStates.poderes)
                setList(listUpd)
            })
            .catch((err) => {
                console.error(err)
            })
        
    }

    const renderForm = () => {
        return (
            <div className="inclui-container">
                <label> Poder: </label>
                <input
                    type="text"
                    id="codCurso"
                    placeholder="Nome do Poder"
                    className="form-input small"
                    name="nome"
                    value={poderes.nome}
                    onChange={(e) => atualizaCampo(e)}
                />
                <label> Tipo: </label>
                <input
                    type="text"
                    id="nomeCurso"
                    placeholder="Tipo do Poder"
                    className="form-input"
                    name="tipo"
                    value={poderes.tipo}
                    onChange={(e) => atualizaCampo(e)}
                />
                <label> Descrição: </label>
                {/*<input
                    type="text"
                    id="periodo"
                    placeholder="Descrição do Poder"
                    className="form-input small"
                    name="descricao"
                    value={poderes.descricao}
                    onChange={(e) => atualizaCampo(e)}
                />*/}

                <textarea
                    id="periodo"
                    name="descricao"
                    cols={20}
                    rows={5}
                    value={poderes.descricao}
                    className="area"
                    placeholder="Descrição do Poder"
                    onChange={(e) => atualizaCampo(e)}
                >
                
                </textarea>
                
                <br />
                <button
                    className="btn btnSalvar"
                    onClick={(e) => saveNewPower(e)}
                >
                    Salvar
                </button>
                <button
                    className="btn btnCancelar"
                    onClick={(e) => limparCampos(e)}
                >
                    Cancelar
                </button>
            </div>
        )
    }


    const CardPowers = () => {
        return (
            <div class="container">
                {list.map((poderes) => (
                    <div class="card" key={poderes.id}>
                        <div class="content">
                            <h2>Nome: {poderes.nome}</h2>
                            <span>Tipo: {poderes.tipo}</span>
                            <p>Descrição: {poderes.descricao}</p>

                            <button className="btn btn-edit" onClick={() => atualizaPoder(poderes)}>
                                Editar
                            </button>

                            <button className="btn btb-danger" onClick={() => deletarPoder(poderes)}>
                                Deletar
                            </button>
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
                        {renderForm()}
                        {CardPowers()}
                    </>
            }
        </Main>
    )
}

export default Powers