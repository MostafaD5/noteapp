import axios from "axios";
import loginImg from "../../assets/signin-image.jpg";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { UserrContext } from "../../Context/UserrContext";
export default function Login() {
  const navigate = useNavigate();
  let { settoken } = useContext(UserrContext);
  const [errorM, setErrorM] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Za-z0-9]{6,15}$/, "Password must be 6-15 characters"),
  });

  const handleSignin = async (values) => {
    const options = {
      url: "https://note-sigma-black.vercel.app/api/v1/users/signIn",
      method: "POST",
      data: values,
    };
    try {
      const { data } = await axios.request(options);
      console.log(data);
      if (data.msg === "done") {
        localStorage.setItem("token", data.token);
        settoken(data.token);
        navigate("/home");
      }
    } catch (error) {
      setErrorM(error.response?.data?.msg || "An error occurred");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSignin,
  });

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Row className="justify-content-center align-items-center w-100">
        {/* Form Column */}
        <Col xs={12} md={6} lg={5} className="text-start p-4">
          <h3 className="my-2">Login Now:</h3>
          {errorM && <p className="text-danger">{errorM}</p>}
          <Form onSubmit={formik.handleSubmit}>
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
              {formik.errors.email && formik.touched.email && (
                <p className="text-danger">{formik.errors.email}</p>
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
              {formik.errors.password && formik.touched.password && (
                <p className="text-danger">{formik.errors.password}</p>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Col>

        {/* Image Column */}
        <Col xs={12} md={6} lg={5} className="text-center p-4">
          <img
            src={loginImg}
            alt="Login"
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Col>
      </Row>
    </Container>
  );
}
