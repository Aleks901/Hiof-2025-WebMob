"use client"

import BasicCard from "./basic-card";
import '../../styling/chatroom-card.css';

type ChatroomCardProps = {
    id: string;
    name: string;
    description: string;
    image?: string
}

export default function ChatroomCard({id, name, description, image }: ChatroomCardProps) {
    
    return (
        <div className="chatroom-card-container">
            <a href={`/chat/${id}`} className="chatroom-card-link">
                <BasicCard
                    image={image}
                    title={name}
                    description={description}
                />
            </a>
        </div>
    );
}