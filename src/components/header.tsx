import { FC } from "react";
import { BellIcon, UserCircle } from "lucide-react";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <BellIcon className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium text-gray-700">Admin</span>
            <UserCircle className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
