import { useForm } from "react-hook-form"
import Input from "../../components/Input/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterFormValidation } from "../../components/RegisterFormValidation/RegisterFormValidation"
import { api } from "../../services/api"
import { Link, useNavigate } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Register() {

    //{id, label, error, ...rest}, ref
    const { register, handleSubmit, reset, formState: {errors} } = useForm({
        resolver: zodResolver(RegisterFormValidation),
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

    const registerSubmit = (registerData) => {
        api.post('/users', registerData)
        .then((response) => {
            console.log(response)
            notifySucess()

            setTimeout(() => {
                navigate('/login')
            }, 3000)

            
        })
        .catch((error) => {
            console.log(error)
            notifyError()
        })
        // console.log(registerData)
    } 

    return(
        <div>
            <ToastContainer/>
            <div>
                <h2>Nando Hub</h2>
                <Link to='/login'>Voltar</Link>
            </div>
            <div>
                <h3>Crie sua conta</h3>
                <p>Rápido e grátis, vamos nessa</p>
            </div>
            <div>
                <form onSubmit={handleSubmit(registerSubmit)}>
                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Digite aqui seu nome"
                        {...register("name")}
                        error={errors.name?.message}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Digite aqui seu email"
                        {...register("email")}
                        error={errors.email?.message}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite aqui sua senha"
                        {...register("password")}
                        error={errors.password?.message}
                    />
                    <Input
                        label="Confirmar Senha"
                        type="password"
                        placeholder="Digite novamente sua senha"
                        {...register("confirmPassword")}
                        error={errors.confirmPassword?.message}
                    />
                    <Input
                        label="Bio"
                        type="text"
                        placeholder="Fale sobre você"
                        {...register("bio")}
                        error={errors.bio?.message}
                    />
                    <Input
                        label="Contato"
                        type="text"
                        placeholder="Opção de contato"
                        {...register("contact")}
                        error={errors.contact?.message}
                    />
                    <label htmlFor="">Selecionar módulo</label>
                    <select {...register("course_module")}>
                        <option value="Primeiro módulo (Introdução ao Frontend)">Primeiro módulo</option>
                        <option value="Segundo módulo (Frontend Avançado)">Segundo módulo</option>
                        <option value="Terceiro módulo (Introdução ao Backend)">Terceiro módulo</option>
                        <option value="Quarto módulo (Backend Avançado)">Quarto módulo</option>
                    </select>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
export default Register