import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            format: 'hex',
            open: false,
        };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }

    handleFormatChange(evt) {
        this.setState({ format: evt.target.value, open: true });
        this.props.changeColorFormat(evt.target.value);
    }

    closeSnackBar() {
        this.setState({ open: false });
    }

    render() {
        const { level, changeLevel, showAllColors } = this.props;
        const { format } = this.state;
        return (
            <header className="Navbar">
                <div className="logo">
                    <Link to="/">Color Picker</Link>
                </div>
                {showAllColors && <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className="slider">
                        <Slider 
                            defaultValue={level} 
                            min={100} 
                            max={900} 
                            step={100}
                            onAfterChange={changeLevel}
                        />
                    </div>
                </div>}
                <div className="select-container">
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                    anchorOrigin={{ vertical: "bottom", horizontal: "right"}} 
                    open={this.state.open} 
                    autoHideDuration={3000} 
                    message={<span id="message-id">Color format changed to "{format.toUpperCase()}"</span>}
                    ContentProps={{
                        "aria-describedby": "message-id" //if you can't see it but want to know what it means
                    }}
                    onClose={this.closeSnackBar}
                    onClick={this.closeSnackBar}
                    action={[
                        <IconButton 
                            onClick={this.closeSnackBar}
                            key="close"
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </header>
        )
    }
}
