import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AuthContext } from '../../contexts/AuthContext.js';
import { RefreshContext } from '../../contexts/RefreshContext.js';
import { getUserName, getUserBalance } from '../../services/axiosServices.js';

import TransactionsList from '../Transactions/TransactionsList.js';
import EntryButton from './EntryButton.js';

export default function Wallet() {

    const { usertoken } = useContext(AuthContext);
    const { refresh } = useContext(RefreshContext);

    const [username, setUsername] = useState('');
    const [userbalance, setUserbalance] = useState(0);

    const navigate = useNavigate();

    if(!usertoken) {
        alert('Você não possui autorização!');
        navigate('/');
    }

    useEffect(() => {
        getUserName(usertoken).then((res) => {
            setUsername(res.data);
        })
        .catch((res) => {
            console.log(res.data);
        });
    },[usertoken]);

    useEffect(() => {
        getUserBalance(usertoken).then((res) => {
            setUserbalance(res.data);
        })
        .catch((res) => {
            console.log(res.data);
        });
    },[usertoken, refresh]);

    function logOut() {
        navigate('/');
        //delete session
    }


    return (
        <WalletContainer userbalance={userbalance}>
            <header>
                <p>Olá, {username}</p>
                {/* Add logout functions */}
                <ion-icon name='log-out-outline' onClick={logOut}/>
            </header>
            <div>
                <TransactionsList />
                <h3><span>SALDO</span><strong>{userbalance.toFixed(2)}</strong></h3>
            </div>
            <footer>
                <EntryButton type='+'/>
                <EntryButton type='-'/>
            </footer>
        </WalletContainer>
    );
}

const WalletContainer = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
        width: 100vw;
        height: 12vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 24px 0px 24px;
        p {
            font-size: 26px;
            font-weight: 700;
            color: #FFFFFF;
        }
        ion-icon {
            font-size: 24px;
            color: #FFFFFF;
            margin-left: 20px;
            z-index: 1;
        }
    }
    footer {
        width: 100%;
        height: 21vh;
        position: relative;
    }
    div {
        background-color: #FFFFFF;
        width: 87vw;
        height: 67vh;
        position: relative;
        border: 1px solid #FFFFFF;
        border-radius: 5px;
    }
    h3 {
        width: 100%;
        height: 40px;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px 0px 15px;
        font-size: 17px;
        color: #000000;
        font-weight: 700;
        position: absolute;
        bottom: 0px;
        left: 0px;
        strong {
            font-weight: 400;
            color: ${props => Number(props.userbalance)>=0? '#03AC00' : '#C70000'}
        }
    }
`;