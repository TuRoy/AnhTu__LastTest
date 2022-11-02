
import {  Navigate } from 'react-router-dom'
import React from 'react'


export default function PrivateRouter(props) {
  const token = window.localStorage.getItem('token')
  if(token.length > 1){
    return props.children
  }else{
    return <Navigate to={'/login'}></Navigate>
  }
}
