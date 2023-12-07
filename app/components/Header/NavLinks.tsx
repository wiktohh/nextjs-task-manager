import React, { useEffect, useState } from "react";
import Link from "next/link";
import { pages } from "@/app/lib/pages";
import useAuth from "@/app/hooks/use-auth";

interface HeaderLinks {
  name: string;
  href: string;
}

const NavLinks = () => {
  const { token } = useAuth();
  const [authLinks, setAuthLinks] = useState<HeaderLinks[]>([]);

  console.log(token);

  useEffect(() => {
    const links = token
      ? Object.values(pages.auth)
      : Object.values(pages.public);

    setAuthLinks(links);
  }, [token]);

  return (
    <nav className="space-x-6">
      {authLinks.map((link) => (
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
