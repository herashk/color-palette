import React from 'react'
import './Page.css';

export default function Page(props) {
    return (
        <section className="page">{props.children}</section>
    )
}
