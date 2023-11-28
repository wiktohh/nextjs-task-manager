"use client";
import useAuth from "@/app/hooks/use-auth";
import Link from "next/link";

const NavLinks = () => {
  const authLinks = [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "My Tasks",
      href: "/my-tasks",
    },
    {
      name: "Add Task",
      href: "/add-task",
    },
  ];

  const notAuthLinks = [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "Login",
      href: "/auth/login",
    },
    {
      name: "Register",
      href: "/auth/register",
    },
  ];

  const { token } = useAuth();

  return (
    <>
      {token &&
        authLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-gray-800 hover:text-red-500 text-md font-bold"
          >
            {link.name}
          </Link>
        ))}
      {!token &&
        notAuthLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-gray-800 hover:text-red-500 text-md font-bold"
          >
            {link.name}
          </Link>
        ))}
    </>
  );
};

export default NavLinks;
