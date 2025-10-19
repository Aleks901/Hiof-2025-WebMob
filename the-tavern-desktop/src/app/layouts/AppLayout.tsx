import type { LayoutProps } from 'rwsdk/router'
import NavButton from '../components/navigation/nav-button';

export function AppLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className='min-h-screen flex flex-col'>
      <header>
        <nav className="grid grid-cols-3 items-center p-4 bg-gray-800 text-white">
            <div className='flex space-x-4 col-start-3 justify-center'>
                <NavButton href="/" className='hover:underline'>Home</NavButton>
                <NavButton href="/friends" className='hover:underline'>Friends</NavButton>
                <NavButton href="/about" className='hover:underline'>About Us</NavButton>
            </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className='bg-gray-200 p-4 mt-6 text-center'>&copy; The Tavern {new Date().getFullYear()}</footer>
    </div>
  );
}