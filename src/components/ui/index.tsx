import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500 shadow-sm',
  accent: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-400 shadow-sm hover:shadow-md',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
  danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 shadow-sm hover:shadow-md',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-md gap-1.5',
  md: 'text-sm px-4 py-2 rounded-lg gap-2',
  lg: 'text-base px-6 py-3 rounded-lg gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, leftIcon, rightIcon, disabled, children, ...props }, ref) => (
    <button ref={ref} className={cn('inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed', variantStyles[variant], sizeStyles[size], className)} disabled={disabled || loading} {...props}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{leftIcon}{children}{rightIcon}</>}
    </button>
  )
);
Button.displayName = 'Button';

import { type InputHTMLAttributes, forwardRef as inputForwardRef } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; helperText?: string; leftIcon?: React.ReactNode; rightIcon?: React.ReactNode; }
export const Input = inputForwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
        <div className="relative">
          {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{leftIcon}</div>}
          <input ref={ref} id={inputId} className={cn('w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2', error ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20', leftIcon && 'pl-10', rightIcon && 'pr-10', className)} {...props} />
          {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</div>}
        </div>
        {error && <p className="mt-1.5 text-sm text-error-600">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

import { type SelectHTMLAttributes, forwardRef as selectForwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
interface SelectOption { value: string; label: string; }
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { label?: string; error?: string; options: SelectOption[]; placeholder?: string; }
export const Select = selectForwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || props.name;
    return (
      <div className="w-full">
        {label && <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
        <div className="relative">
          <select ref={ref} id={selectId} className={cn('w-full appearance-none rounded-lg border bg-white px-4 py-2.5 pr-10 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2', error ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20', !props.value && 'text-gray-400', className)} {...props}>
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><ChevronDown className="h-5 w-5" /></div>
        </div>
        {error && <p className="mt-1.5 text-sm text-error-600">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

import { type TextareaHTMLAttributes, forwardRef as textareaForwardRef } from 'react';
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { label?: string; error?: string; helperText?: string; }
export const Textarea = textareaForwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || props.name;
    return (
      <div className="w-full">
        {label && <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
        <textarea ref={ref} id={textareaId} className={cn('w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-all duration-200 resize-y min-h-[100px] focus:outline-none focus:ring-2', error ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20', className)} {...props} />
        {error && <p className="mt-1.5 text-sm text-error-600">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

interface BadgeProps { children: React.ReactNode; variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral'; size?: 'sm' | 'md'; className?: string; }
const badgeVariantStyles = { primary: 'bg-primary-100 text-primary-700', secondary: 'bg-gray-100 text-gray-700', accent: 'bg-accent-100 text-accent-700', success: 'bg-success-100 text-success-700', warning: 'bg-warning-100 text-warning-700', error: 'bg-error-100 text-error-700', neutral: 'bg-gray-100 text-gray-600' };
const badgeSizeStyles = { sm: 'text-xs px-2 py-0.5', md: 'text-xs px-3 py-1' };
export function Badge({ children, variant = 'primary', size = 'md', className }: BadgeProps) {
  return <span className={cn('inline-flex items-center gap-1 rounded-full font-medium', badgeVariantStyles[variant], badgeSizeStyles[size], className)}>{children}</span>;
}

interface CardProps { children: React.ReactNode; className?: string; hover?: boolean; padding?: 'none' | 'sm' | 'md' | 'lg'; }
const paddingStyles = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
export function Card({ children, className, hover, padding = 'md' }: CardProps) {
  return <div className={cn('bg-white rounded-xl border border-gray-200 shadow-sm', hover && 'hover:shadow-lg transition-all duration-300 cursor-pointer', paddingStyles[padding], className)}>{children}</div>;
}

import { X } from 'lucide-react';
import { useEffect } from 'react';
interface ModalProps { isOpen: boolean; onClose: () => void; title?: string; children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'; className?: string; }
const modalSizeStyles = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl', full: 'max-w-4xl' };
export function Modal({ isOpen, onClose, title, children, size = 'md', className }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) { document.addEventListener('keydown', handleEscape); document.body.style.overflow = 'hidden'; }
    return () => { document.removeEventListener('keydown', handleEscape); document.body.style.overflow = 'unset'; };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative w-full mx-4 bg-white rounded-xl shadow-2xl animate-scale-in', modalSizeStyles[size], className)}>
        {title && (<div className="flex items-center justify-between p-6 border-b border-gray-100"><h2 className="text-xl font-semibold text-gray-900">{title}</h2><button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><X className="h-5 w-5" /></button></div>)}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

interface AvatarProps { src?: string; alt?: string; name?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; }
const avatarSizeStyles = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base', xl: 'h-16 w-16 text-lg' };
function getInitials(name: string): string { return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2); }
export function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  if (src) return <img src={src} alt={alt || name || 'Avatar'} className={cn('rounded-full object-cover', avatarSizeStyles[size], className)} />;
  if (name) return <div className={cn('rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium', avatarSizeStyles[size], className)}>{getInitials(name)}</div>;
  return <div className={cn('rounded-full bg-gray-200 flex items-center justify-center', avatarSizeStyles[size], className)}><svg className="h-1/2 w-1/2 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>;
}

import { Search, Shield } from 'lucide-react';
interface SpinnerProps { size?: 'sm' | 'md' | 'lg'; className?: string; }
const spinnerSizeStyles = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' };
export function Spinner({ size = 'md', className }: SpinnerProps) { return <svg className={cn('animate-spin text-primary-600', spinnerSizeStyles[size], className)} fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>; }
interface LoadingProps { message?: string; fullScreen?: boolean; }
export function Loading({ message = 'Loading...', fullScreen }: LoadingProps) {
  if (fullScreen) return <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"><div className="flex flex-col items-center gap-3"><Spinner size="lg" /><p className="text-gray-600">{message}</p></div></div>;
  return <div className="flex flex-col items-center justify-center py-12 gap-3"><Spinner size="lg" /><p className="text-gray-600">{message}</p></div>;
}
export function Skeleton({ className }: { className?: string }) { return <div className={cn('animate-pulse bg-gray-200 rounded', className)} />; }
export function CardSkeleton() { return <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"><Skeleton className="h-48 w-full" /><div className="p-4 space-y-3"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-1/2" /><div className="flex gap-2"><Skeleton className="h-6 w-16 rounded-full" /><Skeleton className="h-6 w-20 rounded-full" /></div></div></div>; }

interface EmptyStateProps { icon?: React.ReactNode; title: string; description?: string; action?: React.ReactNode; className?: string; }
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return <div className={cn('text-center py-12', className)}>{icon && <div className="flex justify-center mb-4 text-gray-400">{icon}</div>}<h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>{description && <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>}{action && <div className="flex justify-center">{action}</div>}</div>;
}
