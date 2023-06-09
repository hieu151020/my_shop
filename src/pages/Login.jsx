import React from "react";
import "../styles/login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { useAuthen } from "../userContext/AuthenticationProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {  login } = useAuthen();

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log(user);
      login(user.email)
      setLoading(false);
      toast.success("Loggin successful");
      navigate("/");
    } catch (error) {
      setLoading(false);
      switch (error.message) {
        case "Firebase: Error (auth/invalid-email).":
          toast.error("Invalid email");
          break;
        case "Firebase: Error (auth/user-not-found).":
          toast.error("Email doesn't exist");
          break;
        case "Firebase: Error (auth/wrong-password).":
          toast.error("Wrong password");
          break;
        default:
          console.log("Error");
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const type = showPassword ? "text" : "password";

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <div className="loading-overlay">
              <div className="loading-spinner" />
            </div>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold fs-4 mb-4">Đăng nhập</h3>

                <Form className="auth__form" onSubmit={signIn}>
                  <FormGroup className="form__group">
                    <div className="login__input">
                      <span>
                        <i className="ri-account-circle-fill"></i>
                      </span>
                      <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="password__input mt-4">
                      <span>
                        <i className="ri-key-fill"></i>
                      </span>
                      <input
                        type={type}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <i
                        className="ri-eye-close-line show__password"
                        onClick={handleShowPassword}
                      ></i>
                    </div>
                    {/* <div>
                      <input type="checkbox" />
                      Remember me
                    </div> */}
                  </FormGroup>
                  <button type="submit" className="auth__btn">
                    Đăng nhập
                  </button>
                  <p>
                    Chưa có tài khoản?
                    <u>
                      <Link to="/signup">Tạo tài khoản mới</Link>
                    </u>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
