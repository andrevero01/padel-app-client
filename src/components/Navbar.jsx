import Link from "next/link";

const Navbar = () => {

  return (
    <nav className={`w-full bg-slate-600 text-white fixed bottom-0 md:static md:top-0`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-bold">
              Logo
            </Link>
          </div>
          <div>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/game"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Game
              </Link>
              <Link
                href="/player"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Player
              </Link>
              <Link
                href="/unused"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Unused
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
