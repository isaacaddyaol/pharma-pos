'use client';

import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  header?: boolean;
  onClick?: () => void;
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = '' }: TableHeaderProps) {
  return (
    <thead className={`bg-gray-50 ${className}`}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className = '' }: TableBodyProps) {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = '', onClick }: TableRowProps) {
  const baseClasses = onClick ? 'hover:bg-gray-50 cursor-pointer' : '';
  return (
    <tr className={`${baseClasses} ${className}`} onClick={onClick}>
      {children}
    </tr>
  );
}

export function TableCell({ children, className = '', header = false, onClick }: TableCellProps) {
  const baseClasses = header 
    ? 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
    : 'px-6 py-4 whitespace-nowrap text-sm text-gray-900';
    
  const clickableClasses = onClick ? 'hover:bg-gray-100 cursor-pointer' : '';
  const Tag = header ? 'th' : 'td';
  
  return (
    <Tag className={`${baseClasses} ${clickableClasses} ${className}`} onClick={onClick}>
      {children}
    </Tag>
  );
}