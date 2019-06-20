import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from "@material-ui/core/styles";
import styles from './styles/ColorPickerStyles';

class ColorPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentColor: 'teal',
            newColorName: '',

        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitNewColor = this.submitNewColor.bind(this);
    }

    componentDidMount() {
        // custom rule for text validator
        ValidatorForm.addValidationRule('isColorNameUnique', value => {
            // value is whatever name in the text input
            // don't forget to explicitly or implicitly return here!
            return this.props.addedColors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
              )
        })
        ValidatorForm.addValidationRule('isColorUnique', value => {
            return this.props.addedColors.every(
                ({ color }) => color !== this.state.currentColor
            )
        })
    }


    handleColorChange(newColor) {
        this.setState({ currentColor: newColor.hex });
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    submitNewColor() {
        const newColorObj = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.props.addNewColor(newColorObj);
        this.setState({ newColorName: '' });
    }

    render() {
        const { paletteFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
                 <ChromePicker 
                    color={currentColor} 
                    onChangeComplete={this.handleColorChange}
                    className={classes.picker}
                />

                <ValidatorForm onSubmit={this.submitNewColor} ref="form">
                    <TextValidator 
                        className={classes.colorInput}
                        variant="filled"
                        value={newColorName}
                        placeholder="color name"
                        onChange={this.handleChange}
                        name="newColorName"
                        margin="normal"
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["enter a color name", "color name must be unique", "duplicate color already exists"]}
                    />
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                        style={{ backgroundColor: paletteFull ? "#e0e0e0" : currentColor }}
                        disabled={paletteFull}
                        className={classes.addColor}
                    >
                        {paletteFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPicker);