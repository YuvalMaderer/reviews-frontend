// src/components/Navbar.jsx

import { useAuth } from "@/providers/user.context";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Login from "./Login";
import Register from "./Register";

const Navbar = () => {
  const { loggedInUser } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        {loggedInUser && (
          <Avatar>
            <AvatarImage src="sfsfd" alt="image" />
            <AvatarFallback>{loggedInUser.username[0]}</AvatarFallback>
          </Avatar>
        )}
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
      {!loggedInUser && (
        <div className="flex space-x-4">
          <Login />
          <Register />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
