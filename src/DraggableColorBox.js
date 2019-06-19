import React from 'react'
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        textTransform: "uppercase",
    }
}

function DraggableColorBox(props) {
    const { classes, name } = props;
    return (
        <div className={classes.root} style={{ backgroundColor: props.color }}>
            {name}
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);
