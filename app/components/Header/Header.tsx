"use client";
import { useState } from "react";
import useAuth from "../../hooks/use-auth";
import Wrapper from "../Wrapper";
import NavLinks from "./NavLinks";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const { token, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isMenuOpen) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-white">
        <div className="flex justify-end">
          <button onClick={() => setIsMenuOpen(false)} className="text-4xl">
            <IoClose />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <NavLinks onMenuClick={() => setIsMenuOpen(false)} key={token} />
          <button
            className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
            onClick={logout}
          >
            Wyloguj się
          </button>
        </div>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="w-full bg-white py-4 flex items-center justify-between">
        <div className="flex items-center justify-between space-x-8">
          <h1 className="text-black font-bold text-2xl">
            Task <span className="text-red-500">Manager</span>
          </h1>
          <div className="hidden md:block">
            <NavLinks key={token} />
          </div>
        </div>
        {token && (
          <div className="flex items-center space-x-4">
            <p className="hidden md:block text-black">
              Jesteś zalogowany jako: {user.firstName} {user.lastName}
            </p>
            <button
              className="hidden md:block text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
              onClick={logout}
            >
              Wyloguj się
            </button>
            <button
              className="block md:hidden text-2xl"
              onClick={() => setIsMenuOpen(true)}
            >
              <GiHamburgerMenu />
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Header;
