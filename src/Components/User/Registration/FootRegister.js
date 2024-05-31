import React from "react";
import "./FootRegister.css";
export default function FootRegister() {
  return (
    <footer className="text-center">
      <div className="container">
        <span>
          © Copyrights {new Date().getFullYear()} all rights reserved by Kings
          Down Rewards.
        </span>
      </div>
    </footer>
  );
}
