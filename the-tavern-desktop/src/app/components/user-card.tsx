"use client"

import { useTheme } from "../lib/useTheme";
import type { User } from "../../db/schema/user-schema";

interface UserCardProps {
  user: User;
}

export function UserCard({ 
  user, 
}: UserCardProps) {
  const theme = useTheme();
  
  return (
    <a 
      href={`/chat/direct/${user.id}`}
      style={styles.link}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.hover;
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '';
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.transform = '';
      }}
    >
      <div style={{
        ...styles.card,
        backgroundColor: theme.card,
      }}>
        <div style={{
          ...styles.avatar,
          backgroundColor: theme.highlight,
          color: theme.background,
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div style={styles.userInfo}>
          <h3 style={{
            ...styles.userName,
            color: theme.text,
          }}>
            {user.name}
          </h3>
          
            <p style={{
              ...styles.role,
              color: theme.mutedText,
            }}>
              {user.role}
            </p>
          
            <p style={{
              ...styles.joinedDate,
              color: theme.mutedText,
            }}>
              Joined {new Date(user.joinedAt).toLocaleDateString()}
            </p>
        </div>
        
        {/* Action Indicator */}
        <div style={styles.actionIndicator}>
          <span style={{
            ...styles.arrow,
            color: theme.mutedText,
          }}>→</span>
        </div>
      </div>
    </a>
  );
}


const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    gap: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '18px',
    flexShrink: 0,
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  userName: {
    fontSize: '18px',
    fontWeight: '500',
    margin: '0 0 4px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  role: {
    fontSize: '14px',
    margin: '0 0 2px 0',
    textTransform: 'capitalize' as const,
  },
  joinedDate: {
    fontSize: '12px',
    margin: 0,
  },
  actionIndicator: {
    flexShrink: 0,
  },
  arrow: {
    fontSize: '16px',
  },
};