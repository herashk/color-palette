import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

export default class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // value: '',
            copied: false
        };
    }

    render() {
        const { name, background } = this.props;
        return (
            <CopyToClipboard 
                text={background}
                onCopy={() => this.setState({ copied: true })}
            >
                <div className="Color-Box" style={{ background }}>
                <div className="copy-container">
                    <div className="box-content">
                        <span>{name}</span>
                    </div>
                        <button className="copy-button">{this.state.copied ? 'Copied!' : 'Copy To Clipboard'}</button>
                </div>
                <span className="see-more">More</span>
                </div>
            </CopyToClipboard>
        )
    }
}
