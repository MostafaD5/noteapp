import { useFormik } from "formik";
import signImg from "../../assets/signup-image.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  let navigate = useNavigate();
  let [errorM, seterrorM] = useState("");
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("name is require")
      .matches(/^[A-Za-z]{6,15}$/, "Name Must Be 6 Char And Max 15"),
    email: Yup.string()
      .required("email is require")
      .email("Invalid Email Format"),
    password: Yup.string()
      .required("password is require")
      .matches(/^[A-Za-z0-9]{6,15}$/, "password Must Be 6 Char And Max 15"),
    phone: Yup.string()
      .required("phone is require")
      .matches(/^01[0125][0-9]{8}$/),
    age: Yup.number()
      .required("Phone is require")
      .min(18, "Too Young")
      .max(75, "Too Old"),
  });

  async function handleSignup(values) {
    const options = {
      url: "https://note-sigma-black.vercel.app/api/v1/users/signUp",
      method: "POST",
      data: values,
    };
    try {
      let { data } = await axios.request(options);
      console.log("API Response:", data); // Log the response
      if (data.msg === "done") {
        navigate("/login");
      } else {
        console.log("Unexpected response:", data);
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      seterrorM(error.response?.data?.msg || "An error occurred");
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values); // Log form values
      handleSignup(values);
    },
  });

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 p-3"
    >
      <Row className="justify-content-center align-items-center w-100">
        <Col md={5} className="text-center mb-4 mb-md-0">
          <img
            src={signImg}
            className="img-fluid w-75"
            alt="Signup"
            style={{ maxWidth: "400px" }}
          />
        </Col>
        <Col md={5} className="text-start">
          <h3 className="my-2 fs-4 fs-md-3">Register Now:</h3>
          {errorM && <p className="text-danger">{errorM}</p>}
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? (
                <p className="text-danger">{formik.errors.name}</p>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="text-danger">{formik.errors.email}</p>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="text-danger">{formik.errors.password}</p>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Age"
                name="age"
                value={formik.values.age}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.age && formik.touched.age ? (
                <p className="text-danger">Enter Your Age</p>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <p className="text-danger">Enter Your Phone Number</p>
              ) : (
                ""
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
