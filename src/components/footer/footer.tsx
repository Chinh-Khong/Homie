import { IMAGE_URL } from "@/public";
import React from "react";

const Footer = () => {

  const FOOTER_SECTIONS = [
    {
      title: "Support",
      items: [
        "Help Center",
        "HomeCover",
        "Anti-discrimination",
        "Disability support",
        "Cancellation options",
        "Report neighborhood concern",
      ],
    },
    {
      title: "Hosting",
      items: [
        "Homie your home",
        "HomeCover for Hosts",
        "Hosting resources",
        "Community forum",
        "Hosting responsibly",
        "Homie-friendly apartments",
        "Join a free Hosting class",
        "Find a co-host",
      ],
    },
    {
      title: "Homie",
      items: [
        "Newsroom",
        "New features",
        "Careers",
        "Investors",
        "Gift cards",
        "Homie.org emergency stays",
      ],
    },
  ];
  const FOOTER_LINKS = ["Terms", "Sitemap", "Privacy", "Your Privacy Choices"];

  const _renderItemsFooter = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 md:flex md:justify-between lg:px-28">
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title}>
            <h3 className="text-base font-semibold text-black-900 mb-4 pb-4">
              {section.title}
            </h3>
            <ul className="flex flex-col gap-y-4">
              {section.items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-base text-black-600 hover:text-black-900 hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const _renderItemHotline = (url: string, src: string, alt: string) => (
    <a href={url} className="text-gray-900">
      <img
        src={src}
        alt={alt}
        className="w-7 h-7 object-contain"
      />
    </a>
  );

  const _renderBottomSection = () => {
    return (
      <div className="border-t border-gray-200 pt-8 md:px-28">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4 md:mb-0">
            <span className="text-base text-black-600">
              © 2025 Homie, Inc.
            </span>
            <span className="text-base text-black-600">·</span>
            {FOOTER_LINKS.map((item, index) => (
              <React.Fragment key={item}>
                <a
                  className="text-base text-black-600 hover:text-black-900 hover:underline cursor-pointer"
                >
                  {item}
                </a>
                {index < FOOTER_LINKS.length - 1 && <span className="text-base text-black-600">·</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center gap-x-8">
            <div className="flex items-center">
              <div className="flex gap-x-2 items-center p-1 hover:border-gray-300 hover:bg-gray-100 hover:rounded">
                <span className="text-gray-900">🌐</span>
                <span className="text-base text-gray-900 font-semibold cursor-pointer">
                  English (US)
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex gap-x-2 items-center p-1 hover:border-gray-300 hover:bg-gray-100 hover:rounded">
                <span className="text-gray-900 font-semibold cursor-pointer">
                  đ
                </span>
                <span className="text-base text-gray-900 font-semibold cursor-pointer">
                  VND
                </span>
              </div>
            </div>
            <div className="flex gap-x-2">
              {_renderItemHotline('#', IMAGE_URL.FACEBOOK, 'Facebook')}
              {_renderItemHotline('#', IMAGE_URL.TWITTER, 'LinkedIn')}
              {_renderItemHotline('#', IMAGE_URL.INSTAGRAM, 'Instagram')}
            </div>
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
