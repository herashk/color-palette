import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

export default class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
        this.handleCopy = this.handleCopy.bind(this);
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    handleCopy() {
        this.changeCopyState();
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => {
                this.setState({ copied: false });
            }, 1500);
        });
    }

    render() {
        const { name, background } = this.props;
        const { copied } = this.state;
        return (
            <CopyToClipboard 
                text={background}
                onCopy={this.handleCopy}
            >
                <div className="Color-Box" style={{ background }}>
                <div className={`copy-color-overlay ${copied && 'show'}`} style={{ background }}></div>

                <div className={`copy-message ${copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <p>{background}</p>
                </div>
                
                <div className="copy-container">
                    <div className="box-content">
                        <span>{name}</span>
                    </div>
                        <button className="copy-button">Copy To Clipboard</button>
                </div>
                <span className="see-more">More</span>
                </div>
            </CopyToClipboard>
        )
    }
}
