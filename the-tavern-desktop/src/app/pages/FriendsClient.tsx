"use client"

import { UserCard } from '../components/user-card';
import type { User } from '@packages/types/user';

interface FriendsClientProps {
    users: User[];
    error: string | null;
}

export function FriendsClient({ users, error }: FriendsClientProps) {
    if (error) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Friends</h1>
                <div className="text-center text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Friends</h1>
            
            {users.length === 0 ? (
                <div className="text-center text-gray-500">No users found</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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