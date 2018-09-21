import React, {	Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFish } from '@fortawesome/free-solid-svg-icons';
//import '../App.css';
import './fish.css';

library.add(faFish);
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
      bubble: {
        x: 110,
        y: 110,
      },
      gridborder: {
        up: 10,
        down: 70,
        left: 10,
        right: 80,
      },
    };
  }

  
  componentDidMount() {
    this.intervalfishbubble = setInterval(() => this.fishbubble(), 3500);
  }
  componentWillUnmount() {
    clearInterval(this.intervalfishbubble);
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
    clearTimeout(this.intervalStop);
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
  if (typeof this.intervalStop !== 'undefined') {
    clearTimeout(this.intervalStop);
  }
  this.intervalStop = setTimeout(() => this.commanDone(), 1000);

  this.setState(prevState => ({
    fish: {
      x: prevState.fish.x + x,
      y: prevState.fish.y + y,
      rotation: fish.rotation,
    },
  }));
  }
  
  fishbubble() {
    clearInterval(this.intervalfishbubble);
    const fish = this.state.fish;
    let bx = fish.x;
    let by = fish.y;
    switch (fish.rotation) { 
      case 0:
        bx = bx + 5;
        by = by + 9;
      break;
      case 90:
      break;
      case 180:
      break;
      case 270:
      break;
      default:
    }
    this.setState({ 
       bubble: {
          x: bx,
          y: by,
        },
     });
    this.intervalfishbubble = setInterval(() => this.fishbubble(), 8000);
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
      <div className='sea'>
      
        <div id='bubles'>
          <div className='bubble x1'></div>
          <div className='bubble x2'></div>
          <div className='bubble x3'></div>
          <div className='bubble x4'></div>
          <div className='bubble x5'></div>    
        </div>
      
        <div style={{
                position: 'absolute',
                top: this.state.fish.x + '%',
                left: this.state.fish.y + '%',
              }}>
          <div className='clownfishanimate1'>
            <div className='clownfishanimate2'>
              <div className='clownfish'
                  style={{
                    animation: `rotation${this.state.fish.rotation} linear 0.5s forwards`,
                    animationIterationCount: '1',
                    animationFillMode: 'forwards',
                  }}
              >
                <div className='clownfish-uptail1'></div>
                <div className='clownfish-uptail2'></div>
                <div className='clownfish-downtail'></div>
                <div className='clownfish-fin'></div>
                <div className='clownfish-body'>
                  <div className='clownfish-gill'></div>
                  <div className='clownfish-eye'>
                    <div className='clownfish-pupil'></div>
                  </div>
                <div className='clownfish-midtail'></div>
                </div>
              </div>

            </div>  
          </div>
        </div>

        <div className='clownfish xf'
              style={{
                top: this.state.bubble.x + '%',
                left: this.state.bubble.y + '%',
              }}
            ></div>

        <div id='bubles'>
          <div className='bubble x6'></div>
          <div className='bubble x7'></div>
          <div className='bubble x8'></div>
          <div className='bubble x9'></div>
          <div className='bubble x10'></div>      
        </div>
      
      </div>
    );
  }  
}

export default Fish;