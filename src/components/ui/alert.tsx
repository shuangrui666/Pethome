import * as React from "react"

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={`relative w-full rounded-lg border p-4 ${className || ""}`}
    ref={ref}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={`text-sm [&_p]:leading-relaxed ${className || ""}`}
    ref={ref}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }
