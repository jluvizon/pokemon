import React, { Component } from 'react';
import PokemonList from './PokemonList';

import './App.css';

class App extends Component{
render(){
    return  <div className="container">
              <PokemonList/>
            </div>;
  }
}

export default App;
