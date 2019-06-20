import React, { Component } from 'react'
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            formShowing: false
        }
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    showForm() {
        this.setState({ formShowing: true })
    }

    hideForm() {
        this.setState({ formShowing: false });
    }

    render() {
        const { classes, open, handleSubmit, palettes } = this.props;
        return (
            <div className={classes.root}>
            <CssBaseline />
                <AppBar
                    color='default'
                    position='fixed'
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color='inherit'
                        aria-label='Open drawer'
                        onClick={this.props.handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                    <ChevronRightIcon />
                    </IconButton>
                    <Typography variant='h6' color='inherit' noWrap>
                        Create a Palette
                    </Typography>

                </Toolbar>
                <div className={classes.navButtons}>
                <Link to="/">
                    <Button 
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        >Go Back
                    </Button>
                </Link>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={this.showForm}
                    className={classes.button}
                    >Save
                </Button>
                </div>
                </AppBar>
                {this.state.formShowing && <PaletteMetaForm 
                    handleSubmit={handleSubmit}
                    palettes={palettes}
                    hideForm={this.hideForm}
                />}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);