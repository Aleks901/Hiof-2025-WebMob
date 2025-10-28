"use client"

import BasicCard from "./basic-card";
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
  const cardContent = (
    <div style={styles.container}>
      {/* User Avatar/Initial */}
      <div style={styles.avatar}>
        {user.name.charAt(0).toUpperCase()}
      </div>
      
      {/* User Info */}
      <div style={styles.userInfo}>
        <h3 style={styles.userName}>
          {user.name}
        </h3>
        
        {showRole && user.role && (
          <p style={styles.userRole}>
            {user.role}
          </p>
        )}
        
        {showJoinedDate && user.joinedAt && (
          <p style={styles.joinedDate}>
            Joined {new Date(user.joinedAt).toLocaleDateString()}
          </p>
        )}
      </div>
      
      {/* Action Indicator */}
      <div style={styles.actionIndicator}>
        <span style={styles.arrow}>→</span>
      </div>
    </div>
  );

  return (
    <a 
      href={`/chat/direct/${user.id}`}
      style={styles.link} 
      className="user-card-link"
    >
      <div style={styles.clickableCard}>
        <BasicCard title="" description="">
          {cardContent}
        </BasicCard>
      </div>
    </a>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    gap: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  
  avatar: {
    width: '48px',
    height: '48px',
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
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
    color: '#111827',
    margin: '0 0 4px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  
  userRole: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 2px 0',
    textTransform: 'capitalize' as const,
  },
  
  joinedDate: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0,
  },
  
  actionIndicator: {
    flexShrink: 0,
  },
  
  arrow: {
    fontSize: '16px',
    color: '#9ca3af',
  },
  
  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  
  clickableCard: {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};