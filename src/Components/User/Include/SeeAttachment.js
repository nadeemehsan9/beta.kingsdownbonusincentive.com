import React, { useEffect, useState } from "react";
export default function SeeAttachment(props) {
  const [image, setImage] = useState("");

  // var splitImg = image.split(".");
  // var isPdf = splitImg[1] == "pdf" ? "pdf" : "image";
  var isPdf = image.endsWith(".pdf") ? "pdf" : "image";

  // console.log(splitImg);
  const noImage =
    "https://res.cloudinary.com/sparkcloudsforewards/image/upload/v1678783786/No_Image_Available_izjkwf.jpg";
  const pdfImage = props.src;
  useEffect(() => {
    setImage(props.src);
  }, [props]);

  const onImageError = () => {
    setImage(noImage);
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered img-control-wid">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Attachment
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {isPdf == "pdf" ? (
              <embed
                src={pdfImage}
                style={{ width: "29rem", height: "38rem" }}
              />
            ) : (
              <img
                src={image}
                alt="no url"
                className="img-fluid"
                onError={onImageError}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
