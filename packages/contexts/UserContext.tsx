"use client"

import { createContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@packages/types/user'
import { storage, secureStorage } from '@packages/lib/storage'

interface UserContextType {
    user: Omit<User, 'password'> | null;
    login: (username: string, password: string) => Promise<{ success: boolean; data: Omit<User, 'password'> }>;
    register: (username: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<Omit<User, 'password'> | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadUser() {
            try {
                const storedUser = await storage.getItem('user')
                const storedToken = await secureStorage.getItem('token')
                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser))
                }
            } catch (error) {
                console.error('Error loading user from storage:', error)
            } finally {
                setIsLoading(false)
            }
        }
        loadUser()
    }, [])

    async function login(username: string, password: string) {
        try {
            const response = await fetch('http://localhost:5173/api/v2/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'                    
                },
                body: JSON.stringify({ name: username, password })
            })

            const result: any = await response.json()

            if (!response.ok) {
                throw new Error(result.error?.message || 'Failed to login')
            }

            if (result.success && result.data) {
                await storage.setItem('user', JSON.stringify(result.data))
                await secureStorage.setItem('token', result.data.token)
                setUser(result.data)
                return { success: true, data: result.data }
            }

            throw new Error('Invalid response from server')

        } catch (error) {
            console.error('Login error:', error instanceof Error ? error.message : 'Unknown error')
            throw error
        }
    }

    async function register(username: string, password: string) {
        try {
            const newUser = await fetch('http://localhost:5173/api/v2/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'                    
                },
                body: JSON.stringify({ name: username, password, role: 'regular' })
            })

            if (!newUser.ok) {
                throw new Error('Failed to register user')
            }

            const result: any = await newUser.json()
            console.log('Success:', result)
            if (result.success && result.data) {
                await login(username, password)
            }

            return result

        } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : 'Unknown error')
            throw error
        }
    }

    async function logout() {
        try {
            if (user?.id) {
                await fetch('http://localhost:5173/api/v2/auth/logout', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ id: user.id })
                })
            }
        } catch (error) {
            console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error')
        } finally {
            await storage.removeItem('user')
            await secureStorage.removeItem('token')
            setUser(null)
        }
    }

    return (
        <UserContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    )

}
