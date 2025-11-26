"use client"

import { BasicForm } from './basic-form'
import { useTheme } from '@packages/ui/useTheme';
import { useState, useEffect } from 'react';
import { useUser } from '@packages/hooks/useUser';

export default function LoginForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const { login, register } = useUser();

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
                formStyle: styles.formStyle,
                buttonStyle: styles.buttonStyle,
                titleStyle: styles.titleStyle
            }}
            onSubmit={handleSubmit}
        >
            {error && (
                <div style={styles.errorContainer}>
                    <p style={styles.errorText}>{error}</p>
                </div>
            )}
            <div style={styles.inputContainer}>
                <input 
                    type="text" 
                    placeholder='Username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    style={styles.input}
                />
            </div>
            <div style={styles.inputContainer}>
                <input 
                    type="password" 
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    style={styles.input}
                />
            </div>
            <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                style={styles.toggleButton}
                disabled={isLoading}
            >
                {isRegisterMode ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
        </BasicForm>
    );
}

const theme = useTheme();

const styles = {
    
    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
        borderColor: theme.highlight,
        borderWidth: 1,
        borderRadius: 6,
        padding: 8,
        backgroundColor: theme.background,
    },

    input: {
        width: '100%',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        color: theme.text,
        fontSize: 14,
    },

    errorContainer: {
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
    },

    errorText: {
        color: '#c00',
        margin: 0,
        fontSize: 14,
    },

    formStyle: {
        display: 'flex',
        flexDirection: 'column' as const,
        border: `10px solid ${theme.highlight}`,
        padding: 14,
        borderRadius: 12,
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.highlight,
    },

    buttonStyle: {
        background: theme.highlight,
        border: `2px solid ${theme.card}`,
        borderRadius: 12,
    },

    titleStyle: {
        fontSize: 24
    },

    toggleButton: {
        marginTop: 16,
        padding: '8px 16px',
        background: 'transparent',
        border: `1px solid ${theme.highlight}`,
        borderRadius: 6,
        color: theme.text,
        cursor: 'pointer',
        fontSize: 14,
        transition: 'all 0.2s',
    }

}