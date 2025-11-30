"use client"

import { useEffect, useState } from 'react';
import { useUser } from '@packages/hooks/useUser';
import { errorRedirect } from '@/middleware/actions';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise(resolve => setTimeout(resolve, 150));
            
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                return errorRedirect("NOT ALLOWED: NO LOGIN DETECTED")
            } else {
                setIsReady(true);
            }
        };

        checkAuth();
    }, []); 

    if (!isReady) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
    }

    return <>{children}</>;
}
