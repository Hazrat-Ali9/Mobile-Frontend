import React from "react";
import { Link } from "react-router-dom";

// footer

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center mt-10 p-10 bg-base-100 border-t text-base-content rounded">
        <div className="grid grid-flow-col gap-4">
          <Link to="/" className="link link-hover">
            About us
          </Link>
          <Link to={"/"} className="link link-hover">
            Contact
          </Link>
          <Link to={"/"} className="link link-hover">
            Jobs
          </Link>
          <Link to={"/"} className="link link-hover">
            Press kit
          </Link>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a href="https://twitter.com/HazratLM" target="_blank" rel="noreferrer">
              <i className="fa-brands text-2xl fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/in/hazratali9/" target="_blank" rel="noreferrer">
              <i className="fa-brands text-2xl fa-linkedin"></i>
            </a>
            <a href="https://www.facebook.com/HAZRATALIML" target="_blank" rel="noreferrer">
              <i className="fa-brands text-2xl fa-facebook-f"></i>
            </a>
          </div>
        </div>
        <div>
          <p>Copyright @ 2025-All Right Reserved By Hazrat Ali</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
