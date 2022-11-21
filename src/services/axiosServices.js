import axios from 'axios';

const URL = 'http://localhost:5000';

function signIn(body) {
    const promise = axios.post(`${URL}/signin`, body);
    return promise;
}

function signUp(body) {
    const promise = axios.post(`${URL}/signup`, body);
    return promise;
}

function getUserName(token) {
    const promise = axios.get(`${URL}/name`, { headers: {'Authorization':`Bearer ${token}`} });
    return promise;
}

function getUserBalance(token) {
    const promise = axios.get(`${URL}/balance`, { headers: {'Authorization':`Bearer ${token}`} });
    return promise;
}

function getTransactions(token) {
    const promise = axios.get(`${URL}/transactions`, { headers: {'Authorization':`Bearer ${token}`} });
    return promise;
}

function postTransaction(token, body) {
    const promise = axios.post(`${URL}/transactions`, body, { headers: {'Authorization':`Bearer ${token}`} });
    return promise;
}

function deleteTransaction(token, id) {
    const promise = axios.delete(`${URL}/transactions/${id}`, { headers: {'Authorization':`Bearer ${token}`} });
    return promise;
}

export {
    signIn,
    signUp,
    getUserName,
    getUserBalance,
    getTransactions,
    postTransaction,
    deleteTransaction
};
