"use client";

import React from "react";

const Privacy = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-3xl w-full px-[30px] py-14">
        <h1 className="text-2xl font-extrabold text-center text-main mb-10 pb-10">
          Privacy Policy
        </h1>

        <section className="mb-12 pb-10">
          <p className="text-base text-gray-700 leading-relaxed mb-4 text-justify">
            At <strong>Homie</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform.
          </p>
          <p className="text-base text-gray-700 leading-relaxed text-justify">
            By using Homie, you agree to the terms outlined in this Privacy Policy. If you have any questions or concerns, please contact us at <strong>support@homie.com</strong>.
          </p>
        </section>

        
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">1. Information We Collect</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700 text-justify">
            <li>
              <strong>Personal Information:</strong> Includes your name, email address, phone number, and payment details when you create an account or make a booking.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact with our platform, such as pages visited, time spent, and features used.
            </li>
            <li>
              <strong>Device Information:</strong> Includes your IP address, browser type, operating system, and device identifiers.
            </li>
            <li>
              <strong>Cookies:</strong> Small data files stored on your device to enhance your browsing experience and remember your preferences.
            </li>
          </ul>
        </section>

        
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700 text-justify">
            <li>To provide and improve our services, including processing bookings and payments.</li>
            <li>To communicate with you about your account, bookings, and updates to our platform.</li>
            <li>To personalize your experience and recommend properties or services based on your preferences.</li>
            <li>To ensure the security and integrity of our platform and prevent fraudulent activities.</li>
          </ul>
        </section>

        
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">3. Sharing Your Information</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700 text-justify">
            <li>We do not sell your personal information to third parties.</li>
            <li>
              We may share your information with trusted partners, such as payment processors and service providers, to facilitate bookings and payments.
            </li>
            <li>
              We may disclose your information if required by law or to protect the rights, property, or safety of Homie, our users, or others.
            </li>
          </ul>
        </section>

        
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">4. Your Rights</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700 text-justify">
            <li>You have the right to access, update, or delete your personal information at any time.</li>
            <li>You can opt out of receiving promotional communications by updating your preferences in your account settings.</li>
            <li>You can disable cookies in your browser settings, but this may affect your experience on our platform.</li>
          </ul>
        </section>

        
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">5. Data Security</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700 text-justify">
            <li>We implement industry-standard security measures to protect your data from unauthorized access, loss, or misuse.</li>
            <li>Access to your personal information is restricted to authorized personnel only.</li>
            <li>While we strive to protect your data, no system is completely secure, and we cannot guarantee absolute security.</li>
          </ul>
        </section>

       
        <div className="text-center text-gray-600 mt-14 pb-10">
          <p className="mb-2 text-justify">
            If you have any questions or concerns about our Privacy Policy, please contact us at <strong>support@homie.com</strong>.
          </p>
          <p className="text-justify">
            Thank you for trusting Homie. We are committed to safeguarding your privacy and providing a secure platform for your bookings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;