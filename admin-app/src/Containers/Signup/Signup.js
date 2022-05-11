import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Layout from '../../Components/Layout/Layout'
import Input from '../../Components/UI/Input/Input'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../actions/User.actions'


const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    // const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const userSignup = (e) => {

        e.preventDefault();


        const user = {
            name, email, password, cpassword, phone
        }

        dispatch(signup(user))
    }

    if (auth.authenticate) {
        return <Redirect to="/" />
    }

    if (user.loading) {
        return <h1>...Loading !</h1>
    }


    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form style={{ marginTop: '50px' }} onSubmit={userSignup}>
                            <Input
                                label="Your Name"
                                placeholder="Your Name"
                                value={name}
                                type='text'
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Input
                                label="Email"
                                placeholder="Email"
                                value={email}
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                label="Phone"
                                placeholder="Phone Number"
                                value={phone}
                                type='number'
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <Input
                                label="Password"
                                placeholder="Password"
                                value={password}
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Input
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                value={cpassword}
                                type='password'
                                onChange={(e) => setCPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup
