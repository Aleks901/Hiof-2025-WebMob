"use client"

import { useTheme } from "../lib/useTheme";
import type { User } from "../../db/schema/user-schema";

interface UserCardProps {
  user: User;
  showRole?: boolean;
  showJoinedDate?: boolean;
}

export function UserCard({ 
  user, 
  showRole = false,
  showJoinedDate = false 
}: UserCardProps) {
  const theme = useTheme();
  
  return (
    <a 
      href={`/chat/direct/${user.id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
      }}
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
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        gap: '16px',
        backgroundColor: theme.card,
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}>
        {/* User Avatar/Initial */}
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: theme.highlight,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.background,
          fontWeight: '600',
          fontSize: '18px',
          flexShrink: 0,
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        
        {/* User Info */}
        <div style={{
          flex: 1,
          minWidth: 0,
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            color: theme.text,
            margin: '0 0 4px 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap' as const,
          }}>
            {user.name}
          </h3>
          
          {showRole && user.role && (
            <p style={{
              fontSize: '14px',
              color: theme.mutedText,
              margin: '0 0 2px 0',
              textTransform: 'capitalize' as const,
            }}>
              {user.role}
            </p>
          )}
          
          {showJoinedDate && user.joinedAt && (
            <p style={{
              fontSize: '12px',
              color: theme.mutedText,
              margin: 0,
            }}>
              Joined {new Date(user.joinedAt).toLocaleDateString()}
            </p>
          )}
        </div>
        
        {/* Action Indicator */}
        <div style={{
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: '16px',
            color: theme.mutedText,
          }}>→</span>
        </div>
      </div>
    </a>
  );
}