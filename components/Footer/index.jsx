import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-layout">
          <div className="logo">
            <img src="/logo-white.png" alt="Logo" />
          </div>
          <div className="links">
            <div className="column">
                <span>Pages</span>
              <a href="/">Home</a>
              <a href="/">Contact</a>
              <a href="/poems">Poems</a>
              <a href="/haiku-wallpapers">Wallpapers</a>
            </div>
            <div className="column">
                <span>Socials</span>
              <a href="/">Whatsapp</a>
              <a href="/">Instagram</a>
            </div>
            <div className="column">
                <span>Contact</span>
              <a href="/link4">09158534855</a>
              <a href="mailto:john.emmanuel@mawshalproverbs.com">john.emmanuel@mawshalproverbs.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
