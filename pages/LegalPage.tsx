

import React from 'react';
// Fix: Using namespace import for react-router-dom to address module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';

const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    content: (
      <>
        <p className="mb-4">This is a draft Privacy Policy for the Daily Pi Mart application, created for the Pi Network Hackathon. In a real application, this would be replaced with a comprehensive legal document.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p>We collect your Pi username and user ID when you authenticate with the Pi SDK. We do not collect any other personal information without your consent.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
        <p>Your Pi user information is used to create and manage your account, process orders, and provide customer support.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
        <p>We take reasonable measures to protect your information, but no security system is impenetrable.</p>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    content: (
      <>
        <p className="mb-4">These are draft Terms of Service for the Daily Pi Mart application, created for the Pi Network Hackathon. Please review carefully before using our services.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p>By accessing or using Daily Pi Mart, you agree to be bound by these Terms.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of the Service</h2>
        <p>You may use the service only for lawful purposes. All payments are conducted on the Pi Network and are subject to its rules.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Limitation of Liability</h2>
        <p>Daily Pi Mart is provided "as is". We are not responsible for any losses or damages related to your use of the service.</p>
      </>
    ),
  },
};

const LegalPage: React.FC = () => {
  const { topic } = ReactRouterDOM.useParams<{ topic: keyof typeof legalContent }>();

  if (!topic || !legalContent[topic]) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <ReactRouterDOM.Link to="/" className="text-blue-600 hover:underline">Return to Home</ReactRouterDOM.Link>
      </div>
    );
  }

  const { title, content } = legalContent[topic];

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      <div className="prose max-w-none text-gray-700">{content}</div>
    </div>
  );
};

export default LegalPage;