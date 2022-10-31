import React from 'react'
import { useSelector } from 'react-redux'

function Header() {
  const state = useSelector(function(state){
    return state.info
  })
  return (
    <div className='header'>
      <h3>hi! {state.length > 0 ? state[0].name :window.localStorage.getItem('name')}</h3>
    </div>
  )
}

export default Header