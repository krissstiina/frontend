import { FC } from "react";

interface HeaderProps {
    title: string;
    className?: string;
}

export const Header: FC<HeaderProps> = ({ title, className = "" }) => {
    return (
    <header className={`page-header ${className}`}>
        <h1 className="page-title">{title}</h1>
    </header>
    );
};