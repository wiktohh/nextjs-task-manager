import Header from "../components/Header/Header";
import AuthProvider from "../context/auth-context";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <AuthProvider>
      <div className="w-full">
        <Header />
        {children}
      </div>
    </AuthProvider>
  );
};

export default HomeLayout;
