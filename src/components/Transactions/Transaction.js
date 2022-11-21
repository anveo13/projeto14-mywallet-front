import { useContext } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../../contexts/AuthContext.js';
import { RefreshContext } from '../../contexts/RefreshContext.js';
import { deleteTransaction } from '../../services/axiosServices.js';

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

const TransactionContainer = styled.li`
    width: 100%;
    height: auto;
    min-height: 40px;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    padding: 5px 100px 5px 0px;
    position: relative;
    span:nth-of-type(1) {
        margin-right: 12px;
        color: #C6C6C6;
    }
    span:nth-of-type(2) {
        color: #000000;
        word-break: break-all;
    }
    span:nth-of-type(3) {
        position: absolute;
        right: 20px;
        color:${props => (props.type==='+')?'#03AC00':'#C70000'};
    }
    ion-icon {
        position: absolute;
        right: 0px;
        color: #C6C6C6;
    }
`;