import * as React from "react"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ""}`}
    ref={ref}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={`flex flex-col space-y-1.5 p-6 ${className || ""}`}
    ref={ref}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className || ""}`}
    ref={ref}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={`text-sm text-muted-foreground ${className || ""}`}
    ref={ref}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={`p-6 pt-0 ${className || ""}`} ref={ref} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
