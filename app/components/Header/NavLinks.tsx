"use client";
import useAuth from "@/app/hooks/use-auth";
import Link from "next/link";
import { pages } from "@/app/lib/pages";
const NavLinks = () => {
  const { token } = useAuth();

  console.log(token);

  return (
    <nav>
      {token &&
        Object.values(pages.auth).map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-gray-800 hover:text-red-500 text-md font-bold"
          >
            {link.name}
          </Link>
        ))}
      {!token &&
        Object.values(pages.public).map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-gray-800 hover:text-red-500 text-md font-bold"
          >
            {link.name}
          </Link>
        ))}
    </nav>
  );
};

export default NavLinks;
