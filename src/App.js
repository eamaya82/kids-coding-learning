import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Game from './components/game';

import './App.css';


let iconListShapes = ['square','circle','play','certificate','star','heart'];
let iconListVeichles = ['ambulance','car-side','helicopter','motorcycle','plane','rocket','ship','shuttle-van','space-shuttle','subway','sun','traffic-light','truck','truck-monster','truck-moving','truck-pickup','user-astronaut','user','user-graduate','user-md','user-ninja','user-secret','user-tie','fighter-jet'];
let iconListObjects = ['anchor','bath','bell','binoculars','birthday-cake','bone','book','briefcase','camera-retro','chess','coffee','couch','dice','drum','fire-extinguisher','gamepad','globe-americas','graduation-cap','home','key','life-ring','lightbulb','microscope','mobile-alt','money-bill-alt','music','paint-brush','puzzle-piece','snowflake','tshirt','umbrella','utensil-spoon','utensils','wrench','eye','hand-paper','cut','phone'];
let iconListLive = ['apple-alt','bug','crow','dove','feather-alt','fish','frog','kiwi-bird','leaf','lemon','pastafarianism','paw','piggy-bank','seedling','spa','tree'];
let iconListSportss = [ 'baseball-ball','basketball-ball','bowling-ball','football-ball','futbol','golf-ball','table-tennis','volleyball-ball','dumbbell','hockey-puck','swimmer','walking','bicycle'];


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showGame: 0,
      iconList: '',
     };      
  }

  loadgamemodes () {
    let modes = [
        {name: 'Shapes', icon: 'shapes', group: 0, list: iconListShapes },
        {name: 'Vehicles', icon: 'car-side', group: 0, list: iconListVeichles},
        {name: 'Objects', icon: 'utensils', group: 0, list: iconListObjects},
        {name: 'Life', icon: 'frog', group: 0, list: iconListLive},
        {name: 'Sports', icon: 'futbol', group: 0, list: iconListSportss},

        /* clone dummy 
        {name: 'Shapes', icon: 'shapes', group: 4, list: iconListShapes },
        {name: 'Vehicles', icon: 'car-side', group: 4, list: iconListVeichles},
        {name: 'Objects', icon: 'utensils', group: 4, list: iconListObjects},
        {name: 'Life', icon: 'frog', group: 8, list: iconListLive},
        {name: 'Sports', icon: 'futbol', group: 8, list: iconListSportss},

        {name: 'Shapes', icon: 'shapes', group: 2, list: iconListShapes },
        {name: 'Vehicles', icon: 'car-side', group: 2, list: iconListVeichles},
        {name: 'Objects', icon: 'utensils', group: 6, list: iconListObjects},
        {name: 'Life', icon: 'frog', group: 6, list: iconListLive},
        {name: 'Sports', icon: 'futbol', group: 10, list: iconListSportss},
        */
      ];
    let gameModes = [];
    modes.forEach ((mode,index) => {
      gameModes.push(
        <div key={mode.name}
          style={{
            top: `${ Math.floor(index / 5) * 33 +5}%`,
            left: `${ (index % 5) * 20 + 5}%`,
            color: `hsl(${ mode.group * 30 }, 75%, 50%)`,
            backgroundColor: `hsl(${ mode.group * 30 }, 100%, 90%)`,
            border: `5px solid hsl(${ mode.group * 30 }, 100%, 25%)`,
          }}
          className='card cardmenu'
          onMouseDown={(e) => this.startgame(mode.list)}
          onTouchStart={(e) => this.startgame(mode.list)}
        >
          <FontAwesomeIcon icon={mode.icon} size='3x' />
          {mode.name}
        </div>
      );
    });
    if (!this.state.showGame) {
      //return (<div className='drophere'>{gameModes}</div>);
      return (<div className='sea'>{gameModes}</div>);
      //return gameModes;
    } else {
      return '';
    }
  }
 
  startgame(list) {
     this.setState({
        showGame: 1,
        iconList: list.slice(),
     });
 }

backmenu = () => {
     this.setState({
        showGame: 0,
        iconList: '',
     });
 }


  render() {
    let choseGame = this.loadgamemodes();
    
    return (
      <div>
        {choseGame}
        { (this.state.showGame === 1) && <Game list={this.state.iconList} toHome={this.backmenu} /> }
      </div>
    );
  }
}


export default App;
