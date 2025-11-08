import type { LayoutProps } from 'rwsdk/router'
import NavButton from '../components/navigation/nav-button';
import { useTheme } from '../lib/useTheme';

export function AppLayout({ children, requestInfo }: LayoutProps) {

  return (
    <div className='min-h-screen flex flex-col' style={{ ...styles.header }}>
      <header>
        <nav className="grid grid-cols-3 items-center p-4 bg-gray-800 text-white" style={{ ...styles.nav }}>
            <div className='col-start-1'>
                <NavButton href='/home' className='hover:underline'>
                  <img src="/tmp/images/Logo2.png" alt="Logo" style={{ ...styles.logo }} height={150} width={150}/>
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

      <footer className='bg-gray-200 p-4 mt-6 text-center' style={{ ...styles.footer }}>&copy; The Tavern {new Date().getFullYear()}</footer>
    </div>
  );
}

 const theme = useTheme();

const styles = {
  header: {
    backgroundColor: theme.card,
    color: theme.text
  },
  logo: {
  },

  nav : {
    backgroundColor: theme.background,
    color: theme.text
  },

  footer: {
    backgroundColor: theme.card,
    color: theme.text
  }

}