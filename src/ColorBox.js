import React, { Component } from 'react'
import './ColorBox.css';

export default class ColorBox extends Component {
    render() {
        return (
            <div className="Color-Box" style={{ background: this.props.background }}>
              <span>{this.props.name}</span>
              <span>MORE MORE</span>
            </div>
        )
    }
}
