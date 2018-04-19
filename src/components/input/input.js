import React from 'react';

export default function Input({ onChange, placeholder }) {
    return (
        <input placeholder={placeholder} onChange={onChange} className="input"/>
    )
}