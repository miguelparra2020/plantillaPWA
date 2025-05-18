import React,{ useState, useEffect } from "react"
import {CircleUserRound} from "lucide-react"
const GetImgPerfil = () => {
  const [user, setUser]  = useState(null)
  useEffect(() => {
    const savedUser = localStorage.getItem("googleUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])
    return (
        <div>
          {
          user ? <img src={user.picture} width={40} height={40} alt="Imagen de perfil" className="rounded-full" /> :
            <CircleUserRound className="h-10 w-10" />
          }
             
        </div>
    )
}

export default GetImgPerfil