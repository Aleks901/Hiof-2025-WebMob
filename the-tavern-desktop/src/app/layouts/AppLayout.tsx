import type { LayoutProps } from 'rwsdk/router'
import NavButton from '../components/navigation/nav-button';
import { useTheme } from '../lib/useTheme';

export function AppLayout({ children, requestInfo }: LayoutProps) {

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
                <NavButton href="/home" className='hover:underline'>Home</NavButton>
                <NavButton href="/friends" className='hover:underline'>Friends</NavButton>
                <NavButton href="/about" className='hover:underline'>About Us</NavButton>
                <NavButton href='/' className='hover:underline'>Logout</NavButton>
            </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className='bg-gray-200 p-4 mt-6 text-center' style={{ ...styles(theme).footer }}>&copy; The Tavern {new Date().getFullYear()}</footer>
    </div>
  );
}

 const theme = useTheme();

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