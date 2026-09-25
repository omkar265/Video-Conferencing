import axios, { HttpStatusCode } from "axios";
import { Children, createContext, useContext, useState } from "react";


export const AutoContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users"
})

export const AuthProvider = ({children}) => {
    const authContext = useContext(AutoContext);

    const [userData, setUserData] = useState(authContext);

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })

            if(request.status === HttpStatusCode.Cre) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }


    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            if(request.status === HttpStatusCode.Ok) {
                localStorage.setItem("token", request.data.token);
            
            }
        } catch (err) {
            throw err;
        }
    }

    const router = useNavigate();

    const data = {
        userData, setUserData, handleRegister, handleLogin
    }

    return (
        <AutoContext.Provider value={data}>
            {children}
        </AutoContext.Provider>
    )

}