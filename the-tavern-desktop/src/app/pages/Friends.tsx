import { usersService } from '../../features/users/usersService';
import { FriendsClient } from './FriendsClient';
import type { User } from '@packages/types/user';

export async function Friends() {
    let users: User[] = [];
    let error: string | null = null;

    try {
        const result = await usersService.listUsers();
        
        if (result.success) {
            users = result.data || [];
        } else {
            error = result.error.message || 'Failed to load users';
        }
    } catch (err) {
        error = 'An error occurred while loading users';
        console.error('Failed to load users:', err);
    }

    return <FriendsClient users={users} error={error} />;
}