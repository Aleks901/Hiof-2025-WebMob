import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    async function login(username, password) {

    }

    async function register(username, password) {

    }

    async function logout() {

    }

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    )

}