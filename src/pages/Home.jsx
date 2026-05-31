import Introduction from "../components/introduction/Introduction";
import Profile from "../components/profile/Profile";
import WorkProcess from "../components/workProcess/WorkProcess";
import Portfolio from "../components/portfolio/Portfolio";
import WorkTogether from "../components/workTogether/WorkTogether";
import Blog from "../components/blog/Blog";
import Profession from "../components/profession/Profession";
import HappyClients from "../components/happyClients/HappyClients";
import Testimonial from "../components/testimonial/Testimonial";
import Contact from "../components/contact/Contact";
import ScrollReveal from "../components/common/ScrollReveal";
import "../../index.css";

const Home = () => {
  return (
    <div className="relative">
      <div className="introduction-profile-background">
        <div className="content">
          <Introduction />
          <Profile />
        </div>
      </div>

      <ScrollReveal>
        <div className="bg-soft-white pt-30">
          <WorkProcess />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <Portfolio />
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-[#01579b]">
          <WorkTogether />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="blog-background">
          <Blog />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-soft-white">
          <Profession />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <HappyClients />
      </ScrollReveal>

      <ScrollReveal>
        <Testimonial />
      </ScrollReveal>

      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </div>
  );
};

export default Home;
