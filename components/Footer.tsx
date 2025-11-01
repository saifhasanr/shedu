
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm text-accent">
          <p>&copy; {new Date().getFullYear()} SH AI Academy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
