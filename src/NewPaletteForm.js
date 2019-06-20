import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from './DraggableColorList';
import  { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPicker from './ColorPicker';
import styles from './styles/NewPaletteFormStyles';

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    };
    constructor(props) {
        super(props);
        this.state = {
          open: true,
          addedColors: this.props.palettes[0].colors,
        }; 

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
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

    addNewColor(newColorObj) {
        if (this.state.addedColors.length < 20) {
            this.setState({ addedColors: [...this.state.addedColors, newColorObj] })
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
        const { open, addedColors } = this.state;
        const paletteFull = addedColors.length >= maxColors

        return (
        <div className={classes.root}>
          <PaletteFormNav 
            open={open}
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
                    <div className={classes.container}>
                        <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
                        <div className={classes.buttons}>
                            <Button 
                                variant="contained" 
                                color="secondary"
                                onClick={this.clearPalette}
                                className={classes.button}
                            >
                                Clear Palette
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={this.addRandomColor}
                                disabled={paletteFull}
                                className={classes.button}
                            >
                                {paletteFull ? "Palette Full": "Random Color"}
                            </Button>
                        </div>

                    <ColorPicker 
                        paletteFull={paletteFull}
                        addNewColor={this.addNewColor}
                        addedColors={this.state.addedColors}
                    />
                </div>

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