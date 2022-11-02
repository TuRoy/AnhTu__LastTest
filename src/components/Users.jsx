import { message, Pagination, Button } from 'antd'
import Header from './Header'
import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";






function Users() {
    const nav = useNavigate()
    const [data, setData] = useState([])
    const [total, setTotal] = useState(-1)
    const token = window.localStorage.getItem('token')
   
    useEffect(() => {
        let page = 1
        window.localStorage.getItem('page')  ? page  = window.localStorage.getItem('page') : page = 1
        axios.get(`https://class.nodemy.vn/api/mock/users?page=${page}&size=10`, {
            headers: { Authorization: `bearer ${token} ` }
        })
            .then(function (value) {
                console.log(value.data.total);
                setTotal(value.data.total)
                setData(value.data.data)
            })
            .catch(function (err) {
                message.error('err')
            })
    }, [])
    return (
        <div>
            <Header></Header>
             <Button type="primary" onClick={function(){
                nav('/createuser')
             }}>Create User</Button>
            {data.map((value, index) => {
                return (
                    <div key={value._id} className='listuser'>
                       <Link to={`/users/${value._id}`}> <p > {value.name} -- {value.phone}</p></Link>
                        <Button type="primary" onClick={function (e) {
                            if(window.confirm('xoa user')){
                                axios.delete(`https://class.nodemy.vn/api/mock/users/${e.target.id}`,
                                    {headers: { Authorization: `bearer ${token} ` }}
                                )
                                    .then(function (value) {
                                        axios.get('https://class.nodemy.vn/api/mock/users?page=1&size=10', {
                                            headers: { Authorization: `bearer ${token} ` }
                                        })
                                            .then(function (value) {
                                                console.log(value.data.total);
                                                setData(value.data.data)
                                            })
                                            .catch(function (err) {
                                                message.error('err')
                                            })
                                        console.log(value);
                                    })
                                    .catch(function (err) {
                                        console.log(err);
                                    })
                            }
                        }} danger ghost><span id={value._id}>Delete</span></Button>
                        <span className='span'></span>
                         <Button type="primary" onClick={function(e){
                                nav(`/users/edits/${e.target.id}`)
                         }}><span id={value._id}> Edit</span></Button>
                    </div>
                )
            })}
            <Pagination defaultCurrent={window.localStorage.getItem('page') ? window.localStorage.getItem('page') * 1  : 1} total={total} onChange={function (page, pagesize) {
                window.localStorage.setItem('page', page.toString())
                axios.get(`https://class.nodemy.vn/api/mock/users?page=${page}&size=${pagesize}`, {
                    headers: { Authorization: `bearer ${token} ` }
                })
                    .then(function (value) {
                        setData(value.data.data)
                    })
                    .catch(function (err) {
                        message.error('err')
                    })
            }} />;
        </div>
    )
}

export default Users