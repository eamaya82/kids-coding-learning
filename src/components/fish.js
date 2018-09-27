import React, {	Component } from 'react';

/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFish } from '@fortawesome/free-solid-svg-icons';*/
//import '../App.css';
import './fish.css';

/* import seaweed1 from './seaweed1.svg'; */

/*library.add(faFish);*/
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
        rotation1: 0,
        isFaceToLeft: true,
        isFaceToLeft1: true,
      },
      bubble: {
        x: 110,
        y: 110,
      },
      gridborder: {
        up: 3,
        down: 70,
        left: 6,
        right: 79,
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
  let rotationold = fish.rotation;
  let isFaceToLeftold = fish.isFaceToLeft;
  //console.log(fish);
  if (x === -1 && y === 0) {
    fish.rotation = 270;
  }
  if (x === 1 && y === 0) {
    fish.rotation = 90;
  }
  if (x === 0 && y === -1) {
    fish.rotation = 180;
    fish.isFaceToLeft = false;
  }
  if (x === 0 && y === 1) {
    fish.rotation = 0;
    fish.isFaceToLeft = true;
  }

  if (rotationold !== fish.rotation) {
    fish.rotation1 = rotationold;
    fish.isFaceToLeft1 = isFaceToLeftold;
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
      rotation1: fish.rotation1,
      isFaceToLeft: fish.isFaceToLeft,
      isFaceToLeft1: fish.isFaceToLeft1,
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
        by = by + 15;
      break;
      case 90:
      break;
      case 180:
        bx = bx + 5;
        by = by - 5;
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
    return (
      <div className='sea'>

        <div className="seaweed4">
          <svg viewBox='0 0 64 64' width='200' height='200'>  
             <linearGradient id="gradient-horizontal" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--color-stop-1)" />
              <stop offset="50%" stop-color="var(--color-stop-2)" />
              <stop offset="100%" stop-color="var(--color-stop-3)" />
            </linearGradient>
            <path id='seaweed4' d='M32 64 C28 34 36 28 22 6 C40 26 26 36 31 64 Z' />
          </svg>
        </div>
        <div className="seaweed3">
          <svg viewBox='0 0 64 64' width='200' height='200'>  
             <linearGradient id="gradient-horizontal" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--color-stop-1)" />
              <stop offset="50%" stop-color="var(--color-stop-2)" />
              <stop offset="100%" stop-color="var(--color-stop-3)" />
            </linearGradient>
            <path id='seaweed3' d='M32 64 C38 46 24 40 32 0 C20 20 40 32 31 64 Z' />
          </svg>
        </div>
        <div className="seaweed2">
          <svg viewBox='0 0 64 64' width='200' height='200'>  
             <linearGradient id="gradient-horizontal" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--color-stop-1)" />
              <stop offset="50%" stop-color="var(--color-stop-2)" />
              <stop offset="100%" stop-color="var(--color-stop-3)" />
            </linearGradient>
            <path id='seaweed2' d='M32 64 C32 46 20 22 40 6 C30 16 26 36 31 64 Z' />
          </svg>
        </div>
        <div className="seaweed1">
          <svg viewBox='0 0 64 64' width='200' height='200'>  
             <linearGradient id="gradient-horizontal" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--color-stop-1)" />
              <stop offset="50%" stop-color="var(--color-stop-2)" />
              <stop offset="100%" stop-color="var(--color-stop-3)" />
            </linearGradient>
            <path id='seaweed1' d='M32 64 C26 22 42 28 32 0 C38 48 26 48 31 64 Z' />
          </svg>
        </div>
      
        <div id='bubles'>
          <div className='bubble x1'></div>
          <div className='bubble x2'></div>
          <div className='bubble x3'></div>
          <div className='bubble x4'></div>
          <div className='bubble x5'></div>    
        </div>
      
        <div className='clownfish' style={{
                position: 'absolute',
                transition: 'transform .2s ease-in-out',
                transform: 'translate3d(' + this.state.fish.y + 'vw, ' + this.state.fish.x + 'vh, 0px)',
              }}>
          <div className='clownfishanimate1'>
            <div className='clownfishanimate2'>
              <div className='clownfish' style={{
                      transition: 'transform .2s ease-in-out',
                      transformOrigin: 'center',
                      transformStyle: 'preserve-3d',
                      perspective: '1000px',
                      animation: `rotation${this.state.fish.rotation}-${this.state.fish.rotation1}${this.state.fish.isFaceToLeft ? '-toleft': '-toright'}${this.state.fish.isFaceToLeft1 ? '-fromleft': '-fromright'}  ease-in-out 0.7s forwards`,
                      animationIterationCount: '1',
                      animationFillMode: 'forwards',
                    }} >
                  <div className='clownfish-body body2'>
                    <div className='clownfish-gill'></div>
                    <div className='clownfish-eye'>
                      <div className='clownfish-pupil'></div>
                    </div>
                  </div>
                  <div className='clownfish-uptail1'></div>
                  <div className='clownfish-uptail2'></div>
                  <div className='clownfish-downtail'></div>
                  <div className='clownfish-fin'></div>
                  <div className='clownfish-body'>
                    <div className='clownfish-gill'></div>
                    <div className='clownfish-eye'>
                      <div className='clownfish-pupil'></div>
                    </div>
                  </div>
                  <div className='clownfish-3ddepth'>
                    <div className='clownfish-3ddepth4'></div>
                    <div className='clownfish-3ddepth3'></div>
                    <div className='clownfish-3ddepth2'></div>
                    <div className='clownfish-3ddepth1'></div>
                  </div>

                  <div className='clownfish-midtailanimate'>
                    <div className='clownfish-midtailanimate2'>
                      <div className='clownfish-midtail'></div>
                    </div>
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