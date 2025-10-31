"use client"

import { useState, useEffect } from 'react';
import { UserCard } from '../components/user-card';
import type { User } from '@packages/types/user';

export function Friends() {
    // stores all the users we get from the API
    const [users, setUsers] = useState<User[]>([]);

    // runs when the page loads
    useEffect(() => {
        // gets users from the api
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/v2/users');
                const result = await response.json() as any;
                console.log('API response:', result);
                
                // figures out what format the data is in
                if (Array.isArray(result)) {
                    setUsers(result as User[]);
                } else if (result.data && Array.isArray(result.data)) {
                    setUsers(result.data as User[]);
                // if weird format just make it empty so the page does not break
                } else {
                    setUsers([]);
                }
            } catch (error) {
                // something went wrong
                console.log(error);
                // make it empty so nothing breaks
                setUsers([]);
            }
        };

        fetchUsers();
    }, []); 

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Friends</h1>
            
            {/* if there are no users it does not create a grid (really annoying that there are two different commenting styles)  */}
            {users.length === 0 ? (
                <div className="text-center text-gray-500">No users found</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* goes through each user and makes a card for them */}
                    {users.map(user => (
                        <UserCard 
                            key={user.id}
                            user={user} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}