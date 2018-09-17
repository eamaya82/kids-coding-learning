import React, {	Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFish } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

library.add(faFish);
let intervalStop;
class Fish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: this.props.speed,
      newCommand: true,
      fish: {
        x: 60,
        y: 50,
        rotation: 0,
      },
    };
  }
  
  componentWillReceiveProps(nextProps) {
    //the "this.state.newCommand" force to accept the same command several times consecutively, example 2, 2, 2
    if (this.props.command !== nextProps.command || this.state.newCommand) {
      this.setState({ newCommand: false });
      this.commandfish(nextProps.command);
    }
  }
  
  //fish ***********
  commandfish(command) {
    clearInterval(this.intervalMove); //clear previus interval
    switch (command) {
      case 6:
        this.intervalMove = setInterval(() => this.movefish(0, 1), 100);
        //console.log('go right');
        break;
      case 2:
        this.intervalMove = setInterval(() => this.movefish(1, 0), 100);
        //console.log('go down');
        break;
      case 4:
        this.intervalMove = setInterval(() => this.movefish(0, -1), 100);
        //console.log('go left');
        break;
      case 8:
        this.intervalMove = setInterval(() => this.movefish(-1, 0), 100);
        //console.log('go up');
        break;
      case 0:
        break;
      default:
        this.commanDone();
    }
  }
  
  commanDone() {
    clearInterval(this.intervalMove);
    clearTimeout(intervalStop);
    this.setState({ newCommand: true });
    this.props.done();
  }
  
	movefish(x, y) {
  let fish = this.state.fish;
  if (x === -1 && y === 0) {
    fish.rotation = 270;
  }
  if (x === 1 && y === 0) {
    fish.rotation = 90;
  }
  if (x === 0 && y === -1) {
    fish.rotation = 180;
  }
  if (x === 0 && y === 1) {
    fish.rotation = 0;
  }

  x = x * this.state.speed;
  y = y * this.state.speed;

  if (fish.x <= 5) {
    x = 0;
    fish.x = 6;
  }
  if (fish.x >= 87) {
    x = 0;
    fish.x = 86;
  }
  if (fish.y <= 5) {
    y = 0;
    fish.y = 6;
  }
  if (fish.y >= 90) {
    y = 0;
    fish.y = 89;
  }

  if (x === 0 && y === 0) {
    this.commanDone();
  }

  //stop the movement of the fish after X second
  if (typeof intervalStop !== 'undefined') {
    clearTimeout(intervalStop);
  }
  intervalStop = setTimeout(() => this.commanDone(), 1000);

  this.setState(prevState => ({
    fish: {
      x: prevState.fish.x + x,
      y: prevState.fish.y + y,
      rotation: fish.rotation,
    },
  }));
  }
     
     
   render() {
    return (
      <div
					className='fish'
					style={{
						top: this.state.fish.x + '%',
						left: this.state.fish.y + '%',
					}}
				>
					<FontAwesomeIcon icon={faFish} size='3x' rotation={this.state.fish.rotation} />
				</div>
    );
  }  
}

export default Fish;