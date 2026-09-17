import {
  faFacebookF,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* `color` is each network's own brand colour — the one sanctioned place for raw
   hex, and it only ever paints on hover. GitHub's mark flips with the theme,
   so it resolves through light-dark() instead of a single value. */
const socialIcons = [
  {
    name: "GitHub",
    icon: faGithub,
    link: "https://github.com/abdul-salam111",
    color: "light-dark(#181717, #f0f6fc)",
  },
  {
    name: "LinkedIn",
    icon: faLinkedin,
    link: "https://www.linkedin.com/in/salam-abdul/",
    color: "#0A66C2",
  },
  {
    name: "Instagram",
    icon: faInstagram,
    link: "https://www.instagram.com/flutterwithabdul?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    color: "#E4405F",
  },
  {
    name: "Facebook",
    icon: faFacebookF,
    link: "https://web.facebook.com/abdul.salam.298488/",
    color: "#1877F2",
  },
];

const SocialMedia = ({ className = "" }) => {
  return (
    <ul className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      {socialIcons.map((item) => (
        <li key={item.name}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            /* --social carries the brand colour, and only the icon uses it —
               the pane's own rim lights up on hover from the shared `.glass`
               interaction rule, so all four buttons catch the light together. */
            style={{ "--social": item.color }}
            className="glass group grid size-10 place-items-center rounded-full hover:-translate-y-1 focus-visible:-translate-y-1 sm:size-11"
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="size-4 text-fg-muted transition-colors duration-200 group-hover:text-[color:var(--social)] sm:size-4.5"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialMedia;
