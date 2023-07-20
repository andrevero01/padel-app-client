import ScrollToTopButton from "./components/ScrollToTop.jsx";
import Carousel from "./components/Carousel.jsx";
import PlayersMainpage from "./components/PlayersMainpage.jsx";
//import CreatePlayer from "./createPlayer/page.jsx";
import TeamsMainPage from "./components/TeamsMainPage.jsx";

export default function Home() {
  const carouselImages = [
    "https://img.freepik.com/foto-gratis/arreglo-raquetas-pelotas-tenis_23-2149434236.jpg",
    "https://www.vita10.es/wp-content/uploads/2022/05/padel_21.jpg",
    "https://allforpadel.com//modules/prestablog/views/img/grid-for-1-7/up-img/thumb_443.jpg",
    "https://www.2playbook.com/uploads/s1/18/20/64/padel-recurso.jpeg",
    "https://hips.hearstapps.com/hmg-prod/images/young-people-playing-padel-tennis-royalty-free-image-1680623375.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*",
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="px-24 py-10">
        <h1 className="text-center mb-4">Welcome to our homepage</h1>
        <p>
          The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum." Section 1.10.32 of "de Finibus Bonorum et
          Malorum", written by Cicero in 45 BC "Sed ut perspiciatis unde omnis
          iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
          quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <div className="home-page-carrousel my-8">
          <Carousel images={carouselImages} />
        </div>
        <div>
          <h1>Click here if you want to see some players:</h1>
          <PlayersMainpage />
        </div>
        <div className="">
          <ScrollToTopButton />
        </div>
      </div>
    </main>
  );
}
