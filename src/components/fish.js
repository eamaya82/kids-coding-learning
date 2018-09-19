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
        x: 30,
        y: 50,
        rotation: 0,
      },
      gridborder: {
        up: 10,
        down: 70,
        left: 10,
        right: 80,
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
  //console.log(fish);
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

  if (fish.x < this.state.gridborder.up) {
    x = 0;
    fish.x = this.state.gridborder.up;
  }
  if (fish.x > this.state.gridborder.down) {
    x = 0;
    fish.x = this.state.gridborder.down;
  }
  if (fish.y < this.state.gridborder.left) {
    y = 0;
    fish.y = this.state.gridborder.left;
  }
  if (fish.y > this.state.gridborder.right) {
    y = 0;
    fish.y = this.state.gridborder.right;
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
     let grid = [];
     let i;
     for (i = 0; i< 10; i++) {
		
			grid.push(
				<div key={'h'+i} style={{
            position: 'absolute',
            top: '0%',
            left: (i*10) +'%',
            width: '9.7%',
            height: '99.7%',
            border: '1px dotted rgba(0,0,0,0.1)',
          }}
        >
				</div>
			);
       grid.push(
          <div key={'w'+i} style={{
              position: 'absolute',
              top: (i*10) +'%',
              left: '0%',
              width: '99.7%',
              height: '9.7%',
              border: '1px dotted rgba(0,0,0,0.1)',
            }}
          >
          </div>
        );
     
		};
  
    return (
      <div>
      {grid}
      <div
					className='fish'
					style={{
						top: this.state.fish.x + '%',
						left: this.state.fish.y + '%',
					}}
				>
					<FontAwesomeIcon icon={faFish} size='4x' rotation={this.state.fish.rotation} />
				</div>
      </div>
    );
  }  
}

export default Fish;