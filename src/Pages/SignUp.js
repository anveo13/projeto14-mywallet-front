import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import { signUp } from '../services/axiosServices.js';

import UserForm from '../components/UserFormStyle';

export default function SignIn() {
    
    const [signupform, setSignupform] = useState({name:'', email:'', password1:'', password2:''});
    const [waiting, setWaiting] = useState(false);
    
    const navigate = useNavigate();

    function handleForm(event) {
        event.preventDefault();
        setWaiting(true);
        if(signupform.password1 === signupform.password2) {
            const name = signupform.name;
            const email = signupform.email;
            const password = signupform.password1;
            signUp({name, email, password}).then((res) => {
                navigate('/');
            })
            .catch((error)=>{
                setWaiting(false);
                alert(`Falha no Login! ${error.response.data}`);
                setSignupform({name:'', email:'', password1:'', password2:''});
            });
        } else {
            setWaiting(false);
            alert(`Senhas não equivalentes!`);
        }
    }

    
    if (!waiting) {
        return (
            <UserForm waiting={waiting}>
                <form onSubmit={handleForm}>
                    <input onChange={(event)=>setSignupform({...signupform, name: event.target.value})} value={signupform.name} placeholder='Nome' type='text' required/>
                    <input onChange={(event)=>setSignupform({...signupform, email: event.target.value})} value={signupform.email} placeholder='E-mail' type='email' required/>
                    <input onChange={(event)=>setSignupform({...signupform, password1: event.target.value})} value={signupform.password1} placeholder='Senha' type='password' required/>
                    <input onChange={(event)=>setSignupform({...signupform, password2: event.target.value})} value={signupform.password2} placeholder='Confirme sua senha' type='password' required/>
                    <button>Cadastrar</button>
                </form>
                <h3 onClick={()=>navigate('/')}>Já tem uma conta? Entre agora!</h3>
            </UserForm>
        );
    } else {
        return (
            <UserForm waiting={waiting}>
                <form onSubmit={(event)=>event.preventDefault()}>
                    <input value={signupform.name} placeholder='Nome' type='text' disabled required/>
                    <input value={signupform.email} placeholder='E-mail' type='email' disabled required/>
                    <input value={signupform.password1} placeholder='Senha' type='password' disabled required/>
                    <input value={signupform.password2} placeholder='Confirme sua senha' type='password' disabled required/>
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
                <h3>Já tem uma conta? Entre agora!</h3>
            </UserForm>
        );
    }
}