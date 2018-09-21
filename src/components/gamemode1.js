import React, {	Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFish, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from './cards';
import Fish from './fish';
import '../App.css';

library.add(faFish);
library.add(faArrowLeft);

//let iconListShapes = ['square','circle','play','certificate','star','heart'];
//let iconListVeichles = ['ambulance','car-side','helicopter','motorcycle','plane','rocket','ship','shuttle-van','space-shuttle','subway','sun','traffic-light','truck','truck-monster','truck-moving','truck-pickup','user-astronaut','user','user-graduate','user-md','user-ninja','user-secret','user-tie','fighter-jet'];
//let iconListObjects = ['anchor','bath','bell','binoculars','birthday-cake','bone','book','briefcase','camera-retro','chess','coffee','couch','dice','drum','fire-extinguisher','gamepad','globe-americas','graduation-cap','home','key','life-ring','lightbulb','microscope','mobile-alt','money-bill-alt','music','paint-brush','puzzle-piece','snowflake','tshirt','umbrella','utensil-spoon','utensils','wrench','eye','hand-paper','cut','phone'];
//let iconListLive = ['apple-alt','bug','crow','dove','feather-alt','fish','frog','kiwi-bird','leaf','lemon','pastafarianism','paw','piggy-bank','seedling','spa','tree'];
//let iconListSportss = [ 'baseball-ball','basketball-ball','bowling-ball','football-ball','futbol','golf-ball','table-tennis','volleyball-ball','dumbbell','hockey-puck','swimmer','walking','bicycle'];





class Game extends Component {

  constructor(props) {
		super(props);
    let iconList = ['square','circle','play','certificate','star','heart','ambulance','car-side','helicopter','motorcycle','plane','rocket','ship','shuttle-van','space-shuttle','subway','sun','traffic-light','truck','truck-monster','truck-moving','truck-pickup','user-astronaut','user','user-graduate','user-md','user-ninja','user-secret','user-tie','fighter-jet','anchor','bath','bell','binoculars','birthday-cake','bone','book','briefcase','camera-retro','chess','coffee','couch','dice','drum','fire-extinguisher','gamepad','globe-americas','graduation-cap','home','key','life-ring','lightbulb','microscope','mobile-alt','money-bill-alt','music','paint-brush','puzzle-piece','snowflake','tshirt','umbrella','utensil-spoon','utensils','wrench','eye','hand-paper','cut','phone','apple-alt','bug','crow','dove','feather-alt','fish','frog','kiwi-bird','leaf','lemon','pastafarianism','paw','piggy-bank','seedling','spa','tree','baseball-ball','basketball-ball','bowling-ball','football-ball','futbol','golf-ball','table-tennis','volleyball-ball','dumbbell','hockey-puck','swimmer','walking','bicycle'];
		//let iconList = this.props.data;

		let iconDrop0 = iconList.splice(Math.floor(Math.random() * iconList.length), 1);
		let iconDrop1 = iconList.splice(Math.floor(Math.random() * iconList.length), 1);

		this.state = {
			inDragMode: false,
			inNewCard: false,
			cardOffset: {
				x: 0,
				y: 0
			},

			cardList: iconList.slice(),
			cardDraw: {
				icon: iconDrop0.slice(),
				color: 0
			},
			cardDrop: [{
					icon: iconDrop0.slice(),
					color: 0
				},
				{
					icon: iconDrop1.slice(),
					color: 5
				},
			],
			cardColor: 3,
			maxcardDrop: 2,
			cardMach: 0,
			nextMach: 5,
      fishCommand: 0,
      fishSequence: [],
		};
	}


  componentDidMount() {
    
  }
	componentWillUnmount() {
    clearInterval(this.interval);
	}
  
  //parent function ***********
	goHomeScreen() {
		this.props.toHome();
	}

	//mouse and touch events ***********
	onMouseDown(ev) {
		this.setState({
			inDragMode: true,
			cardOffset: {
				x: 0,
				y: 0
			}
		});
	}
	onTouchStart(ev) {
		//ev.preventDefault(); //chrome error Treat Document Level Touch Event Listeners as Passive
		this.setState({
			inDragMode: true,
			cardOffset: {
				x: 0,
				y: 0
			}
		});
	}
	onMouseMove(ev) {
		ev.preventDefault();
		let x = ev.clientX + this.state.cardOffset.x;
		let y = ev.clientY + this.state.cardOffset.y;
		let target = ev.target;
		this.handleCardMove(target, x, y);
	}
	onTouchMove(ev) {
		//ev.preventDefault(); //chrome error Treat Document Level Touch Event Listeners as Passive
		let x = ev.touches[0].pageX;
		let y = ev.touches[0].pageY;
		let target = ev.touches[0].target;
		this.handleCardMove(target, x, y);
	}
	onMouseUp(ev) {
		//ev.preventDefault();
		this.handleCardReset();
	}
	onTouchEnd(ev) {
		ev.preventDefault();
		this.handleCardReset();
	}

  //cart stuff ***********
	handleCardReset() {
		//Uncomment if you want on release click/touch the card back to its initial position
		/*
	  //reset to start poss
    let card = document.getElementsByClassName("draw");
    card[0].style.left = "50%";
    card[0].style.top = "70%";
   */
		this.setState({
			inDragMode: false,
			inNewCard: false,
			cardOffset: {
				x: 0,
				y: 0
			}
		});
	}
	handleCardMove(ev, X, Y) {
		if (this.state.inDragMode && !this.state.inNewCard) {
			let Card = ev;
			let DrawId = this.state.cardDraw.icon[0] + this.state.cardDraw.color;
			if (Card.id !== DrawId) {
				Card = Card.parentNode;
				if (Card.id !== DrawId) {
					Card = Card.parentNode;
					if (Card.id !== DrawId) {
						Card = Card.parentNode;
					}
				}
			}
			let left = Math.max(X, 41); //1px left border + correction see Card.style.left
			let top = Math.max(Y, 41); //1px top border + correction

			left = Math.min(left, window.innerWidth - 41);
			top = Math.min(top, window.innerHeight - 41);

			Card.style.left = Math.floor(left - 45) + 'px';
			Card.style.top = Math.floor(top - 45) + 'px';


			let elements = document.elementsFromPoint(left, top);
			// make sure an element was found - some areas on the page may have no elements
			if (elements) {
				let Drop = false;
				elements.forEach(function(element) {
					if (element.className === 'card') {
						Drop = element;
					}
				});
				if (Drop !== false) {
					this.handleCardDrop(Card, Drop);
				}
			}
		}
	}
	handleCardDrop(card, drop) {
		if ((card.id === drop.id) && !this.state.inNewCard) {

			//new list,card,draw,drop,color
			let newcolor = this.state.cardColor;

			let newlist = this.state.cardList.slice();
			newlist.push(this.state.cardDraw.icon[0]); //put back draw to the list

			let newdrop = this.state.cardDrop.slice();

			let key = newdrop.indexOf(this.state.cardDraw); // find current draw index in drop
			//1st mach ALWAYS get key = -1.... WHY!!!!????
			if (key < 0) { // someone explain to me why
				key = 0; //bug fixed?? -.-
			}

			//remplace the drop for new card
			newdrop.splice(key, 1, {
				icon: newlist.splice(0, 1),
				color: this.nextcolor(newcolor)
			}); 
			newcolor = this.nextcolor(newcolor);

			// score update
			let newcardMach = this.state.cardMach;
			let newnextMach = this.state.nextMach;
			let newmaxcardDrop = this.state.maxcardDrop;
			newcardMach++;

			if (newcardMach > newnextMach) {
				newnextMach = Math.floor(newnextMach * 2.9);
				newmaxcardDrop++;
			}
			if (newmaxcardDrop > 6) {
				newmaxcardDrop = 6;
			}

			if (newdrop.length < newmaxcardDrop) {
				//add new card to drop (drop length + 1)
				key = Math.floor(Math.random() * newdrop.length);
				newdrop.splice(key, 0, {
					icon: newlist.splice(0, 1),
					color: this.nextcolor(newcolor)
				});
				newcolor = this.nextcolor(newcolor);
			}

			key = Math.floor(Math.random() * newdrop.length); //pick random drop

			let newdraw = newdrop.splice(key, 1); //move "key" index drop to draw
			newdrop.splice(key, 0, newdraw[0]); //copy again in drop .... need bether way to do this

			window.navigator.vibrate([200, 100, 200]); // vibrete the phone

			this.setState({
				inNewCard: true,
				cardList: newlist,
				cardDraw: newdraw[0],
				cardDrop: newdrop,
				cardColor: newcolor,
				cardMach: newcardMach,
				nextMach: newnextMach,
				maxcardDrop: newmaxcardDrop,
			});
			this.commandfish();
			this.handleCardReset();
		}
	}
	nextcolor(color) {
		let newcolor = color + 5; //calculate next color
		if (newcolor > 11) {
			newcolor = newcolor - 12;
		}
		return newcolor;
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
		this.state.cardDrop.forEach((drop) => {
			dropcards.push(
				<div key={drop.icon[0] + drop.color} id={drop.icon[0] + drop.color} className='card'>
					<Card icon={drop.icon} color={drop.color} size={3} />
				</div>
			);
		});

		return ( 
			<div className='container-drag'>
        <Fish command={this.state.fishCommand} done={this.commanddone} speed={0.5} />
        <div className='backmenu'
          onClick={() => this.goHomeScreen()}
        >
					<FontAwesomeIcon icon={faArrowLeft} size='2x' />
				</div>
				<div className='score'>
					{this.state.cardMach}
				</div>
				<div
					key={this.state.cardDraw.icon[0] + this.state.cardDraw.color}
					id={this.state.cardDraw.icon[0] + this.state.cardDraw.color}
					className='draw'

					onMouseDown={(e)=>this.onMouseDown(e)}
					onMouseMove={(e)=>this.onMouseMove(e)}
					onMouseUp={(e)=>this.onMouseUp(e)}
					onTouchStart={(e)=>this.onTouchStart(e)}
					onTouchMove={(e)=>this.onTouchMove(e)}
					onTouchEnd={(e)=>this.onTouchEnd(e)}
					onTouchCancel={(e)=>this.onTouchEnd(e)}
				>
					<Card icon={this.state.cardDraw.icon} color={this.state.cardDraw.color} size={4} />
				</div>
				<div className='drophere'>
					{dropcards}
				</div>
			</div>
		);
	}
}


export default Game;