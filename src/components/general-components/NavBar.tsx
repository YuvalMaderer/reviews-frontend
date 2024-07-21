// src/components/Navbar.jsx

import { useAuth } from "@/providers/user.context";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Login from "./Login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { loggedInUser, logout } = useAuth();
  const Navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <div className="flex space-x-4">
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
          <a href="/business" className="hover:text-gray-400">
            Businesses
          </a>
        </div>
      </div>

      {/* Right Side */}
      {!loggedInUser ? (
        <div className="flex space-x-4">
          <Login />
          <Register />
        </div>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="sfsfd" alt="image" />
                <AvatarFallback>{loggedInUser.username[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  Navigate("/");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </nav>
  );
};

export default Navbar;
