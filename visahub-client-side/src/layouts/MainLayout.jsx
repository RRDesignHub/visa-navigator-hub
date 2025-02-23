import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
export const MainLayout = () => {
  const location = useLocation();
  return (
    <>
      <header>
        <div className="bg-blue-50 drop-shadow-sm">
          <Navbar></Navbar>
          {location.pathname == "/" && <Banner></Banner>}
        </div>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer className="bg-blue-300">
        <Footer></Footer>
      </footer>
      
    </>
  );
};
