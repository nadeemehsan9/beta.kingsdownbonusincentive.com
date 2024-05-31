import React, { useState } from "react";
import ToTop from "../Include/ToTop";
import FootRegister from "./FootRegister";
import HeadTerm from "./HeadTerm";
import "./TermCondition.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
function TermCondition() {
  const [loading, setLoading] = useState(false);
  const TITLE = "Kings Down | Terms And Conditions";

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
                <span>TERMS AND </span>CONDITIONS
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
                      <h4>Agreement between user and Elite Marketing</h4>
                      <p>
                        Welcome to Elite Marketing. The
                        kingsdownbonusincentive.com website (the "Site") is
                        comprised of various web pages operated by Elite
                        Marketing and is offered to you conditioned on your
                        acceptance without modification of the terms,
                        conditions, and notices contained herein (the "Terms").
                        Your use of kingsdownbonusincentive.com constitutes your
                        agreement to all such Terms. Please read these terms
                        carefully, and keep a copy of them for your reference.
                      </p>
                      <p>
                        <a href="/">www.kingsdownbonusincentive.com</a> is a
                        spiff submission site.
                      </p>
                      <h4>Privacy</h4>
                      <p>
                        Your use of kingsdownbonusincentive.com is subject to
                        Elite Marketing's Privacy Policy. Please review our
                        Privacy Policy, which also governs the Site and informs
                        users of our data collection practices.
                      </p>
                      <h4>Electronic Communications</h4>
                      <p>
                        Visiting kingsdownbonusincentive.com or sending emails
                        to Elite Marketing constitutes electronic
                        communications. You consent to receive electronic
                        communications and you agree that all agreements,
                        notices, disclosures and other communications that we
                        provide to you electronically, via email and on the
                        Site, satisfy any legal requirement that such
                        communications be in writing.
                      </p>
                      <h4>Your account</h4>
                      <p>
                        If you use this site, you are responsible for
                        maintaining the confidentiality of your account and
                        password and for restricting access to your computer,
                        and you agree to accept responsibility for all
                        activities that occur under your account or password.
                        You may not assign or otherwise transfer your account to
                        any other person or entity. You acknowledge that Kings
                        Down or Elite Marketing are not responsible for third
                        party access to your account that results from theft or
                        misappropriation of your account. Kings Down or Elite
                        Marketing and its associates reserve the right to refuse
                        or cancel service, terminate accounts, or remove or edit
                        content in our sole discretion.
                      </p>
                      <p>
                        Elite Marketing does not knowingly collect, either
                        online or offline, personal information from persons
                        under the age of thirteen. If you are under 18, you may
                        use kingsdownbonusincentive.com only with permission of
                        a parent or guardian.
                      </p>
                      <h4>
                        No unlawful or prohibited use/Intellectual Property
                      </h4>
                      <p>
                        You are granted a non-exclusive, non-transferable,
                        revocable license to access and use{" "}
                        <a href="/">www.kingsdownbonusincentive.com</a> strictly
                        in accordance with these terms of use. As a condition of
                        your use of the Site, you warrant to Elite Marketing
                        that you will not use the Site for any purpose that is
                        unlawful or prohibited by these Terms. You may not use
                        the Site in any manner which could damage, disable,
                        overburden, or impair the Site or interfere with any
                        other party's use and enjoyment of the Site. You may not
                        obtain or attempt to obtain any materials or information
                        through any means not intentionally made available or
                        provided for through the Site.
                      </p>
                      <p>
                        All content included as part of the Service, such as
                        text, graphics, logos, images, as well as the
                        compilation thereof, and any software used on the Site,
                        is the property of Elite Marketing or its suppliers and
                        protected by copyright and other laws that protect
                        intellectual property and proprietary rights. You agree
                        to observe and abide by all copyright and other
                        proprietary notices, legends or other restrictions
                        contained in any such content and will not make any
                        changes thereto. You will not modify, publish, transmit,
                        reverse engineer, participate in the transfer or sale,
                        create derivative works, or in any way exploit any of
                        the content, in whole or in part, found on the Site.
                        www.kingsdownbonusincentive.com content is not for
                        resale. Your use of the Site does not entitle you to
                        make any unauthorized use of any protected content, and
                        in particular you will not delete or alter any
                        proprietary rights or attribution notices in any
                        content. You will use protected content solely for your
                        personal use, and will make no other use of the content
                        without the express written permission of Elite
                        Marketing and the copyright owner. You agree that you do
                        not acquire any ownership rights in any protected
                        content. We do not grant you any licenses, express or
                        implied, to the intellectual property of Elite Marketing
                        or our licensors except as expressly authorized by these
                        Terms.
                      </p>
                      <h4>International Users</h4>
                      <p>
                        The Service is controlled, operated and administered by
                        Elite Marketing from our offices within the USA. If you
                        access the Service from a location outside the USA, you
                        are responsible for compliance with all local laws. You
                        agree that you will not use the Elite Marketing content
                        accessed through{" "}
                        <Link to="/term-and-conditions">
                          www.kingsdownbonusincentive.com{" "}
                        </Link>
                        in any country or in any manner prohibited by any
                        applicable laws, restrictions or regulations.
                      </p>
                      <h4>Indemnification</h4>
                      <p>
                        You agree to indemnify, defend and hold harmless Elite
                        Marketing, its officers, directors, employees, agents
                        and third parties, for any losses, costs, liabilities
                        and expenses (including reasonable attorney's fees)
                        relating to or arising out of your use of or inability
                        to use the Site or services, any user postings made by
                        you, your violation of any terms of this Agreement or
                        your violation of any rights of a third party, or your
                        violation of any applicable laws, rules or regulations.
                        Elite Marketing reserves the right, at its own cost, to
                        assume the exclusive defense and control of any matter
                        otherwise subject to indemnification by you, in which
                        event you will fully cooperate with Elite Marketing in
                        asserting any available defenses.
                      </p>
                      <p>
                        Arbitration In the event the parties are not able to
                        resolve any dispute between them arising out of or
                        concerning these Terms and Conditions, or any provisions
                        hereof, whether in contract, tort, or otherwise at law
                        or in equity for damages or any other relief, then such
                        dispute shall be resolved only by final and binding
                        arbitration pursuant to the Federal Arbitration Act,
                        conducted by a single neutral arbitrator and
                        administered by the American Arbitration Association, or
                        a similar arbitration service selected by the parties,
                        in a location mutually agreed upon by the parties. The
                        arbitrators award shall be final, and judgment may be
                        entered upon it in any court having jurisdiction. In the
                        event that any legal or equitable action, proceeding or
                        arbitration arises out of or concerns these Terms and
                        Conditions, the prevailing party shall be entitled to
                        recover its costs and reasonable attorney's fees. The
                        parties agree to arbitrate all disputes and claims in
                        regards to these Terms and Conditions or any disputes
                        arising as a result of these Terms and Conditions,
                        whether directly or indirectly, including Tort claims
                        that are a result of these Terms and Conditions. The
                        parties agree that the Federal Arbitration Act governs
                        the interpretation and enforcement of this provision.
                        The entire dispute, including the scope and
                        enforceability of this arbitration provision shall be
                        determined by the Arbitrator. This arbitration provision
                        shall survive the termination of these Terms and
                        Conditions.
                      </p>
                      <p>
                        Class Action Waiver Any arbitration under these Terms
                        and Conditions will take place on an individual basis;
                        class arbitrations and class/representative/collective
                        actions are not permitted. THE PARTIES AGREE THAT A
                        PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN EACH'S
                        INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS
                        MEMBER IN ANY PUTATIVE CLASS, COLLECTIVE AND/ OR
                        REPRESENTATIVE PROCEEDING, SUCH AS IN THE FORM OF A
                        PRIVATE ATTORNEY GENERAL ACTION AGAINST THE OTHER.
                        Further, unless both you and Employer agree otherwise,
                        the arbitrator may not consolidate more than one
                        person's claims, and may not otherwise preside over any
                        form of a representative or class proceeding.
                      </p>
                      <h4>Liability disclaimer</h4>
                      <p>
                        THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES
                        INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE
                        INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE
                        PERIODICALLY ADDED TO THE INFORMATION HEREIN. ELITE
                        MARKETING AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS
                        AND/OR CHANGES IN THE SITE AT ANY TIME.
                      </p>
                      <p>
                        ELITE MARKETING AND/OR ITS SUPPLIERS MAKE NO
                        REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY,
                        AVAILABILITY, TIMELINESS, AND ACCURACY OF THE
                        INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED
                        GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE
                        MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH
                        INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED
                        GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY OR
                        CONDITION OF ANY KIND. ELITE MARKETING AND/OR ITS
                        SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS
                        WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS,
                        SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED
                        WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR
                        A PARTICULAR PURPOSE, TITLE AND NONINFRINGEMENT.
                      </p>
                      <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO
                        EVENT SHALLELITE MARKETING AND/OR ITS SUPPLIERS BE
                        LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL,
                        SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER
                        INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE,
                        DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED
                        WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY
                        OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE
                        PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY
                        INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED
                        GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING
                        OUT OF THE USE OF THE SITE, WHETHER BASED ON CONTRACT,
                        TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF
                        ELITE MARKETING OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED
                        OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME
                        STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR
                        LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL
                        DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF
                        YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR
                        WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE
                        REMEDY IS TO DISCONTINUE USING THE SITE.
                      </p>
                      <h4>Termination/access restriction</h4>
                      <p>
                        Elite Marketing and Kings Down reserve the right, in its
                        sole discretion, to terminate your access to the Site
                        and the related services or any portion thereof at any
                        time, without notice. To the maximum extent permitted by
                        law, this agreement is governed by applicable state laws
                        and you hereby consent to the exclusive jurisdiction in
                        all disputes arising out of or relating to the use of
                        the Site. Use of the Site is unauthorized in any
                        jurisdiction that does not give effect to all provisions
                        of these Terms, including, without limitation, this
                        section.
                      </p>
                      <p>
                        You agree that no joint venture, partnership,
                        employment, or agency relationship exists between you
                        and Elite Marketing as a result of this agreement or use
                        of the Site. Elite Marketing's performance of this
                        agreement is subject to existing laws and legal process,
                        and nothing contained in this agreement is in derogation
                        of Elite Marketing's right to comply with governmental,
                        court and law enforcement requests or requirements
                        relating to your use of the Site or information provided
                        to or gathered by Elite Marketing with respect to such
                        use. If any part of this agreement is determined to be
                        invalid or unenforceable pursuant to applicable law
                        including, but not limited to, the warranty disclaimers
                        and liability limitations set forth above, then the
                        invalid or unenforceable provision will be deemed
                        superseded by a valid, enforceable provision that most
                        closely matches the intent of the original provision and
                        the remainder of the agreement shall continue in effect.
                      </p>
                      <p>
                        Unless otherwise specified herein, this agreement
                        constitutes the entire agreement between the user and
                        Elite Marketing with respect to the Site and it
                        supersedes all prior or contemporaneous communications
                        and proposals, whether electronic, oral or written,
                        between the user and Elite Marketing with respect to the
                        Site. A printed version of this agreement and of any
                        notice given in electronic form shall be admissible in
                        judicial or administrative proceedings based upon or
                        relating to this agreement to the same extent and
                        subject to the same conditions as other business
                        documents and records originally generated and
                        maintained in printed form. It is the express wish to
                        the parties that this agreement and all related
                        documents be written in English.
                      </p>
                      <h4>Changes to Terms</h4>
                      <p>
                        Elite Marketing reserves the right, in its sole
                        discretion, to change the Terms under which spiffs are
                        offered. The most current version of the Terms will
                        supersede all previous versions. Elite Marketing
                        encourages you to periodically review the Terms to stay
                        informed of our updates.
                      </p>
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

export default TermCondition;
