import { Outlet } from "react-router-dom";
import NavBar from "../components/common/navbar/NavBar";
import Footer from "../components/common/footer/Footer";
import ScrollToTop from "../components/common/scrollToTop/ScrollToTop";
import { Cursor, ScrollProgress } from "../components/motion";

const Main = () => (
  <div className="relative min-h-screen bg-bg text-fg">
    <ScrollProgress />
    <Cursor />
    <NavBar />
    <main>
      <Outlet />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

export default Main;
