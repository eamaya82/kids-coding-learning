import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import allicons from './importallicons'; //load all FontAwesomeIcon

import '../App.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
          width: `${this.props.size * 15}px`,
          height: `${this.props.size * 15}px`,
          color:`hsl(${this.props.color * 30}, 75%, 50%)`,
          backgroundColor: `hsl(${this.props.color * 30}, 100%, 85%)`,
          border: `5px solid hsl(${this.props.color * 30}, 100%, 15%)`,
          animation: "newcard linear 0.5s",
          animationIterationCount: "1",
      },
      key: `C-${this.props.icon}${this.props.color}`,
      size: `${this.props.size}x`,
    };
  }
  
  render() {
    return (
      <div key={this.state.key} className={"card-color"}>
        <FontAwesomeIcon size={this.state.size} className={"card-color"} icon={this.props.icon[0]} style={this.state.style} />
      </div>
    );
  }
}

export default Card;