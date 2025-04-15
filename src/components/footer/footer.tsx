import React from "react";
export const IMAGE_URL = {
  FACEBOOK: "./img/facebook.jpg",
  TWITTER: "./img/twitter.jpg",
  INSTAGRAM: "./img/instagram.jpg",
};
// src/components/footer.tsx
const Footer = () => {
  const _renderItemsFooter = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 pl-22">
        {/* Support Column */}
        <div>
          <h3 className="text-base font-semibold text-black-900 mb-4 pb-4">
            Support
          </h3>
          <ul className="flex flex-col gap-y-4">
            {[
              "Help Center",
              "HomeCover",
              "Anti-discrimination",
              "Disability support",
              "Cancellation options",
              "Report neighborhood concern",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-base text-black-600 gap-y-16 hover:text-black-900 hover:underline"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hosting Column */}
        <div>
          <h3 className="text-base font-semibold text-black-900 mb-4 pb-4">
            Hosting
          </h3>
          <ul className="flex flex-col gap-y-4">
            {[
              "Homie your home",
              "HomeCover for Hosts",
              "Hosting resources",
              "Community forum",
              "Hosting responsibly",
              "Homie-friendly apartments",
              "Join a free Hosting class",
              "Find a co-host",
            ].map((item) => (
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

        {/* Homie Column */}
        <div>
          <h3 className="text-base font-semibold text-black-900 mb-4 pb-4">
            Homie
          </h3>
          <ul className="flex flex-col gap-y-4">
            {[
              "Newsroom",
              "New features",
              "Careers",
              "Investors",
              "Gift cards",
              "Homie.org emergency stays",
            ].map((item) => (
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
      </div>
    );
  };

  const _renderBottomSection = () => {
    return (
      <div className="mt-12 border-t border-gray-200 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4 md:mb-0">
            <span className="text-base text-black-600">
              © 2025 Homie, Inc.
            </span>
            <span className="text-base text-black-600">·</span>
            {["Terms", "Sitemap", "Privacy", "Your Privacy Choices"].map(
              (item, index) => (
                <React.Fragment key={item}>
                  <a
                    href="#"
                    className="text-base text-black-600 hover:text-black-900 hover:underline cursor-pointer"
                  >
                    {item}
                  </a>
                  {index < 3 && (
                    <span className="text-base text-black-600">·</span>
                  )}
                </React.Fragment>
              )
            )}
          </div>
          <div className="flex items-center gap-x-8">
            {/* Language Section */}
            <div className="flex items-center">
              <div className="flex gap-x-2 items-center p-1 hover:border-gray-300 hover:bg-gray-100 hover:rounded">
                <span className="text-gray-900">🌐</span>
                <span className="text-base text-gray-900 font-semibold cursor-pointer">
                  English (US)
                </span>
              </div>
            </div>

            {/* Currency Section */}
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

            {/* Social Media Icons */}
            <div className="flex gap-x-2">
              <a href="#" className="text-gray-900">
                <img
                  src={IMAGE_URL.FACEBOOK}
                  alt="Facebook"
                  className="w-7 h-7 object-contain"
                />
              </a>
              <a href="#" className="text-gray-900">
                <img
                  src={IMAGE_URL.TWITTER}
                  alt="Twitter"
                  className="w-7 h-7 object-contain"
                />
              </a>
              <a href="#" className="text-gray-900">
                <img
                  src={IMAGE_URL.INSTAGRAM}
                  alt="Instagram"
                  className="w-7 h-7 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component chính
  return (
    <footer className="bg-black-100 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        {_renderItemsFooter()}

        {/* Bottom Section */}
        {_renderBottomSection()}
      </div>
    </footer>
  );
};

export default Footer;
