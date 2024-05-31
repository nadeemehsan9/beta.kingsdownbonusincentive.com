import React from "react";
import { Link } from "react-router-dom";
import "./HeadRegister.css";

export default function HeadRegister() {
  return (
    <section className="main-ban sliding-bg">
      <div className="container">
        <header className="main-header">
          <nav className="navbar navbar-expand-lg navbar-light flex-column">
            <Link className="navbar-brand" to="/">
              <img
                src="/images/forgotHeeadLogo.png"
                className="img-fluid"
                alt=""
              />
            </Link>
            <div className="alred-memb">
              Already a member?
              <Link className="round-red-btn" to="/">
                LOGIN
              </Link>
            </div>
          </nav>
        </header>
      </div>
    </section>
  );
}
