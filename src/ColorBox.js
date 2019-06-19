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
        textTransform: "uppercase",
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
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "5px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px"
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)"
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMessage: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "4rem",
        transform: "scale(0.1)",
        opacity: "0",
        color: "white",
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px gray",
            background: "rgba(255, 255, 255, 0.2)",
            width: "100%",
            textAlign: "center",
            padding: "1rem",
            textTransform: "uppercase",
        },
    },
    showMessage: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s"
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
                <div className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} style={{ background }}></div>

                <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
                    <h1>Copied!</h1>
                    <p className={classes.copyText}>{background}</p>
                </div>
                
                    <div className={classes.boxContent}>
                        <span className={classes.colorText}>{name}</span>
                    </div>
                        <button className={classes.copyButton}>Copy To Clipboard</button>

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