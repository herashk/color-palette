import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generateColorPalette } from './helpers/helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(generateColorPalette(seedColors[3]));
    return (
      <div className="App">
        <Palette palette={generateColorPalette(seedColors[4])} />
      </div>
    );
  }
}

export default App;
