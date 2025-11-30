"use client"

import { useState, useEffect } from 'react';
import { Chatroom } from '@packages/types/chat-room';
import ChatroomCard from '../components/chatroom-card';
import { ProtectedRoute } from '../components/protected-route';
import '../../styling/home.css';

async function fetchChatrooms(): Promise<Chatroom[]> {
  const response = await fetch('/api/v2/chats');
  const { data } = (await response.json()) as { data: Chatroom[] };
  return data;
}

export function Home() {
  const [chats, setChats] = useState<Chatroom[] | null>(null);

  useEffect(() => {
    fetchChatrooms().then(setChats).catch(() => setChats(null));
  }, [])

  if (!chats) return <ProtectedRoute><div>Loading chatrooms...</div></ProtectedRoute>

  if (chats.length === 0)
    return (
      <ProtectedRoute>
        <div className="home-container">
          <div className="home-header">
            <h1 className="home-title">Welcome to The Tavern!</h1>
            <p className="home-subtitle">No chatrooms available.</p>
          </div>
        </div>
      </ProtectedRoute>
    )

  return (
    <ProtectedRoute>
      <div className="home-container">
        <div className="home-header">
          <h1 className="home-title">Welcome to The Tavern!</h1>
          <p className="home-subtitle">Pick a table!</p>
        </div>

        <div className="chatroom-grid">
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
      </div>
    </ProtectedRoute>
  )
}
