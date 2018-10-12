import React, {	Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFish, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from './cards';
import Fish from './fish';
import '../App.css';

library.add(faFish);
library.add(faArrowLeft);

class Game extends Component {

  constructor(props) {
		super(props);
    let iconList = ['square','circle','play','certificate','star','heart','ambulance','car-side','helicopter','motorcycle','plane','rocket','ship','shuttle-van','space-shuttle','subway','sun','traffic-light','truck','truck-monster','truck-moving','truck-pickup','user-astronaut','user','user-graduate','user-md','user-ninja','user-secret','user-tie','fighter-jet','anchor','bath','bell','binoculars','birthday-cake','bone','book','briefcase','camera-retro','chess','coffee','couch','dice','drum','fire-extinguisher','gamepad','globe-americas','graduation-cap','home','key','life-ring','lightbulb','microscope','mobile-alt','money-bill-alt','music','paint-brush','puzzle-piece','snowflake','tshirt','umbrella','utensil-spoon','utensils','wrench','eye','hand-paper','cut','phone','apple-alt','bug','crow','dove','feather-alt','fish','frog','kiwi-bird','leaf','lemon','pastafarianism','paw','piggy-bank','seedling','spa','tree','baseball-ball','basketball-ball','bowling-ball','football-ball','futbol','golf-ball','table-tennis','volleyball-ball','dumbbell','hockey-puck','swimmer','walking','bicycle'];
		//let iconList = this.props.data;

		this.state = {

			cardList: iconList.slice(),
			cardDrop: [],
			cardColor: 0,
      currentCard: null,
			maxcardDrop: 2,
			cardMach: 0,
			nextMach: 6,
      fishCommand: 0,
      fishSequence: [],
		};
	}


  componentDidMount() {
    this.newdraw();
  }
	componentWillUnmount() {
    clearInterval(this.interval);
	}
  
  //parent function ***********
	goHomeScreen() {
		this.props.toHome();
	}
  
	nextcolor(color) {
		let newcolor = color + 5; //calculate next color
		if (newcolor > 11) {
			newcolor = newcolor - 12;
		}
		return newcolor;
	}

  newdraw() {
    clearInterval(this.intervalflip);
    let i = 0;
    let newCards = [];
    let color = this.state.cardColor;
    let icon = [];
    let newlist = this.state.cardList.slice();
    // generate the new cards
    for (i = 0; i < this.state.maxcardDrop; i++) {
      icon = newlist.splice(Math.floor(Math.random() * newlist.length), 1);
      newCards.push({
        icon: icon,
        color: color,
        flip: false,
        id: i * 2,
      });
      newCards.push({
        icon: icon,
        color: color,
        flip: false,
        id: (i * 2) + 1,
      });
      color = this.nextcolor(color);
    }
    //shuffle the cards
    let rndpos = 0;
    for (i = 0; i < (this.state.maxcardDrop * 2); i++) {      
      rndpos = Math.floor(Math.random() * (newCards.length - 1));
      let shuffle = newCards.splice(i, 1);
			newCards.splice(rndpos, 0, shuffle[0]);
    }
    //return the old cards to the list
    for (i = 0; i < this.state.cardDrop.length; i++) {
      // check if icon already exist (2 card are the same)
      if (newlist.indexOf(this.state.cardDrop[i].icon[0]) < 0) {
        //put back the old cards to the list
			  newlist.push(this.state.cardDrop[i].icon[0]);
      }
    }
    this.setState({
        currentCard: null,
        cardColor: color,
        cardList: newlist,
        cardDrop: newCards,
     });
  }
  
  flipCard(ev, id) {
    ev.preventDefault();
    let cards = this.state.cardDrop.slice();
    let currentCard = this.state.currentCard;
    let cardMach = this.state.cardMach;
    
    if ((currentCard === null) && !cards[id].flip) {
      cards[id].flip = true;
      this.setState({ 
        currentCard: id,
        cardDrop: cards,
      });
    }
    
    if ((currentCard !== null) && (currentCard !== id) && !cards[id].flip) {
      cards[id].flip = true;
      if (cards[currentCard].icon[0] === cards[id].icon[0] ) {
        window.navigator.vibrate([200, 100, 200]); // vibrete the phone
        cardMach = cardMach + 1;
        this.commandfish();
      } else {
        //call delay flip funtion
        this.intervalflip = setInterval(() => this.delayflip(currentCard, id), 500);
      }
      this.setState({ 
        currentCard: null,
        cardDrop: cards,
        cardMach: cardMach,
      });
    }
  }
  
  delayflip(id1, id2){
    clearInterval(this.intervalflip);
    let cards = this.state.cardDrop.slice();
    cards[id1].flip = false;
    cards[id2].flip = false;
     this.setState({ 
        cardDrop: cards,
      });
  }

  //fish ***********
  commandfish() {
		let moveTo = (Math.floor(Math.random() * 4) + 1) * 2;
    let updateSequence = this.state.fishSequence;
    let nextCommand = this.state.fishCommand;
    updateSequence.push(moveTo);
    if(updateSequence.length === 1 && nextCommand === 0) {
        nextCommand = moveTo;
        updateSequence = [];
    }
		this.setState({
        fishSequence: updateSequence,
        fishCommand: nextCommand,
     });
	}
  commanddone = () => {
    // update command on fish
    // get next command fron array and put in the execute query?
    let updateSequence = this.state.fishSequence;
    let nextCommand = 0;
    if (updateSequence.length > 0) {
      nextCommand = updateSequence.splice(0, 1);
      nextCommand = nextCommand[0];
    }
     this.setState({
        fishSequence: updateSequence,
        fishCommand: nextCommand,
     });
 }

	render() {

		let dropcards = [];
    let newGame = true;
		this.state.cardDrop.forEach((drop, index) => {
        newGame = newGame && drop.flip;
        dropcards.push(
          <div       
            key={drop.id}
            id={drop.icon[0] + drop.color}
            className='card cardmenu'
            style={{
              top: (Math.floor(index / 4) * 30 + 5) + '%',
              left: `${ (index % 4) * 20 + 10}%`,
            }}
            onClick={(e) => this.flipCard(e,index)}

          >
          {!drop.flip && <Card icon={['question'] } color={this.state.cardColor} size={4} /> }
          {drop.flip && <Card icon={ drop.icon } color={drop.color} size={4} />}
          </div>
        );
		});
    if (newGame) {
      let maxcards = this.state.maxcardDrop;
      let nextMach = this.state.nextMach;
      let cardMach = this.state.cardMach;
      
      if (cardMach >= nextMach){
        maxcards = maxcards + 1;
        nextMach = nextMach + (maxcards * 2)
        if (maxcards > 6 ){
          maxcards = 6;
        }
        this.setState({ 
          maxcardDrop: maxcards,
          nextMach: nextMach,
        });
      }
      this.newdraw();
    }

		return ( 
			<div className='container-drag'>
        <Fish command={this.state.fishCommand} done={this.commanddone} speed={0.5} />
        <div className='backmenu'
          onClick={() => this.goHomeScreen()}
        >
					<FontAwesomeIcon icon={faArrowLeft} size='2x' />
				</div>
				<div className='score'  style={{fontSize: '5em'}}>
					{this.state.cardMach}
				</div>
				<div className='drophere'>
					{dropcards}
				</div>
			</div>
		);
	}
}

export default Game;
