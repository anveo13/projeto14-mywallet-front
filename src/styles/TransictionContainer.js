import styled from 'styled-components';
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

export default TransactionContainer;