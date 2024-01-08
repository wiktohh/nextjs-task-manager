import Header from "../components/Header/Header";
import AuthProvider from "../context/auth-context";
import {Metadata} from 'next'

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "TaskManager | Home",
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
