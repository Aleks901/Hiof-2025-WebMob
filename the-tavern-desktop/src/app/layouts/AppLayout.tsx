"use client"

import { useState, useEffect } from 'react';
import type { LayoutProps } from 'rwsdk/router'
import NavButton from '../components/navigation/nav-button';
import { useTheme } from '@packages/ui/useTheme';

export function AppLayout({ children, requestInfo }: LayoutProps) {
  const theme = useTheme();
  
  // keep track of which page we're on
  const [currentPath, setCurrentPath] = useState('');
  
  // grab the path once page loads
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  
  // check if a nav link matches current page
  const isActive = (href: string) => {
    if (href === '/home') {
      return currentPath === '/home' || currentPath === '/';
    }
    if (href === '/user' || href.startsWith('/user')) {
      return currentPath.startsWith('/user');
    }
    return currentPath === href;
  };

  return (
    <div className='min-h-screen flex flex-col' style={{ ...styles(theme).header }}>
      <header>
        <nav className="grid grid-cols-3 items-center p-4 bg-gray-800 text-white" style={{ ...styles(theme).nav }}>
            <div className='col-start-1'>
                <NavButton href='/home' className='hover:underline'>
                  <div style={styles(theme).logoContainer}>
                <img src="/tmp/images/Logo2.png" alt="Logo" style={styles(theme).logo}
                />
              </div>
                </NavButton>
            </div>
            <div className='flex space-x-4 col-start-3 justify-center'>
                <NavButton href="/home" className='hover:underline' isActive={isActive('/home')}>Home</NavButton>
                <NavButton href="/friends" className='hover:underline' isActive={isActive('/friends')}>Friends</NavButton>
                <NavButton href="/about" className='hover:underline' isActive={isActive('/about')}>About Us</NavButton>
                <NavButton href="/user/1" className='hover:underline' isActive={isActive('/user')}>User</NavButton>
                <NavButton href='/' className='hover:underline'>Logout</NavButton>
            </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className='bg-gray-200 p-4 mt-6 text-center' style={{ ...styles(theme).footer }}>&copy; The Tavern {new Date().getFullYear()}</footer>
    </div>
  );
}

const styles = (theme: any) => ({
  header: {
    backgroundColor: theme.card,
    color: theme.text
  },

  logoContainer: {
    width: 140,
    height: 60,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  logo: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain' as const,
    transform: 'scale(2)',
    transformOrigin: 'center', 
  },

  nav : {
    backgroundColor: theme.background,
    color: theme.text
  },

  footer: {
    backgroundColor: theme.card,
    color: theme.text
  }

});