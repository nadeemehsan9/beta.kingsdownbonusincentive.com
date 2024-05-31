import React from "react";

function ClaimDetailUp(props) {
  return (
    <>
      <form noValidate>
        <ul className="timeline single-li">
          <li>
            <div className="prfil-set">
              <div className="form-box">
                <div className="row">
                  {/* <div className="alert alert-danger" role="alert">
                  <h6 className="astric-req">
                    Field(s) marked with <span>Asterisk (*)</span> are
                    mandatory.
                  </h6>
                </div> */}
                  <div className="col-lg-8">
                    <h4 className="prf-hed">STORE INFORMATION</h4>{" "}
                  </div>
                </div><br/>

                <div className="form-filds ">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="claim-select-outer">
                        <p>
                          {" "}
                          <strong>STORE STATE</strong>
                          <br />
                          <span>{props.state}</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="claim-select-outer">
                        <p>
                          {" "}
                          <strong>STORE CITY</strong>
                          <br />
                          <span> {props.city}</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="claim-select-outer">
                        <p>
                          {" "}
                          <strong>STORE</strong>
                          <br />
                          <span> {props.store}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
          </li>
        </ul>
        {/* <div className={`loader ${loading ? "in" : ""}`}>
        <div className="spinner-border main-spin"></div>
      </div> */}
      </form>
    </>
  );
}

export default ClaimDetailUp;
