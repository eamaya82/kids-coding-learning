import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Game from './components/game';

import './App.css';


let iconlist_shapes = ['square','circle','play','certificate','star','heart'];
let iconlist_veichles = ['ambulance','car-side','helicopter','motorcycle','plane','rocket','ship','shuttle-van','space-shuttle','subway','sun','traffic-light','truck','truck-monster','truck-moving','truck-pickup','user-astronaut','user','user-graduate','user-md','user-ninja','user-secret','user-tie','fighter-jet'];
let iconlist_objects = ['anchor','bath','bell','binoculars','birthday-cake','bone','book','briefcase','camera-retro','chess','coffee','couch','dice','drum','fire-extinguisher','gamepad','globe-americas','graduation-cap','home','key','life-ring','lightbulb','microscope','mobile-alt','money-bill-alt','music','paint-brush','puzzle-piece','snowflake','tshirt','umbrella','utensil-spoon','utensils','wrench','eye','hand-paper','cut','phone'];
let iconlist_live = ['apple-alt','bug','crow','dove','feather-alt','fish','frog','kiwi-bird','leaf','lemon','pastafarianism','paw','piggy-bank','seedling','spa','tree'];
let iconlist_sportss = [ 'baseball-ball','basketball-ball','bowling-ball','football-ball','futbol','golf-ball','table-tennis','volleyball-ball','dumbbell','hockey-puck','swimmer','walking','bicycle'];


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showgame: false,
      iconlist: '',
     };      
  }

  loadgamemodes = () => {
    let modes = [
        {name: "Shapes", icon: 'shapes', list: iconlist_shapes },
        {name: "Vehicles", icon: 'car-side', list: iconlist_veichles},
        {name: "Objects", icon: 'utensils',list: iconlist_objects},
        {name: "Live", icon: 'frog', list: iconlist_live},
        {name: "Sports", icon: 'futbol', list: iconlist_sportss},
      ];
    let gamemodes = [];
    modes.forEach ((mode) => {
      gamemodes.push(
        <div key={mode.name}
          className="card"
          onMouseDown = {(e)=>this.startgame(mode.list)}
          onTouchStart = {(e)=>this.startgame(mode.list)}
        >
          <FontAwesomeIcon icon={mode.icon} size="3x" />
          {mode.name}
        </div>
      );
    });
    if (!this.state.showgame) {
      return (<div className="drophere">{gamemodes}</div>);
    } else {
      return "";
    }
  }
 
  startgame = (list) => {
     this.setState({
        showgame: true,
        iconlist: list,
     });
 }
  

  render() {
    let chosegame = this.loadgamemodes();
    
    return (
      <div>
        {chosegame}
        { (this.state.showgame) && <Game list={this.state.iconlist} /> }
      </div>
    );
  }
}


export default App;
