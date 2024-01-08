import { Metadata } from "next";
import Header from "../components/Header/Header";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "TaskManager | Auth",
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full">
      <Header />
      {children}
    </div>
  );
};

export default AuthLayout;
