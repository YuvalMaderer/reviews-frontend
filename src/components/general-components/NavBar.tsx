import { useState } from "react";
import { Facebook, Github, Linkedin } from "lucide-react";
import { useAuth } from "@/providers/user.context";
import Login from "./Login";
import Register from "./Register";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const NavBar = () => {
  const { loggedInUser, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <nav className="bg-white flex justify-between items-center p-4 px-40">
      <div className="flex items-center">
        <img src="/path-to-logo.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex space-x-4">
        <a
          href="/"
          className="hover:text-red-violet hover:border-b-2 border-red-violet font-bold transition duration-300 ease-in-out"
        >
          Home
        </a>
        <a
          href="business"
          className="hover:text-red-violet hover:border-b-2 border-red-violet font-bold transition duration-300 ease-in-out"
        >
          Business
        </a>
        <Login />
        <Register />
      </div>
      <div className="flex space-x-4">
        <a
          className="hover:text-red-violet transition duration-300 ease-in-out"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-violet transition duration-300 ease-in-out"
        >
          <Github />
        </a>
        <a
          className="hover:text-red-violet transition duration-300 ease-in-out"
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin />
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {loggedInUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                  <AvatarImage />
                  <AvatarFallback>
                    {loggedInUser.fullName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <div>Logout</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>Hello Guest</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Welcome</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoginOpen(true)}>
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsRegisterOpen(true)}>
                  Register
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </nav>
  );
};

export default NavBar;
