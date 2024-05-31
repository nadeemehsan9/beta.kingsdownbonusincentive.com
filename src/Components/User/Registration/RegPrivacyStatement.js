import React, { useState } from "react";
import ToTop from "../Include/ToTop";
import FootRegister from "./FootRegister";
import HeadTerm from "./HeadTerm";
import "./RegPrivacyStatement.css";
import { Helmet } from "react-helmet";
function RegPrivacyStatement() {
  const [loading, setLoading] = useState(false);
  const TITLE = "Kings Down | Privacy Statement";

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      {/* <div className="user-panel"> */}
      <div className="pad-bot">
        <ToTop />
        <HeadTerm />
        <section className="slide-up register">
          <div className="container">
            <div className="slides-here">
              <h2 className="slide-heading" id="register">
                <span>PRIVACY </span>STATEMENT
              </h2>
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
                  <div className="Whitebg-box" id="TermBox">
                    <div className="p-policy">
                      <h4>ELITE REWARDS PRIVACY STATEMENT</h4>
                      <b>Site Security Features</b>
                      <p>
                        Elite Rewards (ER) realizes how important security is to
                        our clients and to their participants, so we’ve taken a
                        number of steps to enhance the protection of personal or
                        confidential information sent to or from ER or in
                        accessing information resident at ER. This includes
                        username, password, and any debit card information.
                        First, we require unique usernames and password
                        establishment that are not easily determined by someone
                        other than the intended participant. This requirement
                        protects personal information and access to personal
                        earnings that are available for redemption.
                      </p>

                      <b>SSL Technology</b>
                      <p>
                        ER requires that a “secure session” is established,
                        using Secure Socket Layer (SSL) technology. This is done
                        anytime a participant supplies ER with personal or
                        confidential information in one of the secure areas of a
                        website.
                      </p>
                      <p>
                        SSL technology creates a private conversation that only
                        the participant’s computer and ER can understand. The
                        SSL technology encodes information as it is being sent
                        over the Internet between the participant’s computer and
                        ER’s system helping to ensure that the transmitted
                        information remains confidential.
                      </p>
                      <p>
                        The use of SSL requires two components: and
                        SSL-compatible browser and a Web server to perform
                        “key-exchange” that establishes a secure connection to
                        ER web servers.
                      </p>

                      <b>Social Security Number (SSN)</b>
                      <p>Social security number (SSN) is used for tax paying</p>

                      <b>Browser Compliance</b>
                      <p>
                        Participants and client will need a browser with SSL
                        capabilities. Examples of SSL browsers include,
                        Microsoft’s Internet Explorer, Firefox, Chrome and
                        Safari. If a participant does not have a browser with
                        SSL capabilities, the participant can download an SSL
                        browser from the above mentioned SSL browser list and
                        will be required in order to securely access personal or
                        confidential information via the Internet. ER codes
                        sites to current browser version minus 1. ER recommends
                        the use of the latest browser versions available.
                        Accessing secure online areas requires SSL capable
                        browsers due to security concerns.{" "}
                      </p>
                      <b>ISP Compliance</b>
                      <p>
                        Nearly all Internet Service Providers (ISPs)
                        automatically enable the SSL session described above. If
                        a participant or a client contact uses their company's
                        internal connection to access the Internet they may find
                        they cannot access the ER secure pages with an SSL
                        browser described above, the company may be blocking
                        access via a "firewall." The company’s Internet access
                        systems administrator would have to be contacted for
                        further details on Internet access.{" "}
                      </p>
                      <b>Cookies</b>
                      <p>
                        A participant or client must have enabled cookies on
                        their browser in order to access confidential
                        information. If they have chosen to disable cookies on
                        their browser, they will not be able to access
                        confidential information.
                      </p>

                      <b>User ID and Password </b>
                      <p>
                        Access to all ER sites require the use of a Username and
                        Password as a security measure that helps protect
                        confidential information. This allows ER to verify who
                        is accessing the site, thereby allowing access to
                        account information, and preventing unauthorized access.{" "}
                      </p>
                      <p>
                        In establishing unique Username and Password, the
                        following criteria should be adhered to:
                      </p>
                      <ul>
                        <li className="circle1">
                          {" "}
                          The Username and Password cannot be the same (e.g.
                          password / password)
                        </li>
                        <li className="circle1">
                          {" "}
                          The Username and Password must be at least six (6)
                          characters in length.
                        </li>
                        <li className="circle1">
                          {" "}
                          Commonly used configurations or easily determined
                          schema should not be used (e.g. 123456 / 654321)
                        </li>
                        <li className="circle1">
                          {" "}
                          Usernames and Passwords should be personally protected
                          the same way debit or debit card PINs are treated.
                        </li>
                      </ul>
                      <p>
                        Non-compliance with these criteria may permit others to
                        access the account and create mis-redemptions or fraud.
                        ER is not liable for accounts that do not adhere to
                        these criteria.
                      </p>
                      <p>
                        You should be aware that browser software often "caches"
                        a page as you look at it, meaning that some pages are
                        saved in your computer's temporary memory. Therefore,
                        you may find that clicking on your "Back" button shows
                        you a saved version of a previously viewed page. Caching
                        in no way affects the security of your confidential
                        Username or Password. If a participant or client uses a
                        computer in a public place to access account
                        information, they should simply quit/exit the browser
                        software before leaving to minimize the possibility of
                        anyone else viewing their confidential information.{" "}
                      </p>
                      <b>Third Party Use</b>
                      <p>
                        ER does not sell, trade or rent personal information to
                        third parties. We do, however, share your shipping
                        information with our suppliers for the sole purpose of
                        delivering your redemption items.
                      </p>
                      <b>Secure Password Guidelines</b>
                      <p>
                        The combination of username and password define the
                        identity of users on a system. Adopting a{" "}
                        <b>
                          good personal password policy is the most important
                          barrier to unauthorized access
                        </b>{" "}
                        in current systems.{" "}
                      </p>
                      <p>Password Content</p>
                      <ul>
                        <li className="circle1">
                          {" "}
                          Mixture of numbers, capital letters, small letters,
                          punctuation.
                        </li>
                        <li className="circle1">
                          {" "}
                          Easy to remember (don't need to write it down).
                        </li>
                        <li className="circle1">
                          {" "}
                          Easy to type quickly (difficult for an observer).
                        </li>
                        <li className="circle1">
                          {" "}
                          Minimum acceptable format is six (6) characters in
                          length.
                        </li>
                      </ul>

                      <p>Examples</p>
                      <ul>
                        <li className="circle1">
                          {" "}
                          Choose a line or two of a poem, song etc. and use just
                          the first letters.
                        </li>
                        <li className="circle1">
                          {" "}
                          Join two small words with a strange character.
                        </li>
                        <li className="circle1"> Invent an acronym. </li>
                      </ul>

                      <p>
                        Password cracking software is fairly advanced and in a
                        lot of cases relies on a users habit of choosing
                        insecure passwords. Here are some common habits that
                        should be avoided. Bad examples
                      </p>
                      <ul>
                        <li className="circle1">
                          {" "}
                          Name of your spouse, parent, colleague, friend, pet,
                          towns, months, days.
                        </li>
                        <li className="circle1">
                          {" "}
                          Number of car/motorbike registration, telephone.
                        </li>
                        <li className="circle1">
                          {" "}
                          Common dictionary words (French, German, English,
                          Italian etc).
                        </li>
                        <li className="circle1">
                          {" "}
                          A series of identical numbers/letters.
                        </li>
                        <li className="circle1">
                          {" "}
                          Obvious keyboard sequences.
                        </li>
                        <li className="circle1">
                          {" "}
                          Any of the above in inverse or with a number before or
                          after.
                        </li>
                      </ul>
                      <b>Guidelines</b>
                      <ul>
                        <li className="circle1">
                          {" "}
                          Don't write it down, or disclose via email.
                        </li>
                        <li className="circle1">
                          {" "}
                          Default passwords should not be used.
                        </li>
                        <li className="circle1">
                          {" "}
                          Don't give your password to others.
                        </li>
                        <li className="circle1">
                          {" "}
                          If passwords are disclosed on a system, change them
                          immediately.
                        </li>
                        <li className="circle1">
                          {" "}
                          Always change a default password.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FootRegister />
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default RegPrivacyStatement;
