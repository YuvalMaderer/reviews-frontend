// NavBar.jsx

import { Facebook, Github, Linkedin } from "lucide-react";

const NavBar = () => {
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
      </div>
    </nav>
  );
};

export default NavBar;
