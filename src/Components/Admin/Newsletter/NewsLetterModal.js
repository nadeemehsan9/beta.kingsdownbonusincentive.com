import { useLayoutEffect } from "react";
import { React, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AdminListService from "../../../services/admin-list.service";
import { useEffect } from "react";
import he from "he";

export default function NewsLetterModal(id) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const { id: nId } = id;
  const handleModal = (e) => {
    setShow(!show);
    // console.log(id);
  };

  const viewModal = async (e) => {
    setShow(!show);
    // console.log(nId);
    try {
      setLoading(true);
      const response = await AdminListService.getNewsletterById(nId);
      setData(he.decode(response.data.response.body));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Problem loading newsletter");
    }
  };

  return (
    <>
      <Button
        id="pop"
        onClick={viewModal}
        className="btn btn-primary px-4  back-blue"
      >
        View <i className="bi bi-eye-fill"></i>
      </Button>

      <Modal show={show} size="xl" onHide={handleModal}>
        <Modal.Header>
          <h3 className="modal-title" id="myModalLabel">
            {" "}
            Kings Down Bonus Incentive{" "}
          </h3>
          <Button id="pop-close" onClick={handleModal} className="back-blue">
            &times;
          </Button>
        </Modal.Header>

        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>

        {data ? (
          <div className="model-body" style={{ overflow: "hidden" }}>
            <div dangerouslySetInnerHTML={{ __html: data }} />
          </div>
        ) : (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
