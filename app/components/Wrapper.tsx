type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return <div className="w-3/5 mx-auto">{children}</div>;
};

export default Wrapper;
