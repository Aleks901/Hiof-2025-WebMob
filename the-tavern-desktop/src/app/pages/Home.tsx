"use client"

import { useState, useEffect } from 'react';
import { useTheme } from '@packages/ui/useTheme';
import { Chatroom } from '@packages/types/chat-room';

async function fetchChatrooms(): Promise<Chatroom[]> {
  const response = await fetch('http://localhost:5173/api/v2/chats');
  const { data } = (await response.json()) as { data: Chatroom[] };
  return data;
}

export function Home() {
  const theme = useTheme();
  const [chats, setChats] = useState<Chatroom[] | null>(null);

  useEffect(() => {
    fetchChatrooms().then(setChats).catch(() => setChats(null));
  }, [])

  if (!chats) return <div>Loading chatrooms...</div>
  
  if (chats.length === 0)
    return (
      <div>
        <p>Welcome to The Tavern!</p>
        <p>No chatrooms available.</p>
      </div>
    )

  return (
    <div>
      <p>Welcome to The Tavern!</p>
      <p>Pick a table!</p>

      <div>
        {chats.map((chat) => (
          <div key={chat.id}>
            <h2>{chat.name}</h2>
            <p>{chat.description}</p>
            {chat.imgref && <img src={chat.imgref} alt={chat.name} />}
          </div>
        ))}
      </div>
    </div>
  )
}
