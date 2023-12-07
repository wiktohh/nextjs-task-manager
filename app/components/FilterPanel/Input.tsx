type Type = "text" | "number" | "email" | "password";

interface InputProps {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: Type;
}

const Input = ({ label, onChange, placeholder, type }: InputProps) => {
  return (
    <div className="flex flex-col w-3/4">
      <label
        htmlFor="input"
        className="text-black mb-2 block text-sm font-medium"
      >
        {label}
      </label>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
        id="input"
        className="w-full rounded-lg  bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default Input;
