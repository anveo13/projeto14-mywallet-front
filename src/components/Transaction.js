import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';
import { RefreshContext } from '../contexts/RefreshContext.js';
import { deleteTransaction } from '../services/axiosServices.js';
import TransactionContainer from '../styles/TransictionContainer.js';

export default function Transaction({id, title, value, type, date}) {

    const { usertoken } = useContext(AuthContext);
    const { refresh, setRefresh } = useContext(RefreshContext);

    function handleDelete() {
        if(window.confirm('Deseja exluir essa transação?')) {
            deleteTransaction(usertoken, id)
            .then((res) => {
                setRefresh(!refresh);
                alert(res.data);
            })
            .catch((res) => {
                console.log(res.data);
            });
        }
    }

    
    return (
        <TransactionContainer type={type}>
            <span>{date.split('/').slice(0,-1).join('/')}</span>
            <span>{title}</span>
            <span>{value.toFixed(2)}</span>
            <ion-icon name="close-circle-outline" onClick={handleDelete}></ion-icon>
        </TransactionContainer>
    );
}

