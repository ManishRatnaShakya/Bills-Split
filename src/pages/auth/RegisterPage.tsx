import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create new account</h1>
        <p className="text-muted-foreground text-sm ">
          Enter your details below to sign up to new account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Username</Label>
          <Input id="username" type="username" placeholder="Harry potter" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Confirm Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Confirm Password</Label>
            </div>
             <Input id="password" type="password" required />
        </div>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" width="24" height="24">
            <path d="M43.6 20.3H24v7.5h11.2c-1 2.8-2.9 5.1-5.4 6.6l6.7 5.5C40.9 36.4 44 30.9 44 24c0-1.3-.1-2.5-.4-3.7z"/>
            <path d="M24 9.5c3.1 0 5.7 1.1 7.8 2.9l5.8-5.8C33.1 3.5 28.9 2 24 2 14.9 2 7.3 7.8 4.3 16l6.9 5.3C12.9 14.1 17.9 9.5 24 9.5z"/>
            <path d="M11.2 25.7C10.8 24.5 10.5 23.3 10.5 22s.3-2.5.7-3.7L4.3 13.1C3.1 15.6 2.5 18.3 2.5 21s.6 5.4 1.8 7.9l6.9-5.2z"/>
            <path d="M24 44c5.9 0 10.9-1.9 14.5-5.3l-6.7-5.5C29.5 35.5 26.9 36.5 24 36.5c-6.1 0-11.1-4.6-12.8-10.8L4.3 30.7C7.3 39.2 14.9 44 24 44z"/>
            </svg>

          Login with Google
        </Button>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="underline underline-offset-4">
          Login in
        </Link>
      </div>
    </form>
  )
}
