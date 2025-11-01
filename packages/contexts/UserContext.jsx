import { createContext, useState } from 'react'
import { users } from '../../the-tavern-desktop/src/db/schema/user-schema'

export const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    async function login(username, password) {
        try{
            await users.createUsernamePasswordSession(username, password)
            const response = await users.get()
            setUser(response)
        }
        catch(error){
            console.log(error.message)
        }
    }

    async function register(username, password) {
        try{
            await users.create(username, password)
            await login(username, password)
        }
        catch(error){
            console.log(error.message)
        }
    }

    async function logout() {

    }

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    )

}