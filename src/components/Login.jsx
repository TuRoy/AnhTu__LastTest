import React from 'react'
import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { uploadInfo } from '../redux-toolkit/infoSlice';


function Login() {
    const dispatch  = useDispatch()
    const nav = useNavigate()
    const onFinish = (values) => {
        axios.post('https://class.nodemy.vn/api/login', {
            email: values.email, password: values.password
        })
        .then(function(value){
            console.log(value.data.data.user);
            window.localStorage.setItem('token', value.data.data.token)
            window.localStorage.setItem('name',value.data.data.user.name )
            message.success('dang nhap thanh cong')
            dispatch(uploadInfo(value.data.data.user))
            nav('/users')
        })
        .catch(function(err){
            message.error('dang nhap k thanh cong !!!')
        })
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        message.error('dien du thong tin !!!')
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login'>
            <h1>Login</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login