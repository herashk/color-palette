import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import  { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';



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
    static defaultProps = {
        maxColors: 20
    };
    constructor(props) {
        super(props);
        this.state = {
          open: true,
          currentColor: 'teal',
          addedColors: this.props.palettes[0].colors,
          newColorName: '',
        }; 

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
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

    clearPalette() {
        this.setState({ addedColors: [] });
    }

    addNewColor() {
        const newColor = { color: this.state.currentColor, name: this.state.newColorName };
        if (this.state.addedColors.length < 20) {
            this.setState({ addedColors: [...this.state.addedColors, newColor], newColorName: "" })
        }
    }

    addRandomColor() {
        // pick random colors from existing palettes
        const allColors = this.props.palettes.map(palette => palette.colors).flat();
        let random = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[random];
        if (this.state.addedColors.length < 20) {
            this.setState({ addedColors: [...this.state.addedColors, randomColor ]});
        }
    }
    
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit(newPaletteName) {
        const newPalette = {
            paletteName: newPaletteName, // user specified hard coded name
            id: newPaletteName.toLowerCase().replace(/ /g, "-"), // replacing spaces with a hyphen
            colors: this.state.addedColors,

        }
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }

    deleteColor(colorName) {
        // filtering out the same color name
        this.setState({
            addedColors: this.state.addedColors.filter(color => color.name !== colorName)
        });
    }

    // taken from react sortable hoc library
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ addedColors }) => ({
            addedColors: arrayMove(addedColors, oldIndex, newIndex),
        }));
    };

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, addedColors, currentColor } = this.state;
        const paletteFull = addedColors.length >= maxColors

        return (
        <div className={classes.root}>
          <PaletteFormNav 
            open={open}
            classes={classes}
            palettes={palettes}
            handleSubmit={this.handleSubmit}
            handleDrawerOpen={this.handleDrawerOpen}
          />
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
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={this.clearPalette}
                    >
                        Clear Palette
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={this.addRandomColor}
                        disabled={paletteFull}
                    >
                        {paletteFull ? "Palette Full": "Random Color"}
                    </Button>
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
                        style={{ backgroundColor: paletteFull ? "#e0e0e0" : currentColor }}
                        disabled={paletteFull}
                    >
                        {paletteFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>

            </Drawer>
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                 <div className={classes.drawerHeader} />
               <DraggableColorList 
                 colors={this.state.addedColors}
                 deleteColor={this.deleteColor}
                 axis="xy"
                 onSortEnd={this.onSortEnd}
               />
            </main>
        </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);