import React, { useState } from "react";
import { Container, LoginForm, Input, Button, Title } from "../styles/FormStyle";
import { isValidEmail } from "../lib/help_lib_functions";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        email2: "",
        password: "",
        password2: "",
        username: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    return (
        <Container>
            <LoginForm action="/auth/create" method="POST">
                <Title>Register</Title>
                {["username", "email", "confirm email", "password", "confirm password"].map((field, idx) => (
                    <Input
                        key={idx}
                        type={field.includes("password") ? "password" : "text"}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={formData[field]}
                        onChange={handleInputChange}
                    />
                ))}
                <Button type="submit">Register</Button>
            </LoginForm>
        </Container>
    );
}
