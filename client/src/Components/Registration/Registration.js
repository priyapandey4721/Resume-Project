import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaUserAlt, FaEye } from "react-icons/fa";
import { MdEmail, MdContactPhone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Config/Myservices";
import "./Registration.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
var usernameRegex =
  /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
var contactnumberRegex = /^[789]\d{9}$/;
var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,99}$/;
export const Registration = () => {
  const success = (data) =>
    toast.success(data, { position: toast.POSITION.TOP_CENTER });
  const failure = (data) =>
    toast.error(data, { position: toast.POSITION.TOP_CENTER });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const register = (e) => {
    e.preventDefault();
    let data = {
      username: username,
      email: email,
      contactnumber: contactnumber,
      password: password,
    };
    registerUser(data).then((res) => {
      if (res.data.error) {
        failure(res.data.error);
      } else {
        success(res.data.msg);
        navigate("/login");
      }
    });
  };
  return (
    <div>
      <Card className="card">
        <Card.Body>
          <h3>Register</h3>
          <Form>
            <Form.Group className="mb-3 input-field input">
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUserAlt className="icon" />
            </Form.Group>
            {username !== "" && !usernameRegex.test(username) && (
              <span className="text-danger">Username Should be Proper </span>
            )}
            <Form.Group className="mb-3 input-field input">
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdEmail className="icon" />
            </Form.Group>
            {email !== "" && !regForEmail.test(email) && (
              <span className="text-danger">Email Should be Proper </span>
            )}
            <Form.Group className="mb-3 input-field input">
              <Form.Control
                type="number"
                placeholder="Enter Contact Number"
                name="contactnumber"
                onChange={(e) => setContactNumber(e.target.value)}
              />
              <MdContactPhone className="icon" />
            </Form.Group>
            {contactnumber !== "" &&
              !contactnumberRegex.test(contactnumber) && (
                <span className="text-danger">
                  Contact Number Should be Proper{" "}
                </span>
              )}
            <Form.Group className="mb-3 input-field input">
              <Form.Control
                type={passwordShown ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaEye className="icon" onClick={togglePassword} />
            </Form.Group>
            {password !== "" && !passwordRegex.test(password) && (
              <span className="text-danger">
                Password Should contain special character, numbers , alphabets
                and greater then 6 letters
              </span>
            )}
            <br />
            <Button type="submit" id="button" onClick={register}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Registration;
