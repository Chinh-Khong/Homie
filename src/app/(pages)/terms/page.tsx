"use client";

import React from "react";

const Terms = () => {
  return (
    <div className="flex justify-center items-center text-justify">
      <div className="max-w-3xl w-full px-[30px] py-14">
        <h1 className="text-2xl font-extrabold text-center text-main mb-10 pb-10">
          Terms and Conditions
        </h1>

        <section className="mb-12 pb-10">
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Welcome to <strong>Homie</strong>. By accessing or using our platform, you agree to be bound by these Terms and Conditions. These terms apply to all users of our services including but not limited to visitors, guests, hosts, and administrators.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Please read these terms carefully. If you do not agree with any part of the terms, you must not use our platform.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">1. User Eligibility</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700">
            <li>Users must be at least 18 years old to create an account and make bookings.</li>
            <li>You must provide accurate and complete information during registration and booking.</li>
            <li>You are responsible for maintaining the security and confidentiality of your account login credentials.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">2. Bookings and Payments</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700">
            <li>All bookings are subject to availability and host confirmation.</li>
            <li>Payments must be made in accordance with the room's listed pricing and payment methods.</li>
            <li>Cancellations and refunds are handled according to the property's cancellation policy displayed at the time of booking.</li>
            <li>Homie reserves the right to refuse or cancel any booking if fraud or misuse is suspected.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">3. Code of Conduct</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700">
            <li>Users must treat other members with respect and courtesy.</li>
            <li>Illegal, harmful, or abusive behavior will not be tolerated.</li>
            <li>Hosts must provide accommodations as described and in a clean, safe condition.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-10 pb-10">
          <h2 className="text-11xl font-semibold mb-4">4. Privacy and Data Usage</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700">
            <li>We collect and process personal data according to our Privacy Policy.</li>
            <li>Information such as name, email, and booking history may be stored securely on our servers.</li>
            <li>We do not sell user data to third parties without explicit consent.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-10 pb-10">
          <h2 className="text-1xl font-semibold mb-4">5. Changes and Termination</h2>
          <ul className="list-disc pl-10 space-y-3 text-gray-700">
            <li>We may update or modify these terms at any time with or without prior notice.</li>
            <li>Accounts may be suspended or terminated if users violate these terms or engage in prohibited activities.</li>
            <li>Upon termination, your access to Homie and related services will be revoked.</li>
          </ul>
        </section>

        {/* Contact */}
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

export default Terms;