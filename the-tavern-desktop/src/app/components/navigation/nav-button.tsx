"use client"

export default function NavButton({
    children,
    className,
    href
}: {
    children: React.ReactNode,
    className?: string,
    href: string
}) {
    return (
            <a href={href} className={className}>
                {children}
            </a>
    );
}
