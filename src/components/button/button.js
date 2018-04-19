import React from 'react'
import './button.css'

export default function Button({ lable, onClick }) {
    return (
        <button onClick={onClick}> 
            {lable}
        </button>
    )
}