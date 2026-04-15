import "../../../index.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import "./index.css";
import logo from "../../../assets/images/logo.png";

type ModalView = "login" | "profile" | "signup" | null;

interface FooterProps {
  setSidebarOpen: (value: boolean) => void;
  setModalType: (type: ModalView) => void;
}

type FooterLink =
  | {
      id: number;
      label: string;
      type: "link";
      to: string;
    }
  | {
      id: number;
      label: string;
      type: "action";
      action: "openSidebar" | "openProfile";
    };

const socialLinks = [
  { id: 1, href: "/", label: "Facebook", icon: FaFacebookF },
  { id: 2, href: "/", label: "Twitter", icon: FaTwitter },
  { id: 3, href: "/", label: "Instagram", icon: FaInstagram },
  { id: 4, href: "/", label: "LinkedIn", icon: FaLinkedinIn },
  { id: 5, href: "/", label: "YouTube", icon: FaYoutube },
];

const footerSections: {
  id: number;
  title: string;
  links: FooterLink[];
}[] = [
  {
    id: 1,
    title: "Explore",
    links: [
      {
        id: 1,
        label: "Enrolled Courses",
        type: "action",
        action: "openSidebar",
      },
      {
        id: 2,
        label: "Browse Courses",
        type: "link",
        to: "/courses",
      },
    ],
  },
  {
    id: 2,
    title: "Account",
    links: [
      {
        id: 1,
        label: "My Profile",
        type: "action",
        action: "openProfile",
      },
    ],
  },
];

const contactItems = [
  {
    id: 1,
    href: "mailto:contact@company.com",
    label: "contact@company.com",
    icon: HiOutlineMail,
  },
  {
    id: 2,
    href: "tel:+995555111222",
    label: "(+995) 555 111 222",
    icon: FiPhone,
  },
  {
    id: 3,
    label: "Aghmashenebeli St.115",
    icon: HiOutlineLocationMarker,
  },
];

const policyLinks = [
  { id: 1, to: "/terms", label: "Terms and Conditions" },
  { id: 2, to: "/privacy", label: "Privacy Policy" },
];

export default function Footer({ setSidebarOpen, setModalType }: FooterProps) {
  const handleActionClick = (action: "openSidebar" | "openProfile") => {
    if (action === "openSidebar") {
      setSidebarOpen(true);
    }

    if (action === "openProfile") {
      setModalType("profile");
    }
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logoRow">
              <img className="footer__logo" src={logo} alt="Bootcamp logo" />
              <h2 className="footer__title">Bootcamp</h2>
            </div>

            <p className="footer__description">
              Your learning journey starts here!
              <br />
              Browse courses to get started.
            </p>

            <div className="footer__socials">
              {socialLinks.map(({ id, href, label, icon: Icon }) => (
                <a
                  key={id}
                  href={href}
                  aria-label={label}
                  className="footer__socialLink"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="footer__linksWrapper">
            {footerSections.map((section) => (
              <div key={section.id} className="footer__column">
                <h3 className="footer__heading">{section.title}</h3>

                {section.links.map((link) =>
                  link.type === "link" ? (
                    <Link key={link.id} to={link.to} className="footer__link">
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.id}
                      type="button"
                      className="footer__link footer__linkButton"
                      onClick={() => handleActionClick(link.action)}
                    >
                      {link.label}
                    </button>
                  ),
                )}
              </div>
            ))}

            <div className="footer__column">
              <h3 className="footer__heading">Contact</h3>

              {contactItems.map(({ id, href, label, icon: Icon }) =>
                href ? (
                  <a key={id} href={href} className="footer__contact">
                    <Icon />
                    <span>{label}</span>
                  </a>
                ) : (
                  <div key={id} className="footer__contact">
                    <Icon />
                    <span>{label}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            Copyright © 2026 Redberry International
          </p>

          <div className="footer__bottomLinks">
            <span>All Rights Reserved</span>

            {policyLinks.map((link) => (
              <div key={link.id} className="footer__policyItem">
                <span className="footer__divider">|</span>
                <Link to={link.to} className="footer__policyLink">
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
