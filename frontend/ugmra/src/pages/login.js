import React, { useState } from "react";
import { Container, LoginForm, Input, Button, RegisterLink, Title } from "../component/StyledComponents";
import { isValidEmail } from "../functions";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isValidEmail(email)){
            alert("Please enter a valid email!")
        }
        if(password.length === ""){
            alert("Please enter a password!")
        }
    };


    //Backend code to get session ID and check if username and password match

    return (
        <Container>
            <LoginForm onSubmit={handleSubmit}>
                <Title>Login</Title>
                <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Login</Button>
                    <RegisterLink to="/register">Don't have an account? Register here!</RegisterLink>
            </LoginForm>
        </Container>
    );
}
