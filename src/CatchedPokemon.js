import React, { Component } from "react";

class CatchedPokemon extends Component {
  constructor(props) {
    super(props);
    this.releasePokemon = this.releasePokemon.bind(this);
  }

  releasePokemon() {
    this.props.onReleasePokemon(this.props.id);
  }

  render() {
    const { pokemon } = this.props;

    return (
      <li className="col-12">
        <div className="row mt-3">
          <div className="col-4">
            <img
              className="cursor-pointer"
              src={pokemon.sprites.front_default}
              onClick={this.releasePokemon}
              alt={pokemon.name}
            />
          </div>
          <div className="col-3">
            <label>ID: </label>
            <div className="w-100" />
            <label>Name: </label>
            <div className="w-100" />
            <label>Type: </label>
          </div>
          <div className="col-5">
            <label>{pokemon.id}</label>
            <div className="w-100" />
            <label>{pokemon.name}</label>
            <div className="w-100" />
            <label>
              {pokemon.types.map(type => type.type.name).join(", ")}
            </label>
          </div>
        </div>
      </li>
    );
  }
}

export default CatchedPokemon;
