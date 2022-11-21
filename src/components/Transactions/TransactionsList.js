import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../../contexts/AuthContext.js';
import { RefreshContext } from '../../contexts/RefreshContext.js';
import { getTransactions } from '../../services/axiosServices.js';

import Transaction from '../Transactions/Transaction.js';

export default function TransactionsList() {
    
    const { usertoken } = useContext(AuthContext);
    const { refresh } = useContext(RefreshContext);
        
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getTransactions(usertoken).then((res) => {
            setTransactions(res.data);
        })
        .catch((res) => {
            console.log(res.data);
        });
    },[usertoken, refresh]);


    return (
        <ListContainer>
            {transactions.reverse().map(({_id, title, value, type, date}, index) =>
                <Transaction key={index} id={_id} title={title} value={value} type={type} date={date} />
            )}
        </ListContainer>
    );
}

const ListContainer = styled.ul`
    width: 100%;
    height: calc(100% - 40px);
    padding: 12px 12px 5px 12px;
    overflow-y: scroll;
`;