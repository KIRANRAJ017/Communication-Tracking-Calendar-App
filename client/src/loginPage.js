import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, message } from 'antd';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginForm = () => {

  const[name, setname] = useState("");
  const[password, setpassword] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e){
    e.preventDefault();
    console.log(name, password)
    try{
      const response = await  axios.post('http://localhost:8000/login', {
        name, password
      });
      if(response.data=='User exist'){
        navigate('/admin');
      }
    }
    catch(err){
      console.log("error in login", err)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
      <Title level={3} style={{ textAlign: 'center' }}>Login</Title>

      <Form layout="vertical" >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Enter your username" onChange={(e)=>setname(e.target.value)} autoComplete='username'/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" onChange={(e)=>setpassword(e.target.value)} autoComplete='current-password'/>
        </Form.Item>

        <Form.Item>
          <Row justify="space-between">
            <Col>
              <Checkbox>Remember me</Checkbox>
            </Col>
            <Col>
              <a href="/forgot-password">Forgot password?</a>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block onClick={onSubmit}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
