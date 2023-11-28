import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <div className="w-full bg-white p-4 flex justify-evenly items-center">
      <h1 className="text-black font-bold text-2xl">
        Task <span className="text-red-500">Manager</span>
      </h1>
      <NavLinks />
    </div>
  );
};

export default Header;
