import React, { useState } from "react";
import "./PrivacyPolicy.css";
import Footer from "../User/Include/Footer";
import Header from "../User/Include/Header";
import { Helmet } from "react-helmet";
function PrivacyPolicy() {
  const TITLE = "Kings Down | Privacy Policy";
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <div className="user-panel">
        <section className="main-ban page-heading">
          <div className="container">
            <Header />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="gen-hed">
                  PRIVACY <span className="slide-heading">POLICY</span>
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className="claims-part">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {/* <h2 className="gen-hed">
                  PRIVACY <span>POLICY</span>
                </h2> */}
                <div className="col-md-12">
                  <div className="whitebg-box">
                    <div className="p-policy">
                      <h5>What information do we collect?</h5>
                      <p>
                        We collect information from you when you register on our
                        site, place an order, fill out a form, take an online
                        course or report a sale.
                      </p>
                      <p>
                        When ordering or registering on our site, you may be
                        asked to enter your name, e-mail address or mailing
                        address.
                      </p>

                      <h5>What do we use your information for? </h5>
                      <p>
                        Any of the information we collect from you may be used
                        in one of the following ways:{" "}
                      </p>
                      <ul>
                        <li className="circle2">
                          {" "}
                          To personalize your experience
                        </li>
                        (your information helps us to better respond to your
                        individual needs)
                        <li className="circle2"> To improve our website</li>
                        (we continually strive to improve our website offerings
                        based on the information and feedback we receive from
                        you)
                        <li className="circle2">
                          {" "}
                          To improve customer service
                        </li>
                        (your information helps us to more effectively respond
                        to your customer service requests and support needs)
                        <li className="circle2"> To process transactions</li>
                        Your information, whether public or private, will not be
                        sold, exchanged, transferred, or given to any other
                        company for any reason whatsoever, without your consent,
                        other than for the express purpose of delivering the
                        purchased product or service requested.
                        <li className="circle2">
                          {" "}
                          To administer a contest, promotion, survey or other
                          site feature
                        </li>
                        <li className="circle2"> To send periodic emails</li>
                      </ul>
                      <p>
                        The email address you provide may be used to send you
                        information, respond to inquiries, and/or other requests
                        or questions.
                      </p>
                      <p>
                        <b className="text-danger">Note:</b> If at any time you
                        would like to unsubscribe from receiving future emails,
                        we include detailed unsubscribe instructions at the
                        bottom of each email.
                      </p>
                      <h5>How do we protect your information?</h5>
                      <p>
                        We implement a variety of security measures to maintain
                        the safety of your personal information when you enter,
                        submit, or access your personal information.{" "}
                      </p>
                      <h5>Do we use cookies?</h5>
                      <p>
                        Yes (Cookies are small files that a site or its service
                        provider transfers to your computers hard drive through
                        your Web browser (if you allow) that enables the sites
                        or service providers systems to recognize your browser
                        and capture and remember certain information.
                      </p>
                      <p>
                        We use cookies to understand and save your preferences
                        for future visits.
                      </p>
                      <h5>
                        Do we disclose any information to outside parties?
                      </h5>
                      <p>
                        We do not sell, trade, or otherwise transfer to outside
                        parties your personally identifiable information. This
                        does not include trusted third parties who assist us in
                        operating our website, conducting our business, or
                        servicing you, so long as those parties agree to keep
                        this information confidential.{" "}
                      </p>
                      <h5>
                        California Online Privacy Protection Act Compliance
                      </h5>
                      <p>
                        Because we value your privacy we have taken the
                        necessary precautions to be in compliance with the
                        California Online Privacy Protection Act. We therefore
                        will not distribute your personal information to outside
                        parties without your consent.
                      </p>
                      <p>
                        As part of the California Online Privacy Protection Act,
                        all users of our site may make any changes to their
                        information at anytime by logging into their control
                        panel and going to the 'Edit Profile' page.
                      </p>
                      <h5>
                        Childrens Online Privacy Protection Act Compliance
                      </h5>
                      <p>
                        We are in compliance with the requirements of COPPA
                        (Childrens Online Privacy Protection Act), we do not
                        collect any information from anyone under 13 years of
                        age. Our website, products and services are all directed
                        to people who are at least 13 years old or older.
                      </p>
                      <h5>Online Privacy Policy Only </h5>
                      <p>
                        This online privacy policy applies only to information
                        collected through our website and not to information
                        collected offline.
                      </p>
                      <h5>Your Consent</h5>
                      <p>
                        By using our site, you consent to our online privacy
                        policy.
                      </p>
                      <h5>Changes to our Privacy Policy </h5>
                      <p>
                        If we decide to change our privacy policy, we will post
                        those changes on this page, and/or update the Privacy
                        Policy modification date below.
                      </p>
                      <p>This policy was last modified on 6/30/2011</p>
                      <h5>Contacting Us</h5>
                      <p>
                        If there are any questions regarding this privacy policy
                        you may contact us using the information below.
                      </p>
                      <p>
                        <a href="https://eliterewards.biz">eliterewards.biz</a>
                      </p>
                      <p>
                        E-mail:{" "}
                        <a href="mailto: customercare@eliterewards.biz">
                          customercare@eliterewards.biz
                        </a>
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
