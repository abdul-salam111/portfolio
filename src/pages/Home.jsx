import Introduction from "../components/introduction/Introduction";
import Profile from "../components/profile/Profile";
import Profession from "../components/profession/Profession";
import WorkProcess from "../components/workProcess/WorkProcess";
import Portfolio from "../components/portfolio/Portfolio";
import WorkTogether from "../components/workTogether/WorkTogether";
import HappyClients from "../components/happyClients/HappyClients";
import Testimonial from "../components/testimonial/Testimonial";
import Blog from "../components/blog/Blog";
import Contact from "../components/contact/Contact";

/**
 * Each section owns its own <section>, vertical rhythm, background band and
 * scroll-reveal, so the page is a flat stack with nothing wrapped around it.
 *
 * Order follows the pitch: who I am → what I do → how I work → what I've
 * built → the ask → proof → writing → contact.
 */
const Home = () => (
  <>
    <Introduction />
    <Profile />
    <Profession />
    <WorkProcess />
    <Portfolio />
    <WorkTogether />
    <HappyClients />
    <Testimonial />
    <Blog />
    <Contact />
  </>
);

export default Home;
