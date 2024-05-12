import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/SignInSignUp.css";
import Cookies from "js-cookie";

const SignInSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailFilled, setEmailFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);
  const [nameFilled, setNameFilled] = useState(false);
  const [confirmmPasswordFilled, setConfirmPasswordFilled] = useState(false);
  const [state, setState] = useState("Sign In");
  const [errors, setErrors] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    email === "" && setEmailFilled(false);
    password === "" && setPasswordFilled(false);
    name === "" && setNameFilled(false);
    confirmPassword === "" && setConfirmPasswordFilled(false);
  }, [email, password, name, confirmPassword]);

  const signInSignUpHandler = async () => {
    if (state === "Sign Up") {
      try {
        const response = await axios.post("http://localhost:4000/sign-up", {
          name,
          email,
          password,
          confirmPassword,
        });
        setState("Sign In");
      } catch (error) {
        if (error) {
          setErrors(error.response.data.errors);
        }
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/sign-in",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        Cookies.set("login", true, { expires: 1 });
        navigate("/", {
          state: {
            isLogin: true,
          },
        });
      } catch (error) {
        if (error) {
          setErrors(error.response.data.errors);
        }
      }
    }
  };

  const renderError = (path) => {
    return errors.map((value) => {
      if (value.path === path) {
        return (
          <div>
            <p className="errors mb-1">{value.msg}</p>
          </div>
        );
      }
    });
  };

  return (
    <section className="sign-in-sign-up">
      <Container>
        <Row>
          <Col
            md={5}
            className="sign-in-banner d-flex justify-content-center align-items-center flex-column"
          >
            {state === "Sign In" && (
              <>
                <h3>Hi! Welcome Back</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                  itaque?
                </p>
              </>
            )}
            {state === "Sign Up" && (
              <>
                <h3>Hi! Welcome to YanzStore</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt, amet?
                </p>
              </>
            )}
          </Col>
          <Col
            md={7}
            className="sign-in-form d-flex align-items-center justify-content-center"
          >
            <div className="sign-in">
              <h2 className="text-start mb-3">{state}</h2>
              {state === "Sign In" ? (
                <Form>
                  <Form.Group
                    className="mb-3 form-group"
                    controlId="email.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmailFilled(true);
                        setEmail(e.target.value);
                      }}
                      className={emailFilled ? "filled" : ""}
                      required
                    />
                    <Form.Label className="text-start">Your Email</Form.Label>
                    {errors && renderError("email")}
                  </Form.Group>
                  <Form.Group
                    className="mb-3 form-group"
                    controlId="password.ControlInput2"
                  >
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setPasswordFilled(true);
                        setPassword(e.target.value);
                      }}
                      className={passwordFilled ? "filled" : ""}
                      required
                    />
                    <Form.Label className="text-start">
                      Your Password
                    </Form.Label>
                    {errors && renderError("password")}
                  </Form.Group>
                </Form>
              ) : (
                <Form>
                  <Form.Group
                    className="mb-3 form-group"
                    controlId="name.ControlInput1"
                  >
                    <Form.Control
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setNameFilled(true);
                        setName(e.target.value);
                      }}
                      className={nameFilled ? "filled" : ""}
                      required
                    />
                    <Form.Label className="text-start">Your Name</Form.Label>
                    {errors && renderError("name")}
                  </Form.Group>
                  <Form.Group
                    className="mb-3 form-group"
                    controlId="email.ControlInput2"
                  >
                    <Form.Control
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmailFilled(true);
                        setEmail(e.target.value);
                      }}
                      className={emailFilled ? "filled" : ""}
                      required
                    />
                    <Form.Label className="text-start">Your Email</Form.Label>
                    {errors && renderError("email")}
                  </Form.Group>
                  <Form.Group
                    className="mb-3 form-group"
                    controlId="password.ControlInput3"
                  >
                    <Form.Control
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPasswordFilled(true);
                        setPassword(e.target.value);
                      }}
                      className={passwordFilled ? "filled" : ""}
                      required
                    />

                    <Form.Label className="text-start">
                      Your Password
                    </Form.Label>
                    {errors && renderError("password")}
                  </Form.Group>
                  <Form.Group
                    className="mb-3 form-group"
                    controlId="confirmPassword.ControlInput4"
                  >
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPasswordFilled(true);
                        setConfirmPassword(e.target.value);
                      }}
                      className={confirmmPasswordFilled ? "filled" : ""}
                      required
                    />
                    <Form.Label className="text-start">
                      Confirm Password
                    </Form.Label>
                    {errors && renderError("confirmPassword")}
                  </Form.Group>
                </Form>
              )}
              <button
                className="sign-in-btn"
                onClick={() => signInSignUpHandler()}
              >
                {state}
              </button>
              {state === "Sign In" ? (
                <p className="create-account text-start mt-2">
                  New here?{" "}
                  <span
                    onClick={() => {
                      setName("");
                      setEmail("");
                      setPassword("");
                      setConfirmPassword("");
                      setErrors("");
                      setState("Sign Up");
                    }}
                  >
                    Create an Account.
                  </span>
                </p>
              ) : (
                <p className="login-account text-start mt-2">
                  Have an Account?{" "}
                  <span
                    onClick={() => {
                      setName("");
                      setEmail("");
                      setPassword("");
                      setConfirmPassword("");
                      setErrors();
                      setState("Sign In");
                    }}
                  >
                    Sign In here.
                  </span>
                </p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignInSignUp;
