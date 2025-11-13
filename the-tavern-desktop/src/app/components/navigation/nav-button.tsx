"use client"

import { useTheme } from '../../lib/useTheme';

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
    const theme = useTheme();
    
    return (
        <a 
            href={href} 
            className={className}
            style={{
                color: isActive ? theme.highlight : theme.text,
                fontWeight: isActive ? '600' : '400',
                borderBottom: isActive ? `2px solid ${theme.highlight}` : 'none',
                paddingBottom: '4px',
            }}
        >
            {children}
        </a>
    );
}
