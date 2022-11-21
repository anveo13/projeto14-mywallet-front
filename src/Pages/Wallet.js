import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js';
import { RefreshContext } from '../contexts/RefreshContext.js';
import { getUserName, getUserBalance } from '../services/axiosServices.js';
import TransactionsList from '../components/TransactionsList';
import EntryButton from '../components/EntryButton.js';
import WalletContainer from '../styles/WalletContainer.js';

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
};