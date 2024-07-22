import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/user.context";
import Register from "./Register";
import { useState } from "react";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

function Login({ isOpen, onClose }: LoginProps) {
  const { login } = useAuth();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const password = formData.get("password") as string | null;
    const email = formData.get("email") as string | null;

    if (email && password) {
      try {
        await login({ email, password });
        onClose(); // Close the dialog after successful login
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      console.error("Email and password are required.");
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email:
              </Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email here"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password:
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                className="col-span-3"
                placeholder="Enter your password here"
                required
              />
            </div>
            <DialogFooter>
              <div className="text-center mt-4 flex justify-between">
                <div className=" text-start">
                  <span>Not a member? </span>
                  <Button
                    variant="link"
                    onClick={() => setIsRegisterOpen(true)}
                  >
                    Register
                  </Button>
                </div>
                <Button type="submit">Login</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}

export default Login;
