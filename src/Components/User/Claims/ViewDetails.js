import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../../../services/user.service";
import InputField from "../../InputField";
import Footer from "../Include/Footer";
import Header from "../Include/Header";
import SeeAttachment from "../Include/SeeAttachment";
import "./ViewDetails.css";
import moment from "moment";
import { Helmet } from "react-helmet";

function ViewDetails() {
  const TITLE = "Kings Down| Claim Details";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [status, setStatus] = useState("");
  const [store, setStore] = useState("");

  const [product, setProduct] = useState("");
  const [number, setNumber] = useState("");

  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [reward, setReward] = useState("");
  const [invoice, setInvoice] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    const getClaimDetail = async () => {
      try {
        setLoading(true);

        const { data } = await UserService.getClaimDetail(id);
        const { response: res } = data;
        setStatus(res[0].sale_status);
        setStore(res[0].retailer_name);

        setProduct(res[0].code + " / " + res[0].name + " / $" + res[0].price);
        setNumber(res[0].code + "/" + res[0].name + "/$" + res[0].price);

        // setPrice(res[0].price);
        let price =
          res[0].custom_price == "yes"
            ? res[0].reward / res[0].ship_quantity
            : res[0].price;
        setPrice(price);
        setQuantity(res[0].ship_quantity);

        let reward =
          res[0].custom_price == "no"
            ? res[0].split_sale_status == "complete"
              ? res[0].price * res[0].ship_quantity
              : (res[0].price / 2) * res[0].ship_quantity
            : res[0].split_sale_status == "complete"
            ? res[0].reward
            : res[0].reward / 2;
        setReward(reward);

        {
          /* <td>
                    $
                    {el.custom_price == "no" ? (

                      el.sale_split_sale_status == "complete"
                      ? el.size_price * el.sale_ship_qty
                      : (el.size_price / 2) * el.sale_ship_qty
                    ) : (
                      el.sale_split_sale_status == "complete" ? el.reward :
                      el.reward / 2
                    )
                    }
                  </td> */
        }
        setInvoice(res[0].deliver_invoice);
        setDate(moment(res[0].invoice_date).format("MM-DD-YYYY"));
        setFile(res[0].file);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        navigate("/welcome");
      }
    };

    getClaimDetail();
  }, []);

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
                <div className="traning-awards">
                  <h2 className="gen-hed">
                    HOPE TO <span className="slide-heading">DREAM SALES</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="claims-part">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {/* <h2 className="gen-hed">
                  View <span>Details</span>
                </h2> */}
                <div className="Detailwhitebg-box">
                  <div className="store-area icondiv">
                    {/* <h2>STORE INFORMATION</h2> */}
                    <form noValidate>
                      <ul className="timeline">
                        <li>
                          <div className="prfil-set">
                            <div className="form-box">
                              <div className="row">
                                <div className="col-lg-12">
                                  <h4 className="prf-hed">
                                    RETAILER INFORMATION
                                  </h4>{" "}
                                  {/* <button className="danger"> */}
                                  <br />
                                  <span
                                    className={
                                      status == "approved"
                                        ? "success"
                                        : status == "rejected"
                                        ? "danger"
                                        : "pending"
                                    }
                                  >
                                    {/* <i className="fa fa-thumbs-down"></i>{" "} */}
                                    <i
                                      className={`${
                                        status == "approved"
                                          ? "fa fa-thumbs-up"
                                          : status == "rejected"
                                          ? "fa fa-thumbs-down"
                                          : "fa fa-clock-o"
                                      }`}
                                    ></i>{" "}
                                    {status.charAt(0).toUpperCase() +
                                      status.slice(1)}
                                  </span>
                                </div>
                              </div>
                              <div className="form-filds">
                                <div className="row">
                                  <div className="col-lg-4">
                                    <InputField
                                      placeholder="RETAILER"
                                      spanText="RETAILER"
                                      fieldName="retailer"
                                      fieldType="text"
                                      disabled={true}
                                      values={store}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="prfil-set">
                            <div className="form-box">
                              <div className="row">
                                <div className="col-lg-12">
                                  <h4 className="prf-hed">
                                    PRODUCT INFORMATION
                                  </h4>{" "}
                                </div>
                              </div>
                              <div className="form-filds">
                                <div className="row">
                                  <div className="col-lg-8">
                                    <InputField
                                      placeholder="PRODUCT NAME"
                                      spanText="PRODUCT NAME"
                                      fieldName="product_name"
                                      fieldType="text"
                                      disabled={true}
                                      values={product}
                                    />
                                  </div>

                                  <div className="col-lg-4">
                                    <InputField
                                      placeholder="PRODUCT PRICE"
                                      spanText="PRODUCT PRICE"
                                      fieldName="product_price"
                                      fieldType="text"
                                      disabled={true}
                                      values={`$${price}`}
                                    />
                                  </div>
                                  <div className="col-lg-4">
                                    <InputField
                                      placeholder="QUANTITY"
                                      spanText="QUANTITY"
                                      fieldName="quantity"
                                      fieldType="text"
                                      disabled={true}
                                      values={quantity}
                                    />
                                  </div>
                                  <div className="col-lg-4">
                                    <InputField
                                      placeholder="REWARD"
                                      spanText="REWARD"
                                      fieldName="reward"
                                      fieldType="text"
                                      disabled={true}
                                      values={`$${reward}`}
                                    />
                                  </div>

                                  <div className="col-lg-4">
                                    <InputField
                                      placeholder="INVOICE NO"
                                      spanText="INVOICE NO"
                                      fieldName="invoice_no"
                                      fieldType="text"
                                      disabled={true}
                                      values={invoice}
                                    />
                                  </div>
                                  <div className="col-lg-4">
                                    <InputField
                                      placeholder="INVOICE DATE"
                                      spanText="INVOICE DATE"
                                      fieldName="invoice_date"
                                      fieldType="text"
                                      disabled={true}
                                      values={date}
                                    />
                                  </div>
                                  <div className="clearfix"></div>
                                  <div className="col-md-4">
                                    <br />
                                    <label>ATTACHMENT</label>
                                    <div className="box-area">
                                      <Link
                                        to="/"
                                        className="orng-textbtn"
                                        loading="lazy"
                                        onClick={() => {
                                          setAttachment(
                                            process.env.REACT_APP_IMAGE_Link +
                                              file
                                          );
                                        }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        type="button"
                                      >
                                        Click here to see attachment
                                      </Link>
                                    </div>

                                    <p></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </form>
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
        <SeeAttachment src={attachment} />
      </div>
    </>
  );
}

export default ViewDetails;
