import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { useState } from "react";

export default function Note({ note, deleteNote, updateNote }) {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: note.title || "",
      content: note.content || "",
    },
    onSubmit: (values) => {
      updateNote(note._id, values);
      setShow(false);
    },
    enableReinitialize: true,
  });

  return (
    <>
      <div className="col-12 col-md-6 col-lg-3 mb-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.content}</p>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShow(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm ms-2"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              name="title"
              id="title"
              placeholder="Enter note title"
              {...formik.getFieldProps("title")}
            />
            <label className="form-label mt-3" htmlFor="content">
              Description
            </label>
            <textarea
              className="form-control"
              rows={3}
              name="content"
              id="content"
              placeholder="Enter note description"
              {...formik.getFieldProps("content")}
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
