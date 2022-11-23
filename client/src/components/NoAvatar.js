import React from 'react'
import '../index.css'

export default function NoAvatar({letter}) {
  return (
    <div className='d-flex text-center noavatar'>{letter.toUpperCase()}</div>
  )
}
