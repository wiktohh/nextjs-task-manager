import Header from "../components/Header/Header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full">
      <Header />
      {children}
    </div>
  );
};

export default AuthLayout;
