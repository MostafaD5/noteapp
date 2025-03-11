import { useContext, useEffect, useState } from "react";
import { UserrContext } from "../../Context/UserrContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import axios from "axios";
import Note from "../../Components/Notes/Note";
import { PropagateLoader } from "react-spinners";

export default function Home() {
  const [show, setShow] = useState(false);
  const [notes, setNotes] = useState([]);
  const [notF, setNotF] = useState(null);
  const { token, setNotesCount } = useContext(UserrContext);
  const [loading, setLoading] = useState(false);

  const getNotes = async () => {
    setNotF(null);
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        {
          headers: { token: `3b8ny__${token}` },
        }
      );
      setNotes(data.notes);
      setNotesCount(data.notes.length);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotF("No Notes Available.");
      setNotesCount(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        values,
        {
          headers: { token: `3b8ny__${token}` },
        }
      );

      if (data.msg === "done") {
        getNotes();
        setShow(false);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (noteID) => {
    try {
      const { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`,
        {
          headers: { token: `3b8ny__${token}` },
        }
      );

      if (data.msg === "done") {
        getNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  const updateNote = async (noteID, values) => {
    try {
      const { data } = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`,
        values,
        {
          headers: { token: `3b8ny__${token}` },
        }
      );

      if (data.msg === "done") {
        getNotes();
        setShow(false);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit,
  });

  return (
    <>
      <div className="container mt-5">
        {/* Add Note Modal */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Note</Modal.Title>
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
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={formik.handleSubmit}>
              Add Note
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="container mt-5">
        {/* Add Note Button */}
        <button
          onClick={() => {
            formik.resetForm(); // ✅ Clears previous input values
            setShow(true); // ✅ Opens modal
          }}
          className="btn btn-primary text-white d-block ms-auto mb-4 p-3 shadow-sm"
        >
          <i className="fa-solid fa-plus me-2"></i>
          Add Note
        </button>

        {/* Notes Section */}

        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <PropagateLoader color="#3f77f6" size={20} />
          </div>
        ) : notF ? (
          <p className="text-center text-muted">{notF}</p>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Notes</h2>
              <h6 className="mb-0 text-muted">
                <span className="badge bg-info px-3 py-2">{notes.length}</span>{" "}
                Notes
              </h6>
            </div>
            <div className="row">
              {notes.map((note) => (
                <Note
                  note={note}
                  key={note._id}
                  deleteNote={deleteNote}
                  updateNote={updateNote}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
