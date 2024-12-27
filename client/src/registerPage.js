import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, message } from 'antd';
import axios from "axios"

const { Title } = Typography;

const RegisterForm = () => {
    const[name, setname] = useState("");
    const[password, setpassword] = useState("");

    async function onSubmit(e){
      e.preventDefault();
      console.log(name, password)
      try{
        const response = await  axios.post('http://localhost:8000/register', {
          name, password
        });
        console.log(response)
      }
      catch(err){
        console.log("error in login", err)
      }
    }
  

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
      <Title level={3} style={{ textAlign: 'center' }}>Register</Title>

      <Form
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          onChange={(e)=>setname(e.target.value)} autoComplete='username'
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          onChange={(e)=>setpassword(e.target.value)} autoComplete='current-password'
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }, 
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  })]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block onClick={onSubmit}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
