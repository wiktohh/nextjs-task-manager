"use client";
import useAuth from "../../hooks/use-auth";
import Wrapper from "../Wrapper";
import NavLinks from "./NavLinks";

const Header = () => {
  const { token, user, logout } = useAuth();

  return (
    <Wrapper>
      <div className="w-full bg-white py-4 flex items-center justify-between">
        <div className="flex items-center justify-between space-x-8">
          <h1 className="text-black font-bold text-2xl">
            Task <span className="text-red-500">Manager</span>
          </h1>
          <NavLinks key={token} />
        </div>
        {token && (
          <div className="flex items-center space-x-4">
            <p className="text-black">
              Jesteś zalogowany jako: {user.firstName} {user.lastName}
            </p>
            <button
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
              onClick={logout}
            >
              Wyloguj się
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Header;
