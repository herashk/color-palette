import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        //    stage: "form",
           open: true,
           newPaletteName: ''
         };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.submitNewName = this.submitNewName.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        })
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleClickOpen() {
        this.setState({ open: true });
    };

    submitNewName() {
        this.props.handleSubmit(this.state.newPaletteName);
    }

    // handleClose() {
    //     this.setState({ open: false });
    //     this.props.hideForm();
    // };

    // showEmojiPicker() {
    //     this.setState({ stage: "emoji" });
    // }

    render() {
        const { newPaletteName } = this.state;
        const { hideForm } = this.props;
        return (
            <div>
            {/* <Dialog
                open={this.state.stage === "emoji"}
            >
                <Picker />
                <DialogTitle id="form-dialog-title">Choose an emoji for your palette!</DialogTitle>
                <DialogActions>
                    <Button onClick={hideForm} color="primary">
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={this.submitNewName}
                        >
                        Save
                    </Button>
                </DialogActions>

            </Dialog> */}

            <Dialog
                open={this.state.open}
                onClose={hideForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={this.submitNewName}>
                <DialogContent>
                    <DialogContentText>
                        Please enter a unique name for a new palette
                    </DialogContentText>
                    <TextValidator 
                        value={newPaletteName}
                        onChange={this.handleChange}
                        placeholder="palette name"
                        name="newPaletteName"
                        fullWidth
                        margin="normal"
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={["enter a new palette name", "duplicate palette name exists"]}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideForm} color="primary">
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                        >
                        Save
                    </Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
            </div>
        );
    }
}


export default PaletteMetaForm;