import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorBox from './DraggableColorBox';


const drawerWidth = 400;

// taken from material UI persistent drawer styles
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)", // substracting height of the appBar
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class NewPaletteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open: true,
          currentColor: 'teal',
          addedColors: [],
          newColorName: '',
          newPaletteName: ''
        }; 

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // custom rule for text validator
        ValidatorForm.addValidationRule('isColorNameUnique', value => {
            // value is whatever name in the text input
            // don't forget to explicitly or implicitly return here!
            return this.state.addedColors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
              )
        })
        ValidatorForm.addValidationRule('isColorUnique', value => {
            return this.state.addedColors.every(
                ({ color }) => color !== this.state.currentColor
            )
        })
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCAse() !== value.toLowerCase()
            )
        })
    }

    handleColorChange(newColor) {
        this.setState({ currentColor: newColor.hex });
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    };

    handleDrawerClose() {
        this.setState({ open: false });
    };

    addNewColor() {
        const newColor = { color: this.state.currentColor, name: this.state.newColorName };
        if (this.state.addedColors.length < 20) {
            this.setState({ addedColors: [...this.state.addedColors, newColor], newColorName: "" })
        }
    }
    
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit() {
        const newPalette = {
            paletteName: this.state.newPaletteName, // user specified hard coded name
            id: this.state.newPaletteName.toLowerCase().replace(/ /g, "-"), // replacing spaces with a hyphen
            colors: this.state.addedColors,

        }
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;

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
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' color='inherit' noWrap>
                    Persistent drawer
                </Typography>

                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator 
                        value={this.state.newPaletteName}
                        onChange={this.handleChange}
                        name="newPaletteName"
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={["enter a new palette name", "duplicate palette name exists"]}
                    />
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                    >
                        Save Palette
                    </Button>

                </ValidatorForm>

            </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant='persistent'
                anchor='left'
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Typography variant="h4">Design Your Palette</Typography>
                <div>
                    <Button variant="contained" color="secondary">Clear Palette</Button>
                    <Button variant="contained" color="primary">Random Color</Button>
                </div>

                <ChromePicker 
                    color={this.state.currentColor} 
                    onChangeComplete={this.handleColorChange}
                />

                <ValidatorForm onSubmit={this.addNewColor} ref="form">
                    <TextValidator 
                        value={this.state.newColorName}
                        onChange={this.handleChange}
                        name="newColorName"
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["enter a color name", "color name must be unique", "duplicate color already exists"]}
                    />
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                        style={{ backgroundColor: this.state.currentColor }}
                    >Add Color
                    </Button>
                </ValidatorForm>

            </Drawer>
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                 <div className={classes.drawerHeader} />
                {this.state.addedColors.map(color => (
                    <DraggableColorBox 
                        color={color.color} 
                        name={color.name} 
                        style={{ backgroundColor: color }}
                        id={color.name}
                        key={color.name}
                    >
                        {color.color}
                    </DraggableColorBox>
                ))}
            </main>
        </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);