import styled from 'styled-components';

export default function UserForm ({children, waiting}) {


    return (
        <UserFormContainer waiting={waiting}>
            <h1>MyWallet</h1>
            {children}
        </UserFormContainer>
    );
}

const UserFormContainer = styled.main`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        color: #FFFFFF;
    }
    form {
        margin-top: 33px;
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
    }
    h3 {
        margin-top: 25px;
        font-size: 18px;
        color: #FFFFFF;
        text-decoration: none;
    }
`;