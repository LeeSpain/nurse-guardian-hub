
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterSection {
  title: string;
  links: {
    name: string;
    href: string;
    isExternal?: boolean;
  }[];
}

const SiteFooterLinks: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { name: "Nurse Portal", href: "/nurse" },
        { name: "Care Seeker Portal", href: "/client/home" },
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/resources/docs" },
        { name: "Tutorials", href: "/resources/tutorials" },
        { name: "Blog", href: "/blog" },
        { name: "Support", href: "/client/support" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "HIPAA Compliance", href: "/hipaa" }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
      {footerSections.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{section.title}</h3>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.name}>
                {link.isExternal ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-purple-600"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-purple-600">
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SiteFooterLinks;
