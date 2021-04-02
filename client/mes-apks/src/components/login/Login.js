import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => id.length > 0 && password.length > 0;


  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="text">
          <Form.Label>Identifiant</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Connexion
        </Button>
      </Form>
    </div>
  );
}
export default Login