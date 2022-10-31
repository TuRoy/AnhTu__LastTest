import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";




function InfoUser() {
    const [data, setData] = useState([])
    const token = window.localStorage.getItem('token')
    const param = useParams()
    useEffect(() => {
        axios.get(`https://class.nodemy.vn/api/mock/users/${param.id}`, { headers: { Authorization: `bearer ${token} ` } })
            .then(value => {
                console.log(value);
                setData(value.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    },[])
    console.log(data);
    return (
        <div>
            <div>
                <h1>{data.name}</h1>
                
                <h3> {data.email} --- {data.phone}</h3>
                <br />
                <img src={data.avatar} alt="" />
            </div>

        </div>
    )
}

export default InfoUser