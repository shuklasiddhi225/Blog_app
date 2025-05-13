import React from 'react';
import {
  Navbar,
  NavbarToggle,
  NavbarCollapse,
  TextInput,
  Button,
} from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  const location = useLocation();
  const path = location.pathname;

  const linkClasses = (to) =>
    `text-sm ${path === to ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-300'}`;

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Blog
        </span>
        Nest
      </Link>

      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline text-white" color="gray" pill>
          <FaMoon />
        </Button>

        <Link to="/sign-in">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white outline">
            Sign In
          </Button>
        </Link>

        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <Link to="/" className={linkClasses('/')}>
          Home
        </Link>
        <Link to="/about" className={linkClasses('/about')}>
          About
        </Link>
        <Link to="/projects" className={linkClasses('/projects')}>
          Projects
        </Link>
      </NavbarCollapse>
    </Navbar>
  );
}
