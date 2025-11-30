"use client"

import { useTheme } from "@packages/ui/ThemeProvider";
import type { User } from "@packages/types/user";
import '../../styling/user-card.css';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const { theme } = useTheme();
  
  return (
    <a href={`/chat/direct/${user.id}`} className="user-card-link">
      <div className="user-card" style={{ backgroundColor: theme.card }}>
        <div 
          className="user-card-avatar"
          style={{
            backgroundColor: theme.highlight,
            color: theme.background,
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="user-card-info">
          <h3 className="user-card-name" style={{ color: theme.text }}>
            {user.name}
          </h3>
          <p className="user-card-role" style={{ color: theme.mutedText }}>
            {user.role}
          </p>
          <p className="user-card-joined" style={{ color: theme.mutedText }}>
            Joined {new Date(user.joinedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="user-card-action">
          <span className="user-card-arrow" style={{ color: theme.mutedText }}>→</span>
        </div>
      </div>
    </a>
  );
}