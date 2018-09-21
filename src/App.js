import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        {name: 'Pair', icon: 'clone', group: 0, data: [], mode: 1},
        {name: 'Move', icon: 'arrows-alt', group: 4, data: [], mode: 2},
        {name: 'Seek', icon: 'grip-horizontal', group: 8, data: [], mode: 4},
      

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
          <FontAwesomeIcon icon={mode.icon} size='3x' />
          {mode.name}
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
