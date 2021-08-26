import React from 'react'
import './Button.scss'

export default function Button({ children, onClick }) {
  return (
    <div className='button' onClick={onClick}>
      {children}
    </div>
  )
}
