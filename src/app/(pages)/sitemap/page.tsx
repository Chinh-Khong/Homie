"use client";

import React from "react";

const Sitemap = () => {
  return (
    <div className="flex justify-center items-center text-justify">
      <div className="max-w-3xl w-full px-[30px] py-14">
        <h1 className="text-2xl font-extrabold text-center text-main mb-10 pb-10">
          Sitemap
        </h1>

        <section className="mb-12 pb-10">
          <p className="text-base text-gray-700 leading-relaxed mb-4 text-justify">
            Welcome to the <strong>Homie Sitemap</strong>. This page is designed to help you navigate through our platform with ease. Below, you'll find a list of key sections and features available on our website.
          </p>
          <p className="text-base text-gray-700 leading-relaxed text-justify">
            Use the links and descriptions below to quickly access the information or services you need.
          </p>
        </section>

        
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">1. Main Sections</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700 text-justify">
            <li>
              <strong>Home:</strong> Start your journey with Homie and explore our featured properties and services.
            </li>
            <li>
              <strong>Support:</strong> Access our Help Center to find answers to your questions or get assistance with bookings.
            </li>
            <li>
              <strong>Hosting:</strong> Learn how to list your property, manage bookings, and become a successful host.
            </li>
            <li>
              <strong>Newsroom:</strong> Stay updated with the latest news, features, and announcements from Homie.
            </li>
          </ul>
        </section>

      
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">2. User Resources</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700 text-justify">
            <li>
              <strong>Account Management:</strong> Update your profile, manage your bookings, and view your transaction history.
            </li>
            <li>
              <strong>Payment Options:</strong> Learn about the payment methods we accept and how to manage your payment preferences.
            </li>
            <li>
              <strong>Cancellation Policies:</strong> Understand our cancellation policies and how refunds are processed.
            </li>
            <li>
              <strong>FAQs:</strong> Browse frequently asked questions for quick answers to common inquiries.
            </li>
          </ul>
        </section>

        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">3. Hosting Resources</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700 text-justify">
            <li>
              <strong>List Your Property:</strong> Step-by-step guide to listing your property on Homie.
            </li>
            <li>
              <strong>Host Dashboard:</strong> Manage your listings, view bookings, and communicate with guests.
            </li>
            <li>
              <strong>Hosting Tips:</strong> Learn best practices for providing a great experience for your guests.
            </li>
            <li>
              <strong>Host Support:</strong> Access resources and support specifically for Homie hosts.
            </li>
          </ul>
        </section>

      
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">4. Legal and Policies</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700 text-justify">
            <li>
              <strong>Terms and Conditions:</strong> Review the terms and conditions for using our platform.
            </li>
            <li>
              <strong>Privacy Policy:</strong> Learn how we handle your personal data and protect your privacy.
            </li>
            <li>
              <strong>Community Guidelines:</strong> Understand the rules and expectations for all users of our platform.
            </li>
            <li>
              <strong>Refund Policy:</strong> Details on how refunds are processed for cancellations and disputes.
            </li>
          </ul>
        </section>

       
        <div className="text-center text-gray-600 mt-14 pb-10">
          <p className="mb-2">
            If you have any questions regarding our Terms and Conditions, feel free to reach out to us at <strong>support@homie.com</strong>.
          </p>
          <p>Thank you for choosing Homie — Your trusted platform for booking a stay!</p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;