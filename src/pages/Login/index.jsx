import { Link, useNavigate } from "react-router-dom"
import Input from "../../components/Input/input"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { api } from "../../services/api"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod"
import { LoginFormValidation } from "../../components/LoginFormValidation/LoginFormValidation"

function Login() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState([])

    const { register, handleSubmit, reset, formState: {errors} } = useForm({
        resolver: zodResolver(LoginFormValidation),
    })

    const navigate = useNavigate()

    function notifySucess() {
        toast.success('Login efetuado com Sucesso!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    function notifyError() {
        toast.error('Dados inválidos!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const login = (data) => {
        
        api.post('/sessions', data)
        .then(function (response){
            setUser(response.data.user)
            localStorage.setItem("@TOKEN", response.data.token)
            localStorage.setItem("@USERID", response.data.user.id)
            notifySucess()
            
            setTimeout(() => {
                navigate('/home')
            }, 3000)
            
            console.log(user)
        })

        .catch(function (error) {
            console.log(error)
            notifyError()
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 700)
    }, [])

    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return(
        <div>
            {
                loading ? (<h1>Carregando...</h1>) : 
            (
                <div>
                    <h2>Login</h2>
                    <ToastContainer />
                    <form onSubmit={handleSubmit(login)}>
                        <Input
                            label="Email"
                            type="email"
                            error={errors.email?.message}
                            {...register("email")}
                        />
                        <div>
                            <Input
                                label="Senha"
                                type={showPassword ? "text" : "password"}
                                error={errors.password?.message}
                                {...register("password")}
                            />
                            <button type="button" onClick={toggleShowPassword}>{showPassword ? "Ocultar senha" : "Mostrar senha"}</button>
                        </div>
                        
                        <button type="submit">Entrar</button>
                        <p>Ainda não possui uma conta?</p>
                        <Link to="/register">Cadastre-se</Link>
                    </form>
                </div>
            )
            }
        </div>
    )
}

export default Login