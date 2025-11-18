import { createContext, useState } from 'react'
import { users } from '../../the-tavern-desktop/src/db/schema/user-schema'

export const UserContext = createContext()

export function UserProvider({ children }) {

    const [user, setUser] = useState(null)

    async function login() {
        
    }

    async function register(username, password) {
        try {
            const newUser = await fetch('/api/v2/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'                    
                },
                body: JSON.stringify({ username, password  })
            })

            if (!newUser.ok) {
                throw new Error('Failed to register user')
            }

            const result = await newUser.json()
            console.log('Success:', result)

        } catch (error) {
            console.error('Error:', error.message)
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