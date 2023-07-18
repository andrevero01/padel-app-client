import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      className={`w-full bg-neutral text-white fixed bottom-0 md:static md:top-0`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-bold">
              <img
                className="w-14"
                src="https://www.usaclicosenza.it/wp-content/uploads/2021/04/Padel-League-Logo.jpeg"
                alt="App logo"
              ></img>
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
                href="/leagues"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Leagues
              </Link>
              <Link
                href="/settings"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
