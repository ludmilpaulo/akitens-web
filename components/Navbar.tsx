import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center">
          <li className="mr-6">
            <Link 
            className="text-white font-semibold text-lg"
            href="/" as="/home">
            Home
            </Link>
          </li>
          <li className="mr-6">
            <Link 
            className="text-white font-semibold text-lg"
            href="/about" as="/about">
             About
            </Link>
          </li>
          {/* Add more navigation links here */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
