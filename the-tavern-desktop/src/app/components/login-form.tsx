"use client"

import { BasicForm } from './basic-form'
import { useTheme } from '@packages/ui/ThemeProvider';
import { useState, useEffect } from 'react';
import { useUser } from '@packages/hooks/useUser';
import '../../styling/login-form.css';

export default function LoginForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const { login, register } = useUser();
    const { theme } = useTheme();

    useEffect(() => {
        const checkUser = async () => {
            await new Promise(resolve => setTimeout(resolve, 150));
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                window.location.href = '/home';
            }
        };

        checkUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isRegisterMode) {
                await register(username, password);
                window.location.href = '/home';
            } else {
                await login(username, password);
                window.location.href = '/home';
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : isRegisterMode ? 'Registration failed' : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BasicForm 
            title={isRegisterMode ? 'Register' : 'Login'} 
            formStyles={{
                formStyle: {
                    backgroundColor: theme.card,
                    borderColor: theme.highlight,
                },
                buttonStyle: {
                    background: theme.highlight,
                    borderColor: theme.card,
                },
                titleStyle: {}
            }}
            formClasses={{
                formClass: 'login-form',
                buttonClass: 'login-form-submit-button',
                titleClass: 'login-form-title'
            }}
            onSubmit={handleSubmit}
        >
            {error && (
                <div className="login-form-error-container">
                    <p className="login-form-error-text">{error}</p>
                </div>
            )}
            
            <div className="login-form-input-container" style={{ 
                borderColor: theme.highlight,
                backgroundColor: theme.background 
            }}>
                <input 
                    type="text" 
                    placeholder='Username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    className="login-form-input"
                    style={{ color: theme.text }}
                />
            </div>

            <div className="login-form-input-container" style={{ 
                borderColor: theme.highlight,
                backgroundColor: theme.background 
            }}>
                <input 
                    type="password" 
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="login-form-input"
                    style={{ color: theme.text }}
                />
            </div>

            <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="login-form-toggle-button"
                disabled={isLoading}
                style={{ 
                    borderColor: theme.highlight,
                    color: theme.text 
                }}
            >
                {isRegisterMode ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
        </BasicForm>
    );
}