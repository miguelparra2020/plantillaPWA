import { useState, useEffect } from "react"
import ImagenUser from '@img/user.png';
const GetImgPerfil = () => {
  const [user, setUser]  = useState(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("googleUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
    return (
        <div>
        <img src={user? user.picture  : ImagenUser} width={40} height={40} alt="Imagen de perfil" className="rounded-full" />     
        </div>
    )
}

export default GetImgPerfil