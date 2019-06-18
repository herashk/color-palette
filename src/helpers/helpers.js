import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// taken from Colt Steele's repo
function generateColorPalette(starter) {
    let newPalette = {
        paletteName: starter.paletteName,
        id: starter.id,
        emoji: starter.emoji,
        colors: {}
    };
    for (let level of levels) {
        newPalette.colors[level] = [];
    }
    /* eslint-disable no-unused-expressions */
    for (let color of starter.colors) {
        let scale = getScale(color.color, 10).reverse(); // this makes it come from light to dark
        for (let i in scale) { // 10 colors
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, '-'),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(")", ",1.0)")
            })
        }
    }
    return newPalette;
}

// generating three colors for each color
function getRange(hexColor) {
    const end = '#fff';
    return [
        chroma(hexColor).darken(1.4).hex(), // not too dark so that it's useful
        hexColor,
        end
    ];
}

function getScale(hexColor, numberOfColors) {
    return chroma
        .scale(getRange(hexColor))
        .mode('lab')
        .colors(numberOfColors);
}

export { generateColorPalette };