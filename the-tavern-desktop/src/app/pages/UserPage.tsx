"use client"

import { useState, useEffect } from 'react';
import { useTheme } from "../lib/useTheme"
import { User } from "@packages/types/user"
import { ProtectedRoute } from '../components/protected-route';

export function UserPage() {
  return (
    <ProtectedRoute>
      <UserPageContent />
    </ProtectedRoute>
  );
}

function UserPageContent() {
  const { id } = useParams()
  const theme = useTheme()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [isEditing, setIsEditing] = useState(false)
  const [editUsername, setEditUsername] = useState('')
  const [editPassword, setEditPassword] = useState('')
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/v2/users/${id}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`)
        }
        
        const result = await response.json() as any
        console.log('API response:', result)
        
        if (result && result.id) {
          setUser(result as User)
          setEditUsername(result.name)
        } else if (result.data && result.data.id) {
          setUser(result.data as User)
          setEditUsername(result.data.name)
        } else {
          throw new Error('User not found')
        }
      } catch (error) {
        console.log(error)
        setError(error instanceof Error ? error.message : 'Failed to fetch user')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  const handleUpdateUser = async () => {
    if (!user || !id) return
    
    try {
      setUpdateError(null)
      setUpdateSuccess(false)
      const updateData: any = {
        name: editUsername,
      }
    
      if (editPassword.trim()) {
        updateData.password = editPassword
      }
      
      const response = await fetch(`/api/v2/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update user')
      }
      
      const result = await response.json() as any
      
      if (result && result.id) {
        setUser(result as User)
      } else if (result.data && result.data.id) {
        setUser(result.data as User)
      }
      
      setUpdateSuccess(true)
      setEditPassword('')
      setIsEditing(false)
      setTimeout(() => setUpdateSuccess(false), 3000)
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : 'Failed to update user')
    }
  }

  const handleCancelEdit = () => {
    if (user) {
      setEditUsername(user.name)
    }
    setEditPassword('')
    setUpdateError(null)
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <p style={{ color: theme.text }}>Loading user...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h2 style={{ color: theme.text }}>Error</h2>
          <p style={{ color: theme.mutedText }}>{error}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <p style={{ color: theme.text }}>User not found</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.userCardContainer}>
          <div style={{
            ...styles.userCard,
            backgroundColor: theme.card,
            borderColor: theme.mutedText,
          }}>
            <div style={{
              ...styles.avatar,
              backgroundColor: theme.highlight,
              color: theme.background,
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 style={{
              ...styles.userName,
              color: theme.text,
            }}>
              {user.name}
            </h3>
            <p style={{
              ...styles.userRole,
              color: theme.mutedText,
            }}>
              {user.role}
            </p>
            <p style={{
              ...styles.joinDate,
              color: theme.mutedText,
            }}>
              Joined {new Date(user.joinedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div style={{
          ...styles.infoPanel,
          backgroundColor: theme.background,
          borderColor: theme.mutedText,
        }}>
          <h2 style={{
            ...styles.title,
            color: theme.text,
            borderBottomColor: theme.highlight,
          }}>
            User Information
          </h2>
          
          <div style={styles.infoContent}>
            <div style={styles.infoRow}>
              <span style={{
                ...styles.label,
                color: theme.text,
              }}>
                User ID:
              </span>
              <span style={{
                ...styles.value,
                color: theme.mutedText,
              }}>
                #{user.id}
              </span>
            </div>
            
            <div style={styles.infoRow}>
              <span style={{
                ...styles.label,
                color: theme.text,
              }}>
                Username:
              </span>
              <span style={{
                ...styles.value,
                color: theme.mutedText,
              }}>
                {user.name}
              </span>
            </div>
            
            <div style={styles.infoRow}>
              <span style={{
                ...styles.label,
                color: theme.text,
              }}>
                Role:
              </span>
              <span style={{
                ...styles.roleValue,
                color: theme.mutedText,
                fontWeight: user.role === 'admin' ? '600' : '400',
              }}>
                {user.role}
              </span>
            </div>
            
            <div style={styles.infoRow}>
              <span style={{
                ...styles.label,
                color: theme.text,
              }}>
                Member Since:
              </span>
              <span style={{
                ...styles.value,
                color: theme.mutedText,
              }}>
                {new Date(user.joinedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
        ...styles.editSection,
        backgroundColor: theme.card,
        borderColor: theme.mutedText,
      }}>
        <div style={styles.editHeader}>
          <h4 style={{
            ...styles.editTitle,
            color: theme.text,
          }}>
            Edit Profile
          </h4>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                ...styles.editButton,
                backgroundColor: theme.highlight,
                color: theme.background,
              }}
            >
              Edit
            </button>
          )}
        </div>
        
        {updateSuccess && (
          <div style={{
            ...styles.successMessage,
            backgroundColor: '#4ade80',
            color: '#ffffff',
          }}>
            User updated successfully!
          </div>
        )}
        
        {updateError && (
          <div style={{
            ...styles.errorMessage,
            backgroundColor: '#ef4444',
            color: '#ffffff',
          }}>
            {updateError}
          </div>
        )}
        
        {isEditing ? (
          <div style={styles.editForm}>
            <div style={styles.formGroup}>
              <label style={{
                ...styles.formLabel,
                color: theme.text,
              }}>
                Username
              </label>
              <input
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                style={{
                  ...styles.formInput,
                  backgroundColor: theme.background,
                  color: theme.text,
                  borderColor: theme.mutedText,
                }}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={{
                ...styles.formLabel,
                color: theme.text,
              }}>
                Password
              </label>
              <input
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                style={{
                  ...styles.formInput,
                  backgroundColor: theme.background,
                  color: theme.text,
                  borderColor: theme.mutedText,
                }}
              />
            </div>
            
            <div style={styles.buttonGroup}>
              <button
                onClick={handleUpdateUser}
                style={{
                  ...styles.saveButton,
                  backgroundColor: theme.highlight,
                  color: theme.background,
                }}
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                style={{
                  ...styles.cancelButton,
                  backgroundColor: theme.background,
                  color: theme.text,
                  borderColor: theme.mutedText,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.editPlaceholder}>
            <p style={{
              ...styles.placeholderText,
              color: theme.mutedText,
            }}>
              Click "Edit" to update your username or password
            </p>
          </div>
        )}
      </div>
      <div style={{
        ...styles.aboutSection,
        backgroundColor: theme.card,
        borderColor: theme.mutedText,
      }}>
        <h4 style={{
          ...styles.aboutTitle,
          color: theme.text,
        }}>
          About
        </h4>
        <p style={{
          ...styles.aboutText,
          color: theme.mutedText,
        }}>
          {user.role === 'admin' 
            ? 'Administrator with full access to all tavern features and user management capabilities.'
            : user.role === 'moderator'
            ? 'Moderator with permissions to manage chats and assist users in the tavern community.'
            : 'Regular member of the tavern community. Can participate in chats and discussions.'
          }
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    width: '100%',
    height: '100vh',
  },
  mainContent: {
    display: 'flex',
    gap: '20px',
    width: '100%',
    height: '50vh',
  },
  userCardContainer: {
    width: '33.33%',
    height: '100%',
  },
  userCard: {
    width: '100%',
    height: '100%',
    border: '1px solid',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '32px',
    marginBottom: '20px',
  },
  userName: {
    fontSize: '24px',
    fontWeight: '500',
    margin: '0 0 8px 0',
    textAlign: 'center' as const,
  },
  userRole: {
    fontSize: '16px',
    margin: '0 0 4px 0',
    textTransform: 'capitalize' as const,
  },
  joinDate: {
    fontSize: '14px',
    margin: 0,
  },
  infoPanel: {
    width: '66.67%',
    height: '100%',
    border: '1px solid',
    borderRadius: '8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    margin: '0 0 24px 0',
    borderBottom: '2px solid',
    paddingBottom: '12px',
  },
  infoContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    flex: 1,
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '18px',
    fontWeight: '500',
  },
  value: {
    fontSize: '18px',
  },
  roleValue: {
    fontSize: '18px',
    textTransform: 'capitalize' as const,
  },
  aboutSection: {
    marginTop: '20px',
    padding: '16px',
    borderRadius: '6px',
    border: '1px solid',
    width: '100%',
  },
  aboutTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 8px 0',
  },
  aboutText: {
    fontSize: '14px',
    margin: 0,
    lineHeight: 1.5,
  },
  editSection: {
    marginTop: '20px',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid',
    width: '100%',
  },
  editHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  editTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
  },
  editButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  formLabel: {
    fontSize: '14px',
    fontWeight: '500',
  },
  formInput: {
    padding: '10px 12px',
    border: '1px solid',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  saveButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    border: '1px solid',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  editPlaceholder: {
    padding: '20px',
    textAlign: 'center' as const,
  },
  placeholderText: {
    fontSize: '14px',
    margin: 0,
  },
  successMessage: {
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: '500',
  },
  errorMessage: {
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: '500',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    gap: '16px',
  },
}


function useParams(): { id: any } {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    const segments = path.split('/')
    const userIndex = segments.indexOf('user')
    
    if (userIndex !== -1 && userIndex + 1 < segments.length) {
      const id = segments[userIndex + 1]
      return { id: id }
    }
  }
  
  return { id: null }
}

