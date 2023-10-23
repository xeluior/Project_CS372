import React, { useState } from "react"
import { Container, LoginForm, Input, Button, Title } from "../styles/FormStyle"

export default function Register() {
    const [email, setEmail] = useState("")
    const [email2, setEmail2] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [username, setUsername] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email !== email2){
            alert("The emails entered do not match!")
        }
        else if(!isValidEmail(email) || !isValidEmail(email2)){
            alert("Please enter a valid email!")
        }
        if(password !== password2){
            alert("The passwords do not match!")
        }
        else if(password === "" || password2 === ""){
            alert("Please do not leave any password fields blank!")
        }
        //Backend code for actual account creation in the database
        //Make sure to check if the account already exists
    }
    return (
        <Container>
            <LoginForm onSubmit={handleSubmit}>
                <Title>Register</Title>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Confirm email"
                    value={email2}
                    onChange={(e) => setEmail2(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <Button type="submit">Register</Button>
            </LoginForm>
        </Container>
    )
}
