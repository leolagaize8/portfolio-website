import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function Button({ className, variant = 'default', size = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'ghost' && 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        variant === 'outline' && 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
        variant === 'link' && 'text-muted-foreground underline-offset-4 hover:text-foreground hover:underline',
        size === 'default' && 'h-9 px-4 text-sm',
        size === 'sm' && 'h-7 px-3 text-xs',
        size === 'lg' && 'h-11 px-8 text-base',
        size === 'icon' && 'h-9 w-9',
        className
      )}
      {...props}
    />
  )
}
