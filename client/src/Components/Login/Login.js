import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../Config/Myservices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,99}$/;
const Login = () => {
  const success = (data) =>
    toast.success(data, { position: toast.POSITION.TOP_CENTER });
  const failure = (data) =>
    toast.error(data, { position: toast.POSITION.TOP_CENTER });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const login = (e) => {
    e.preventDefault();
    let data = { email: email, password: password };
    loginUser(data).then((res, err) => {
      if (res.data.error) {
        failure(res.data.error);
        navigate("/login");
      } else {
        success(res.data.msg);
        sessionStorage.setItem("_token", res.data.token);
        sessionStorage.setItem("user", email);
        navigate("/dashboard");
      }
    });
  };
  return (
    <div>
      <Card className="login-card">
        <Card.Body>
          <h3>Login</h3>
          <Form>
            <Form.Group className="mb-3 input-field login-input">
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdEmail className="login-icon" />
            </Form.Group>
            {email !== "" && !regForEmail.test(email) && (
              <span className="text-danger">Email Should be Proper </span>
            )}
            <Form.Group className="mb-3 input-field login-input">
              <Form.Control
                type={passwordShown ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaEye className="login-icon" onClick={togglePassword} />
            </Form.Group>
            {password !== "" && !passwordRegex.test(password) && (
              <span className="text-danger">
                Password Should contain special character, numbers , alphabets
                and greater then 6 letters
              </span>
            )}
            <br />
            <Button type="submit" id="login-button" onClick={login}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
