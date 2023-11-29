const authLinks = {
  home: {
    name: "Home",
    href: "/home",
  },
  myTasks: {
    name: "My Tasks",
    href: "/my-tasks",
  },
  addTask: {
    name: "Add Task",
    href: "/add-task",
  },
};

const publicLinks = {
  login: {
    name: "Login",
    href: "/auth/login",
  },
  register: {
    name: "Register",
    href: "/auth/register",
  },
};

export const pages = {
  public: publicLinks,
  auth: authLinks,
};
