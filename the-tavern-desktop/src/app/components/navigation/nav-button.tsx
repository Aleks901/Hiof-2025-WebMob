"use client"

import { useTheme } from '@packages/ui/ThemeProvider';
import '../../../styling/nav-button.css';

export default function NavButton({
    children,
    className,
    href,
    isActive = false
}: {
    children: React.ReactNode,
    className?: string,
    href: string,
    isActive?: boolean
}) {
    const { theme } = useTheme();
    
    return (
        <a 
            href={href} 
            className={`nav-button ${isActive ? 'nav-button-active' : 'nav-button-inactive'} ${className || ''}`}
            style={{
                color: isActive ? theme.highlight : theme.text,
                borderBottomColor: isActive ? theme.highlight : 'transparent',
            }}
        >
            {children}
        </a>
    );
}
