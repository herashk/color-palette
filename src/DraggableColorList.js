import React from 'react'
import  { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = SortableContainer(({ colors, deleteColor }) => {
    return (
        <div style={{ height: "100%" }}>
             {colors.map((color, i) => (
                    <DraggableColorBox 
                        index={i}
                        color={color.color} 
                        name={color.name} 
                        style={{ backgroundColor: color }}
                        id={color.name}
                        key={`${color.name} + ${i}`}
                        handleClick={() => deleteColor(color.name)}
                    >
                        {color.color}
                    </DraggableColorBox>
                ))}
        </div>
    )
})

export default DraggableColorList;
