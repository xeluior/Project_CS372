import React, { useState } from "react";
import { Container, LoginForm, Input, Button, RegisterLink, Title } from "../styles/FormStyle";
import { isValidEmail } from "../lib/help_lib_functions";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {

        if(!isValidEmail(email)){
            alert("Please enter a valid email!");
            return;
        }
        
        if(password === ""){
            alert("Please enter a password!");
            return;
        }
    };

    return (
        <Container>
            <LoginForm onSubmit={handleSubmit} action="/auth/login" method="POST">
                <Title>Login</Title>
                <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name = "email" 
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name = "password"
                />
                <Button type="submit">Login</Button>
                    <RegisterLink to="/register">Don&apos;t have an account? Register here!</RegisterLink>
            </LoginForm>
        </Container>
    );
}
