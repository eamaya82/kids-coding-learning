import React, { Component } from 'react';

import Game1 from './components/gamemode1';
import Game2 from './components/gamemode2';
import Game4 from './components/gamemode4';

import './App.css';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showGame: 0,
      iconList: '',
     };      
  }

  
  openFullscreen(){
    //for test on web mobile browser
   /* let elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }*/
  }
  
  closeFullscreen() {
    //for test on web mobile browser
    /*if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }*/
  }
  
  loadgamemodes () {
    let modes = [
        {name: 'Pair', icon: 'menugamemode1.svg', group: 0, mode: 1, data: [<svg width='90' height='70' xmlns='http://www.w3.org/2000/svg'>
      <rect id='svgg1_r1' height='26' width='26' y='4' x='4' strokeWidth='1.5' stroke='#7f0000' fill='red' rx='4' />
      <rect id='svgg1_b1' height='26' width='26' y='4' x='60' strokeWidth='1.5' stroke='blue' fill='blue' rx='4' />
      <rect id='svgg1_r2' height='26' width='26' y='40' x='32' strokeWidth='1.5' stroke='#7f0000' fill='red' rx='4' />
      <animate  xlinkHref="#svgg1_r2" attributeName="x" from="32" to="4" dur="1s" repeatCount="indefinite" />
      <animate  xlinkHref="#svgg1_r2" attributeName="y" from="40" to="4" dur="1s" repeatCount="indefinite" /></svg>]},

        {name: 'Move', icon: 'arrows-alt', group: 4, mode: 2, data: [<svg width='90' height='70' xmlns='http://www.w3.org/2000/svg'>
      <rect id='svgg2_r1' height='26' width='26' y='4' x='4' strokeWidth='1.5' stroke='#7f0000' fill='red' rx='4' />
      <path id='svgg2_2' transform='rotate(-90 23 49)' d='m5,43l13,-13l13,13l-6,0l0,13l-13,0l0,-13l-6,0l-1,0z' strokeWidth='1.5' stroke='#7f0000' fill='#faa' />
      <path id='svgg2_3' transform='rotate(90 66 50)'  d='m56,45l13,-13l13,13l-6,0l0,13l-13,0l0,-13l-6,0l-1,0z' strokeWidth='1.5' stroke='#7f0000' fill='#faa' />
      <animate xlinkHref="#svgg2_r1" attributeName="x" from="60" to="4" dur="1.5s" repeatCount="indefinite" values="60; 4; 60" keyTimes="0; 0.5; 1" /></svg>]},

        {name: 'Seek', icon: 'grip-horizontal', group: 8, mode: 4, data: [<svg width='90' height='70' xmlns='http://www.w3.org/2000/svg'>
      <rect id='svgg4_r1' height='26' width='26' y='4' x='4' strokeWidth='1.5' stroke='#7f0000' fill='red' rx='4' />
      <rect id='svgg4_b1' height='26' width='26' y='4' x='60' strokeWidth='1.5' stroke='blue' fill='blue' rx='4' />
      <rect id='svgg4_g1' height='26' width='26' y='40' x='4' strokeWidth='1.5' stroke='green' fill='green' rx='4' />
      <rect id='svgg4_r2' height='26' width='26' y='40' x='60' strokeWidth='1.5' stroke='#7f0000' fill='red' rx='4' />
      <animate  xlinkHref="#svgg4_r1" attributeName="width" from="26" to="0" dur="1s" repeatCount="indefinite" values="26; 0; 24" keyTimes="0; 0.5; 1" />
      <animate  xlinkHref="#svgg4_r1" attributeName="x" from="4" to="17" dur="1s" repeatCount="indefinite" values="4; 17; 4" keyTimes="0; 0.5; 1"/>
      <animate  xlinkHref="#svgg4_r2" attributeName="width" from="26" to="0" dur="1s" repeatCount="indefinite" values="26; 0; 24" keyTimes="0; 0.5; 1" />
      <animate  xlinkHref="#svgg4_r2" attributeName="x" from="60" to="73" dur="1s" repeatCount="indefinite" values="60; 73; 60" keyTimes="0; 0.5; 1"/></svg>]},

      

        /* clone dummy 
        {name: 'Shapes', icon: 'shapes', group: 4, data: [], mode: 1},
        {name: 'Vehicles', icon: 'car-side', group: 4, data: [], mode: 1},
        {name: 'Objects', icon: 'utensils', group: 4, data: [], mode: 1},
        {name: 'Life', icon: 'frog', group: 8, data: [], mode: 1},
        {name: 'Sports', icon: 'futbol', group: 8, data: [], mode: 1},

        {name: 'Shapes', icon: 'shapes', group: 2, data: [], mode: 1},
        {name: 'Vehicles', icon: 'car-side', group: 2, data: [], mode: 1},
        {name: 'Objects', icon: 'utensils', group: 6, data: [], mode: 1},
        {name: 'Life', icon: 'frog', group: 6, data: [], mode: 1},
        {name: 'Sports', icon: 'futbol', group: 10, data: [], mode: 1},
        */
      ];
    let gameModes = [];
    modes.forEach ((mode,index) => {
      gameModes.push(
        <div key={mode.name}
          style={{
            top: `${ Math.floor(index / 4) * 33 +5}%`,
            left: `${ (index % 4) * 20 + 15}%`,
            color: `hsl(${ mode.group * 30 }, 75%, 50%)`,
            backgroundColor: `hsl(${ mode.group * 30 }, 100%, 90%)`,
            border: `5px solid hsl(${ mode.group * 30 }, 100%, 25%)`,
          }}
          className='card cardmenu'
          onClick={(e) => this.startgame(e, mode.mode, mode.data)}
        >
         {mode.data}
        </div>
      );
    });
    if (this.state.showGame === 0) {
      return (<div className='bg'>{gameModes}</div>);
    } else {
      return '';
    }
  }
 
  startgame(ev, mode, data) {
    ev.preventDefault();
    this.openFullscreen();
     this.setState({
        showGame: mode,
        data: data.slice(),
     });
 }

backmenu = () => {
  this.closeFullscreen();
  this.setState({
    showGame: 0,
    data: '',
  });
}

  render() {
    let choseGame = this.loadgamemodes();
    return (
      <div>
        {choseGame}
        { (this.state.showGame === 1) && <Game1 data={this.state.data} toHome={this.backmenu} /> }
        { (this.state.showGame === 2) && <Game2 data={this.state.data} toHome={this.backmenu} /> }
        { (this.state.showGame === 4) && <Game4 data={this.state.data} toHome={this.backmenu} /> }
      </div>
    );
  }
}


export default App;
