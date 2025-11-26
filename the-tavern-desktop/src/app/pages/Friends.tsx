"use client"

import { useState, useEffect, useMemo, useCallback } from 'react';
import { UserCard } from '../components/user-card';
import type { User } from '@packages/types/user';
import { ProtectedRoute } from '../components/protected-route';
import { useUser } from '@packages/hooks/useUser';
import { useTheme } from '@packages/ui/useTheme';

export function Friends() {
    return (
        <ProtectedRoute>
            <FriendsContent />
        </ProtectedRoute>
    );
}

function FriendsContent() {
    const theme = useTheme();
    const { user } = useUser();
    const [friends, setFriends] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchData = async () => {
            if (!user?.id) {
                setFriends([]);
                return;
            }

            try {
                // Fetch friends
                const friendsResponse = await fetch(
                    `/api/v2/users/${user.id}/friends`,
                    { signal: abortController.signal }
                );
                
                if (!friendsResponse.ok) {
                    throw new Error(`Failed to fetch friends: ${friendsResponse.status}`);
                }
                
                const friendsResult = await friendsResponse.json() as { data?: User[] };
                setFriends(friendsResult.data || []);

                // Fetch all users for adding friends
                const usersResponse = await fetch(
                    '/api/v2/users',
                    { signal: abortController.signal }
                );
                
                if (!usersResponse.ok) {
                    throw new Error(`Failed to fetch users: ${usersResponse.status}`);
                }
                
                const usersResult = await usersResponse.json() as { data?: User[] };
                setAllUsers(usersResult.data || []);
            } catch (error: any) {
                if (error.name === 'AbortError') return; // Component unmounted
                console.error('Fetch error:', error);
                setFriends([]);
                setAllUsers([]);
            }
        };

        fetchData();

        return () => abortController.abort(); // Cleanup on unmount
    }, [user?.id]);

    const handleAddFriend = useCallback(async (friendId: number) => {
        if (!user?.id || !friendId || friendId <= 0) return;
        
        // Prevent duplicate requests
        if (loadingIds.has(friendId)) return;
        
        setLoadingIds(prev => new Set(prev).add(friendId));
        setError('');
        
        try {
            const response = await fetch(`/api/v2/users/${user.id}/friends`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friendId }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json() as any;

            if (result.success) {
                // Refresh friends list
                const friendsResponse = await fetch(`/api/v2/users/${user.id}/friends`);
                
                if (friendsResponse.ok) {
                    const friendsResult = await friendsResponse.json() as { data?: User[] };
                    setFriends(friendsResult.data || []);
                }
                
                setShowAddFriend(false);
                setSearchQuery(''); // Clear search after adding
            } else {
                setError(result.error?.message || 'Failed to add friend');
            }
        } catch (error: any) {
            console.error('Add friend error:', error);
            setError(error.message || 'Network error. Please try again.');
        } finally {
            setLoadingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(friendId);
                return newSet;
            });
        }
    }, [user?.id, loadingIds]);

    // Memoized filtered lists for performance
    const availableUsers = useMemo(() => 
        allUsers.filter(u => u.id !== user?.id && !friends.some(f => f.id === u.id)),
        [allUsers, user?.id, friends]
    );

    const filteredAvailableUsers = useMemo(() =>
        availableUsers.filter(u =>
            u.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
        ),
        [availableUsers, searchQuery]
    );

    const filteredFriends = useMemo(() =>
        friends.filter(f =>
            f.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
        ),
        [friends, searchQuery]
    ); 

    return (
        <div className="p-6" style={{ color: theme.text }}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold" style={{ color: theme.text }}>Friends</h1>
                <button
                    onClick={() => setShowAddFriend(!showAddFriend)}
                    className="px-4 py-2 rounded transition-colors"
                    style={{
                        backgroundColor: theme.highlight,
                        color: theme.background,
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = theme.hover}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = theme.highlight}
                >
                    {showAddFriend ? 'Cancel' : 'Add Friend'}
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded"
                    style={{
                        backgroundColor: theme.card,
                        color: theme.text,
                        border: `1px solid ${theme.mutedText}`,
                        outline: 'none',
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = theme.highlight}
                    onBlur={(e) => e.currentTarget.style.borderColor = theme.mutedText}
                />
            </div>

            {error && (
                <div 
                    className="mb-4 p-3 rounded"
                    style={{
                        backgroundColor: theme.hover,
                        border: `1px solid ${theme.hover}`,
                        color: theme.text,
                    }}
                >
                    {error}
                </div>
            )}

            {showAddFriend && (
                <div 
                    className="mb-6 p-4 rounded"
                    style={{
                        backgroundColor: theme.card,
                        border: `1px solid ${theme.mutedText}`,
                    }}
                >
                    <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>Add a Friend</h2>
                    {filteredAvailableUsers.length === 0 ? (
                        <p style={{ color: theme.mutedText }}>
                            {searchQuery ? 'No users found matching your search' : 'No users available to add'}
                        </p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredAvailableUsers.map(availableUser => {
                                const isLoading = loadingIds.has(availableUser.id);
                                return (
                                    <div 
                                        key={availableUser.id} 
                                        className="p-3 rounded"
                                        style={{
                                            backgroundColor: theme.background,
                                            border: `1px solid ${theme.mutedText}`,
                                        }}
                                    >
                                        <UserCard user={availableUser} />
                                        <button
                                            onClick={() => handleAddFriend(availableUser.id)}
                                            disabled={isLoading}
                                            className="mt-2 w-full px-3 py-1 rounded transition-colors"
                                            style={{
                                                backgroundColor: isLoading ? theme.mutedText : theme.highlight,
                                                color: theme.background,
                                                border: 'none',
                                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                                fontWeight: '500',
                                            }}
                                            onMouseOver={(e) => !isLoading && (e.currentTarget.style.backgroundColor = theme.hover)}
                                            onMouseOut={(e) => !isLoading && (e.currentTarget.style.backgroundColor = theme.highlight)}
                                        >
                                            {isLoading ? 'Adding...' : 'Add Friend'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
                Your Friends {searchQuery && `(${filteredFriends.length} matching)`}
            </h2>
            {filteredFriends.length === 0 ? (
                <div className="text-center" style={{ color: theme.mutedText }}>
                    {searchQuery 
                        ? 'No friends found matching your search' 
                        : 'No friends yet. Add some friends above!'}
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredFriends.map(friend => (
                        <UserCard 
                            key={friend.id}
                            user={friend} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}