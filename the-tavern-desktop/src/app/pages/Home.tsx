"use client"

import { useState, useEffect } from 'react';
import { useTheme } from '@packages/ui/useTheme';
import { Chatroom } from '@packages/types/chat-room';
import ChatroomCard from '../components/chatroom-card';
import { ProtectedRoute } from '../components/protected-route';

async function fetchChatrooms(): Promise<Chatroom[]> {
  const response = await fetch('/api/v2/chats');
  const { data } = (await response.json()) as { data: Chatroom[] };
  return data;
}

export function Home() {
  const theme = useTheme();
  const [chats, setChats] = useState<Chatroom[] | null>(null);

  useEffect(() => {
    fetchChatrooms().then(setChats).catch(() => setChats(null));
  }, [])

  if (!chats) return <ProtectedRoute><div>Loading chatrooms...</div></ProtectedRoute>

  if (chats.length === 0)
    return (
      <ProtectedRoute>
        <div>
          <p>Welcome to The Tavern!</p>
          <p>No chatrooms available.</p>
        </div>
      </ProtectedRoute>
    )

  return (
    <ProtectedRoute>
      <div>
        <p>Welcome to The Tavern!</p>
        <p>Pick a table!</p>

        {chats.map((chat) => (
        <ChatroomCard 
          key={chat.id} 
          id={String(chat.id)} 
          name={chat.name} 
          image={chat.imgref}
          description={chat.description}
        />
        ))}
      </div>
    </ProtectedRoute>
  )
}
