import React from 'react';
import { Link } from 'react-router-dom';
import { Code, BookOpen, Play, Users, MessageSquare } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Code size={24} />
          <span className="font-bold text-xl">CodeEdu</span>
        </Link>
        <div className="flex space-x-4">
          <NavLink to="/learn" icon={<BookOpen size={18} />} text="Learn" />
          <NavLink to="/playground" icon={<Play size={18} />} text="Playground" />
          <NavLink to="/devdiscuss" icon={<MessageSquare size={18} />} text="DevDiscuss" />
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center space-x-1 hover:text-blue-200 transition-colors duration-200">
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;