import React, { useEffect, useState } from "react";
import Link from "next/link";
import { pages } from "@/app/lib/pages";
import useAuth from "@/app/hooks/use-auth";

interface HeaderLinks {
  name: string;
  href: string;
}

const NavLinks = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { token } = useAuth();
  const [authLinks, setAuthLinks] = useState<HeaderLinks[]>([]);

  useEffect(() => {
    const links = token
      ? Object.values(pages.auth)
      : Object.values(pages.public);

    setAuthLinks(links);
  }, [token]);

  return (
    <nav className="flex flex-col md:flex-row text-center text-2xl space-y-3 md:space-y-0 md:text-base md:space-x-6">
      {authLinks.map((link) => (
        <Link
          onClick={onMenuClick}
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
