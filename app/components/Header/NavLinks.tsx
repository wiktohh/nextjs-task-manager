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

  return (
    <nav className="flex w-1/6 justify-between">
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
