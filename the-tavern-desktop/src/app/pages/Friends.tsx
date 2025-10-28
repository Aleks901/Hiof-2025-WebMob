import { UserCard } from '../components/user-card';
import type { User } from '../../db/schema/user-schema';

// Mock data for now (replace with real database query later)
const mockUsers: User[] = [
  { id: 1, name: 'Bastian', role: 'admin', joinedAt: '2025-01-01T00:00:00Z', password: 'hash', token: null },
  { id: 2, name: 'Per Arne', role: 'user', joinedAt: '2025-11-11T00:00:00Z', password: 'hash', token: null },
  { id: 3, name: 'Alice Johnson', role: 'moderator', joinedAt: '2025-10-15T00:00:00Z', password: 'hash', token: null },
  { id: 4, name: 'Carol Williams', role: 'user', joinedAt: '2025-09-20T00:00:00Z', password: 'hash', token: null },
];

export function Friends(){
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Friends</h1>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockUsers.map(user => (
                    <UserCard 
                        key={user.id}
                        user={user} 
                        showRole 
                        showJoinedDate 
                    />
                ))}
            </div>
        </div>
    );
}