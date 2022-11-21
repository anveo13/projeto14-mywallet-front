import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function EntryButton({ type }) {

    const navigate = useNavigate();

    function entryTransaction() {
        navigate(`/entry/${type}`);
    }

    
    if(type==='+') {
        return (
            <ButtonContainer type={type} onClick={entryTransaction}>
                <ion-icon name="add-circle-outline"></ion-icon>
                <p>Nova Entrada</p>
            </ButtonContainer>
        );
    } else if(type==='-') {
        return (
            <ButtonContainer type={type} onClick={entryTransaction}>
                <ion-icon name="remove-circle-outline"></ion-icon>              
                <p>Nova Saída</p>
            </ButtonContainer>
        );
    }
}

const ButtonContainer = styled.button`
    width: 42vw;
    height: 17vh;
    position: absolute;
    bottom: 15px;
    right: 0px;
    background-color: #A328D6;
    border: 1px solid #A328D6;
    border-radius: 5px;
    color: #FFFFFF;
    ${(props) => (props.type==='-')?'right: Calc(13vw / 2);':'left: Calc(13vw / 2);'}
    ion-icon {
        position: absolute;
        top: 11px;
        left: 12px;
        font-size: 22px;
    }
    p {
        position: absolute;
        bottom: 10px;
        left: 10px;
        font-size: 17px;
        font-weight: 700;
    }
`;