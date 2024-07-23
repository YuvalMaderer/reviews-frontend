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
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "@/images/logo.png";

const NavBar = () => {
  const { loggedInUser, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const location = useLocation();

  const getLinkClass = (path: string) =>
    `hover:text-teal-600 text-lg font-bold transition duration-300 ease-in-out ${
      location.pathname === path ? "text-teal-600" : ""
    }`;

  return (
    <nav className="bg-white flex justify-between items-center py-4 px-24">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className={getLinkClass("/")}>
          Home
        </Link>
        <Link to="/business" className={getLinkClass("/business")}>
          Business
        </Link>
        <Link to="/contact" className={getLinkClass("/contact")}>
          Contact Us
        </Link>
        <Login
          isOpen={false}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Register
          isOpen={false}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <div className="flex space-x-4 items-center">
        <a
          className="hover:text-teal-600 transition duration-300 ease-in-out"
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
          className="hover:text-teal-600 transition duration-300 ease-in-out"
        >
          <Github />
        </a>
        <a
          className="hover:text-teal-600 transition duration-300 ease-in-out"
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
                <Avatar className="h-10 w-10">
                  <AvatarImage />
                  <AvatarFallback>
                    {loggedInUser.fullName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
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
                <DropdownMenuItem
                  onClick={() => setIsLoginOpen(true)}
                  className="cursor-pointer"
                >
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsRegisterOpen(true)}
                  className="cursor-pointer"
                >
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
