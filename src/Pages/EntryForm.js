import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

import { AuthContext } from '../contexts/AuthContext.js';
import { RefreshContext } from '../contexts/RefreshContext.js';
import { postTransaction } from '../services/axiosServices.js';

export default function EntryForm() {

    const { type } = useParams();
    const { usertoken } = useContext(AuthContext);
    const { refresh, setRefresh } = useContext(RefreshContext);

    const [entryform, setEntryform] = useState({title:'', value:''});
    const [waiting, setWaiting] = useState(false);
    
    const navigate = useNavigate();

    if(!usertoken) {
        alert('Você não possui autorização!');
        navigate('/');
    }

    function handleForm(event) {
        event.preventDefault();
        setWaiting(true);
        postTransaction(usertoken, {...entryform, type })
        .then((res) => {
            setRefresh(!refresh);
            navigate('/wallet');
        })
        .catch((error)=>{
            setWaiting(false);
            alert(`Falha na criação! ${error.response.data}`);
            setEntryform({title:'', value:''});
        });
    }


    if(!waiting) {
        return (
            <EntryFormContainer onSubmit={handleForm}>
                <h2>Nova {(type==='+')?'entrada':'saída'}</h2>
                <input onChange={(event)=>setEntryform({...entryform, title: event.target.value})} value={entryform.title} placeholder='Título' type='text' required/>
                <input onChange={(event)=>setEntryform({...entryform, value: event.target.value})} value={entryform.value} placeholder='Valor' type='number' step='0.01' min='0.01' required/>
                <button>Salvar {(type==='+')?'entrada':'saída'}</button>
            </EntryFormContainer>
        );
    } else {
        return (
            <EntryFormContainer onSubmit={handleForm}>
                <h2>Nova {(type==='+')?'entrada':'saída'}</h2>
                <input onChange={(event)=>setEntryform({...entryform, title: event.target.value})} value={entryform.title} placeholder='Título' type='text' disabled required/>
                <input onChange={(event)=>setEntryform({...entryform, value: event.target.value})} value={entryform.value} placeholder='Valor' type='number' step='0.01' min='0.01' disabled required/>
                <button><ThreeDots
                        height = '20'
                        width = '50'
                        radius = '9'
                        color = '#FFFFFF'
                        ariaLabel = 'three-dots-loading'     
                        wrapperStyle
                        wrapperClass
                    /></button>
            </EntryFormContainer>
        );
    }
}

const EntryFormContainer = styled.form`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    h2 {
        font-family: 'Raleway', sans-serif;
        width: 100vw;
        height: 12vh;
        display: flex;
        align-items: center;
        padding: 0px 24px 0px 24px;
        font-size: 26px;
        font-weight: 700;
        color: #FFFFFF;
    }
    input {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 303px;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 11px;
        font-size: 20px;
        ${props => props.waiting ? 'background-color: #F2F2F2;' : 'background-color: #FFFFFF;'}
        color: #BCBCBC;
        margin-bottom: 6px;
        :focus {outline: 3px solid #A328D6}
        ::placeholder {color: #DBDBDB}
    }
    button {
        width: 303px;
        height: 45px;
        background-color: #A328D6;
        ${props => props.waiting ? 'opacity: 70%;' : 'opacity: 100%;'}
        border: 1px solid #A328D6;
        border-radius: 5px;
        font-size: 21px;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;