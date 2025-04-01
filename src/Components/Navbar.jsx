

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0a0f1a] text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="text-3xl font-extrabold text-blue-500 transition duration-300 ml-5">
          <Link to="/">CrackIT</Link>
        </div>

      
        <div className="md:hidden">
          {/* 768px */}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      
        <div className="hidden md:flex gap-8">
          
          <Link
            to="/login"
            className="hover:text-blue-500 transition font-medium duration-300"
          >
            Login
          </Link>


          <Link
            to="/interviewSets"
            className="hover:text-blue-500 transition font-medium duration-300"
          >
            Interview Sets
          </Link>


          <Link
            to="/userAnalytics/:id"
            className="hover:text-blue-500 transition font-medium duration-300"
          >
            User Analytics
          </Link>
        </div>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-[#0a0f1a] border-t border-gray-700 md:hidden z-50">
            <div className="flex flex-col gap-6 p-6">
              {/* <Link
                to="/signUp"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#38bdf8] transition font-medium duration-300"
              >
                Sign Up
              </Link> */}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#38bdf8] transition font-medium duration-300"
              >
                Login
              </Link>
      

              <Link
                to="/interviewSets"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#38bdf8] transition font-medium duration-300"
              >
                Interview Sets
              </Link>


              <Link
                to="/userAnalytics/:id"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#38bdf8] transition font-medium duration-300"
              >
                User Analytics
              </Link>

              
              
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
