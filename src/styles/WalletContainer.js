import styled from 'styled-components';

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

export default WalletContainer;