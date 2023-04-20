import React from 'react'
import { Link } from 'react-router-dom'

export default function Success() {
  return (
    <div className='make_it_100'>
        <h1>We got your querry!</h1>
        <img src='./images/right.png' height='100px' width='100px' alt='right'></img>
        <p>Dont worry! We will get to your question ASAP!</p>
        <form>
            <button><Link to='/feed'>Back to Feed</Link></button>
        </form>
    </div>
  )
}
