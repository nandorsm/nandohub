import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"

function Home() {

    // const userId = localStorage.getItem("@USERID")
    // const token = localStorage.getItem("@TOKEN")
    
    const [userInfo, setUserInfo] = useState([])
    
    
    useEffect(() => {
        const token = localStorage.getItem("@TOKEN")
        const profile = async() => {
            try {
                const response = await api.get('/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setUserInfo(response.data)
            }catch(error) {
                console.log(error)
            }
        }
        profile()
    }, [])
    
    console.log(userInfo)

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("@USERID")
        localStorage.removeItem("@TOKEN")
        navigate('/login')
    }

    return(
        <div>
            <div>
                <h2>Nando Hub</h2>
                <button type="submit" onClick={logout}>Sair</button>
            </div>
            <div>
                <h2>Olá, {userInfo.name}!</h2>
                <p>Módulo: {userInfo.course_module}</p>
            </div>
            <div>
                <h2>Que pena! Estamos em desenvolvimento :(</h2>
                <p>Nossa aplicação está em desenvolvimento, em breve teremos novidades</p>
            </div>
        </div>
    )
}

export default Home