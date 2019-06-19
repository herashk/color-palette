import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './styles/ColorBoxStyles'
import { withStyles } from '@material-ui/styles';

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