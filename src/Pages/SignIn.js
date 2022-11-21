import { useState, useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext.js';
import { signIn } from '../services/axiosServices.js';

import UserForm from '../components/UserFormStyle';

export default function SignIn() {

    const { setUsertoken } = useContext(AuthContext);

    const [signinform, setSigninform] = useState({email:'', password:''});
    const [waiting, setWaiting] = useState(false);

    const navigate = useNavigate();

    function handleForm(event) {
        event.preventDefault();
        setWaiting(true);
        signIn(signinform).then((res) => {
            setUsertoken(res.data);
            navigate('/wallet');
        })
        .catch((error)=>{
            setWaiting(false);
            alert(`Falha no Login! ${error.response.data}`);
            setSigninform({email:'', password:''});
        });
    }

    
    if (!waiting) {
        return (
            <UserForm waiting={waiting}>
                <form onSubmit={handleForm}>
                    <input onChange={(event)=>setSigninform({...signinform, email: event.target.value})} value={signinform.email} placeholder='E-mail' type='email' required/>
                    <input onChange={(event)=>setSigninform({...signinform, password: event.target.value})} value={signinform.password} placeholder='Senha' type='password' required/>
                    <button>Entrar</button>
                </form>
                <h3 onClick={()=>navigate('/signup')}>Primeira vez? Cadastre-se!</h3>
            </UserForm>
        );
    } else {
        return (
            <UserForm waiting={waiting}>
                <form onSubmit={(event)=>event.preventDefault()}>
                    <input value={signinform.email} placeholder='E-mail' type='email' disabled required/>
                    <input value={signinform.password} placeholder='Senha' type='password' disabled required/>
                    <button><ThreeDots
                        height = "20"
                        width = "50"
                        radius = "9"
                        color = '#FFFFFF'
                        ariaLabel = 'three-dots-loading'     
                        wrapperStyle
                        wrapperClass
                    /></button>
                </form>
                <h3>Não tem uma conta? Cadastre-se!</h3>
            </UserForm>
        );
    }
}