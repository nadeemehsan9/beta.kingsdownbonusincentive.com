import React from "react";
import { Link } from "react-router-dom";

export default function HeadTerm() {
  return (
    <section className="main-ban sliding-bg">
      <div className="container">
        <header className="main-header">
          <nav className="navbar navbar-expand-lg navbar-light flex-column">
            <Link className="navbar-brand" to="/">
              <img src="/images/forgotHeeadLogo.png" className="img-fluid" alt="" />
            </Link>
          </nav>
        </header>
      </div>
    </section>
  );
}
