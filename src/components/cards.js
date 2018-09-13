import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import allicons from './importallicons'; //load all FontAwesomeIcon

import '../App.css';

class Card extends Component {
  //css efect
  //https://tympanus.net/codrops/2012/01/11/css-buttons-with-pseudo-elements/
  constructor(props) {
    super(props);
    this.state = {
      style: {
          width: `${this.props.size * 15}px`,
          height: `${this.props.size * 15}px`,
          color:`hsl(${this.props.color * 30}, 75%, 50%)`,
          backgroundColor: `hsl(${this.props.color * 30}, 100%, 85%)`,
          backgroundImage: `linear-gradient(hsl(${this.props.color * 30}, 100%, 90%), hsl(${this.props.color * 30}, 100%, 80%))`,
          border: `3px solid hsl(${this.props.color * 30}, 100%, 45%)`,
          boxShadow: `inset 0px 3px 0px hsl(${this.props.color * 30}, 75%, 30%), 0px 6px 0px hsl(${this.props.color * 30}, 75%, 30%)`,
          animation: 'newcard linear 0.5s',
          animationIterationCount: '1',
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