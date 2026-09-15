import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Address from "./Address";
import Form from "./Form";
import SocialMedia from "../common/socialMedia/SocialMedia";
import { Aurora, Reveal, RevealGroup, RevealItem } from "../motion";

const addressData = [
  {
    icon: faLocationDot,
    title: "Address",
    description: "Johar Town, Lahore, Pakistan",
  },
  {
    icon: faEnvelope,
    title: "My Email",
    description: "abdulsalam.0302@gmail.com",
    href: "mailto:abdulsalam.0302@gmail.com",
  },
  {
    icon: faPhone,
    title: "Call Me Now",
    description: "+92 311 530 8116",
    href: "tel:+923115308116",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section relative overflow-hidden">
      <Aurora />

      <div className="content relative z-10">
        <Reveal className="glass-panel overflow-hidden p-6 sm:p-10 lg:p-14 xl:p-18">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-14 xl:gap-20">
            <div>
              <p className="eyebrow">GET IN TOUCH</p>

              <h2 className="section-title mt-5">
                Let’s discuss your project
              </h2>

              <p className="section-lead mt-5">
                I&apos;m open to mid-level / senior Flutter roles and freelance
                projects. Drop me a line if you have something exciting.
              </p>

              <RevealGroup className="mt-10 flex flex-col gap-1 sm:mt-12" stagger={0.08}>
                {addressData.map((item) => (
                  <RevealItem key={item.title}>
                    <Address item={item} href={item.href} />
                  </RevealItem>
                ))}
              </RevealGroup>

              <div className="mt-10 border-t border-line pt-7">
                <p className="font-mono text-fluid-xs uppercase tracking-[0.18em] text-fg-faint">
                  Find me elsewhere
                </p>
                <div className="mt-3 flex flex-wrap items-center">
                  <SocialMedia />
                </div>
              </div>
            </div>

            <div className="lg:pt-1">
              <Form />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
