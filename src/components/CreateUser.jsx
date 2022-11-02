import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import 'antd/dist/antd.css';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function CreateUser() {
    const nav = useNavigate()
    const myfile = useRef()
    const date = useRef()
    const token  = window.localStorage.getItem('token')
    const Formdatas = new FormData()

    const onFinish = (values) => {
        Formdatas.append('email', values.email)
        Formdatas.append('name', values.name)
        Formdatas.append('password', values.password.toString())
        Formdatas.append('myFile', myfile.current.files[0] )
        Formdatas.append('phone', values.phone.toString())
        Formdatas.append('dateOfBirth', date.current.value.toLocaleString())
        console.log(Formdatas);
        axios.post('https://class.nodemy.vn/api/mock/users',Formdatas, {
            'Content-Type':'multipart/form-data',
            headers: { Authorization: `bearer ${token} ` }
        })
        .then(value=>{
            message.success(value.data.message)
            nav('/users')
            console.log(value);
        })
        .catch(err=>{
            message.error('tao k thanh cong !!!')
            console.log(err);
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <div className='createuser'>
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
                    label="Name"
                    name="name"
                    rules={[
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



                

               <div className='inpufile'>myFile: <input type="file" ref={myfile} /></div> 
               <br />



                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>



                <div className='inpufile'>date: <input type="date" ref={date} /></div> 
               <br />




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

export default CreateUser