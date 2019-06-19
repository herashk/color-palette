import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import './ColorBox.css';

const styles = {
    colorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        "&:hover button": {
            opacity: 1,
            transition: '0.5s'
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white"
    },
    colorText: {
        color: props => chroma(props.background).luminance() <= 0.07 ? "white" : "rgba(0,0,0,0.6)"
    },
    seeMore: {
        color: props =>
          chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "50px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase",
        fontSize: "13px"
    },
    copyButton: {
        color: props =>
        chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
        width: "160px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-80px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "0.7rem",
        // lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity: 0,
    }
}

class ColorBox extends Component {
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
        const { name, background, paletteId, id, showingFullPalette, classes } = this.props;
        const { copied } = this.state;
        return (
            <CopyToClipboard 
                text={background}
                onCopy={this.handleCopy}
            >
                <div className={classes.colorBox} style={{ background }}>
                <div className={`copy-color-overlay ${copied && 'show'}`} style={{ background }}></div>

                <div className={`copy-message ${copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <p className={classes.copyText}>{background}</p>
                </div>
                
                <div className="copy-container">
                    <div className="box-content">
                        <span className={classes.colorText}>{name}</span>
                    </div>
                        <button className={classes.copyButton}>Copy To Clipboard</button>
                </div>

                {showingFullPalette && (
                    <Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
                        <span className={classes.seeMore}>MORE</span>
                    </Link>
                )}

                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);