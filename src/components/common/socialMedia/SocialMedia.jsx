import {
  faGithub,
  faLinkedin,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socialIcons = [
  { icon: faGithub,    link: "https://github.com/abdul-salam111",        color: "#181717", hover: "#181717" },
  { icon: faLinkedin,  link: "https://www.linkedin.com/in/salam-abdul/", color: "#0A66C2", hover: "#0A66C2" },
  { icon: faInstagram, link: "https://www.instagram.com/flutterwithabdul?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", color: "#E4405F", hover: "#E4405F" },
  { icon: faFacebookF, link: "https://web.facebook.com/abdul.salam.298488/", color: "#1877F2", hover: "#1877F2" },
];

const SocialMedia = () => {
  return socialIcons.map((item, index) => (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 pt-3 xs:p-2.5 xs:pt-3.75 sm:pt-4 md:pt-5 sm:p-3 md:p-3.75 rounded-md transition-opacity duration-200 hover:opacity-75"
      key={index}
    >
      <FontAwesomeIcon
        icon={item.icon}
        className="text-xl w-4.5 aspect-square"
        style={{ color: item.color }}
      />
    </a>
  ));
};

export default SocialMedia;
