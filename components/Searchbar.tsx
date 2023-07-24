// components/Searchbar.js
import { useState } from 'react';
import Image from 'next/image';
import barner from '../assets/Serra_da_Leba_Angola.jpg';


const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here using the searchQuery state
    console.log('Searching for:', searchQuery);
  };

  return (

    <><div className="relative w-full h-96">
          <Image src={barner} alt="Banner Image" layout="fill" objectFit="cover" />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             
              <div className="rounded-lg">
              <h1 className="text-white text-4xl font-semibold">Welcome to Our Website </h1>
              <form onSubmit={handleSearch} className="flex items-center space-x-4 border-t border-blue-500 border-8 border-gray-800 ">
                  <input
                      type="text"
                      placeholder="Search..."
                      className="border rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} />
                  <input
                      type="text"
                      placeholder="Search..."
                      className="border rounded px-4 py-2focus:outline-none focus:ring focus:border-blue-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} />

                  <div className="relative">
                      <button
                          className="px-4 py-2 bg-[#2a6a17] text-white rounded focus:outline-none"
                          onClick={toggleDropdown}
                      >
                          Menu
                      </button>
                      {isOpen && (
                          <ul className="absolute top-10 right-0 z-10 bg-white border border-gray-200 divide-y divide-gray-200 rounded shadow">
                              <li className="px-4 py-2">Item 1</li>
                              <li className="px-4 py-2">Item 2</li>
                              <li className="px-4 py-2">Item 3</li>
                          </ul>
                      )}
                  </div>



                  <button
                      type="submit"
                      className="bg-[#FD9415] hover:bg-[#FD9415] text-white px-4 py-2 rounded focus:outline-none"
                  >
                      Search
                  </button>
              </form>
          </div>
              

          </div>
      </div>
     </>
  );
};

export default Searchbar;
