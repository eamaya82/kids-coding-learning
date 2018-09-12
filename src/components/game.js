import React, {	Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFish, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from './cards';
import '../App.css';

library.add(faFish);
library.add(faArrowLeft);

class Game extends Component {

  constructor(props) {
		super(props);
		let iconList = this.props.list;

		let iconDrop0 = iconList.splice(Math.floor(Math.random() * iconList.length), 1);
		let iconDrop1 = iconList.splice(Math.floor(Math.random() * iconList.length), 1);
		let iconDrop2 = iconList.splice(Math.floor(Math.random() * iconList.length), 1);

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
				{
					icon: iconDrop2.slice(),
					color: 10
				},
			],
			cardColor: 3,
			maxcardDrop: 3,
			cardMach: 0,
			nextMach: 10,
			fish: {
				x: 60,
				y: 50,
				rotation: 0,
			},
		};
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
				newnextMach = newnextMach * 3;
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
			this.randommovefish();
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
  randommovefish() {
		clearInterval(this.interval); //clear previus interval
		let moveTo = Math.floor(Math.random() * 4);
		switch (moveTo) {
			case 0:
				this.interval = setInterval(() => this.movefish(-1, 0), 100);
				break;
			case 1:
				this.interval = setInterval(() => this.movefish(1, 0), 100);
				break;
			case 2:
				this.interval = setInterval(() => this.movefish(0, -1), 100);
				break;
			case 3:
				this.interval = setInterval(() => this.movefish(0, 1), 100);
				break;
			default:
		}
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
		x = x / 4;
		y = y / 4;
		if (fish.x <= 5) {
			x = 0;
			fish.x = 6;
			clearInterval(this.interval);
		}
		if (fish.x >= 87) {
			x = 0;
			fish.x = 86;
			clearInterval(this.interval);
		}
		if (fish.y <= 5) {
			y = 0;
			fish.y = 6;
			clearInterval(this.interval);
		}
		if (fish.y >= 90) {
			y = 0;
			fish.y = 89;
			clearInterval(this.interval);
		}

		this.setState(prevState => ({
			fish: {
				x: prevState.fish.x + x,
				y: prevState.fish.y + y,
				rotation: fish.rotation
			}
		}));
	}

	render() {
		let dropcards = [];
		this.state.cardDrop.forEach((drop) => {
			dropcards.push(
				<div key={drop.icon[0] + drop.color} id={drop.icon[0] + drop.color} className='card'>
					<Card icon={drop.icon} color={drop.color} size='3' />
				</div>
			);
		});

		return ( 
			<div className='container-drag'>
				<div className='sea'></div>
        <div className='backmenu'
          onMouseDown={() => this.goHomeScreen()}
          onTouchStart={() => this.goHomeScreen()}
        >
					<FontAwesomeIcon icon={faArrowLeft} size='2x' />
				</div>
				<div className='score'>
					{this.state.cardMach}
				</div>
				<div
					className='fish'
					style={{
						top: this.state.fish.x + '%',
						left: this.state.fish.y + '%',
					}}
				>
					<FontAwesomeIcon icon={faFish} size='3x' rotation={this.state.fish.rotation} />
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
					<Card icon={this.state.cardDraw.icon} color={this.state.cardDraw.color} size='4' />
				</div>
				<div className='drophere'>
					{dropcards}
				</div>
			</div>
		);
	}
}


export default Game;