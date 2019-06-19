import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
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
        const { name, background, paletteId, id, showLink } = this.props;
        const { copied } = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.07;
        const isLightColor = chroma(background).luminance() >= 0.7;
        return (
            <CopyToClipboard 
                text={background}
                onCopy={this.handleCopy}
            >
                <div className="Color-Box" style={{ background }}>
                <div className={`copy-color-overlay ${copied && 'show'}`} style={{ background }}></div>

                <div className={`copy-message ${copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <p className={isLightColor ? "dark-color" : ""}>{background}</p>
                </div>
                
                <div className="copy-container">
                    <div className="box-content">
                        <span className={isDarkColor ? "light-color" : ""}>{name}</span>
                    </div>
                        <button className={`copy-button ${isLightColor ? "dark-color" : ""}`}>Copy To Clipboard</button>
                </div>

                {showLink && (
                    <Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
                        <span className={`see-more ${isLightColor ? "dark-color" : ""}`}>MORE</span>
                    </Link>
                )}

                </div>
            </CopyToClipboard>
        )
    }
}
