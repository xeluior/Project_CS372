import React, { useState } from "react";
import { Container, LoginForm, Input, Button, RegisterLink, Title } from "../component/StyledComponents";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isValidEmail(email)){
            alert("Please enter a valid email!")
        }
        if(password.length === ""){
            alert("Please enter a password!")
        }
    };

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
