import React from 'react'
import { useRef } from 'react';
import { Button, message } from 'antd';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';




function Edituser() {
  const name = useRef()
  const pass = useRef()
  const file = useRef()
  const phone = useRef()
  const Formdata  = new FormData()
  const param  =useParams()
  const token  = window.localStorage.getItem('token')
  const nav =useNavigate()
  const [data , setData ] = useState()


useEffect(()=>{
    axios.get(`https://class.nodemy.vn/api/mock/users/${param.edit}`,  { headers: { Authorization: `bearer ${token} ` } })
    .then(value=>{
      name.current.value = value.data.data.name
      pass.current.value = value.data.data.password
      phone.current.value = value.data.data.phone
      console.log(value);
    })
    .catch(err=>{
      console.log(err);
    })
},[])

  

  return (
    <div className='edit'>
      
      <div> 
        <div> <h3>Username:</h3>  <input type="text" ref={name} /></div>
      <div><h3>Password:</h3> <input type="text" ref={pass} /></div>
      <div><h3>Myfile:</h3> <input type="file" ref={file} /></div>
      <div><h3>Phone:</h3>  <input type="number" ref={phone} /></div>
      <Button type="primary" onClick={function(e){
        Formdata.append('name' , name.current.value)
        Formdata.append('password', pass.current.value.toString())
        Formdata.append('myFile', file.current.files[0])
        Formdata.append('phone', phone.current.value.toString())
        axios.put(`https://class.nodemy.vn/api/mock/users/${param.edit}`,Formdata,{
          headers: { Authorization: `bearer ${token} ` }
        })
        .then(value=>{
          console.log(value);
          message.success('thay doi thanh cong')
          nav('/users')
        })
        .catch(err =>{
          message.error('thay doi that bai  !!!!')
          console.log(err);
        })
      }}>Edit</Button>
      </div>
    </div>
  )
}

export default Edituser