import { cn } from '@/utilities/ui'

export function ImagePlaceholder({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-md border border-dashed bg-muted p-4 text-center text-xs text-muted-foreground',
        className,
      )}
    >
      {label}
    </div>
  )
}
