import React, { Component } from 'react';

class WildPokemon extends Component{

    constructor(props) {
        super(props)
        this.catchPokemon = this.catchPokemon.bind(this)
    }
  
    catchPokemon() {
        this.props.onCatchPokemon(this.props.id)
    }
  
    render(){
      const {pokemon} = this.props;

      return  <li className="col text-center">
                  <img className="cursor-pointer" src={pokemon.sprites.front_default} 
                            onClick={this.catchPokemon} alt={pokemon.name} />
              </li>
    }
}

export default WildPokemon;