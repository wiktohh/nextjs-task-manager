"use client";
import useAuth from "../../hooks/use-auth";
import NavLinks from "./NavLinks";

const Header = () => {
  const { token, user, logout } = useAuth();

  return (
    <div className="w-full bg-white p-4 flex items-center">
      <div className="flex items-center justify-center space-x-8 w-3/4">
        <h1 className="text-black font-bold text-2xl">
          Task <span className="text-red-500">Manager</span>
        </h1>
        <NavLinks />
      </div>
      {token && (
        <div className="w-1/4 flex items-center space-x-4">
          <p className="text-black">
            Jesteś zalogowany jako: {user.firstName} {user.lastName}
          </p>
          <button
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700"
            onClick={logout}
          >
            Wyloguj się
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
