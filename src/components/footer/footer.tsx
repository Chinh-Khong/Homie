
import React from "react";

const Footer = () => {
  const FOOTER_SECTIONS = [
    {
      title: "Support",
      items: [
        "Help Center",
        "HomeCover",
        "Disability Support"
      ],
    },
    {
      title: "Hosting",
      items: [
        "Homie Your Home",
        "HomeCover For Hosts",
        "Hosting Resources"
      ],
    },
    {
      title: "Homie",
      items: ["Newsroom", "New Features","Gift Cards"],
    },
  ];
  const FOOTER_LINKS = [
    { name: "Terms", href: "/terms" },
    { name: "Sitemap", href: "/sitemap" },
    { name: "Privacy", href: "/privacy" },
  ];

  const _renderItemsFooter = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 text-center justify-items-center">
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title}>
            <h3 className="text-base font-semibold text-black-900 mb-4 pb-4">
              {section.title}
            </h3>
            <ul className="flex flex-col gap-y-4">
              {section.items.map((item) => (
                <li key={item}>
                  <span className="text-base text-black-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };



  const _renderBottomSection = () => {
    return (
      <div className="border-t border-gray-200 pt-7 md:px-28 text-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <span className="text-base text-black-600">© 2025 Homie, Inc.</span>
            <span className="text-base text-black-600">·</span>
            {FOOTER_LINKS.map((item, index) => (
              <React.Fragment key={item.name}>
                <a
                  href={item.href}
                  className="text-base text-black-600 hover:text-black-900 hover:underline cursor-pointer"
                >
                  {item.name}
                </a>
                {index < FOOTER_LINKS.length - 1 && (
                  <span className="text-base text-black-600">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-black-100 border-t border-gray-200">
      <div className="md:!px-10 py-8 sm:px-6 lg:px-8 px-4">
        {_renderItemsFooter()}
        {_renderBottomSection()}
      </div>
    </footer>
  );
};

export default Footer;
