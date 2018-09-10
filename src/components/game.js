import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFish } from '@fortawesome/free-solid-svg-icons'
import Card from './cards';
import '../App.css';

library.add(faFish);


class Game extends Component {
  
  constructor(props) {
    super(props);
		let iconlist = this.props.list;
		
		let icondrop0 = iconlist.splice(Math.floor(Math.random() * iconlist.length),1);
		let icondrop1 = iconlist.splice(Math.floor(Math.random() * iconlist.length),1);
		let icondrop2 = iconlist.splice(Math.floor(Math.random() * iconlist.length),1);

    this.state = {
      inDragMode: false,
      inNewCard: false,
      cardOffset: { x: 0,
                    y: 0 },
      
      cardlist: iconlist.slice(),
      carddraw: {icon: icondrop0.slice(), color: 0},
      carddrop: [
                {icon: icondrop0.slice(), color: 0},
                {icon: icondrop1.slice(), color: 5},
                {icon: icondrop2.slice(), color: 10},
                ],
      cardcolor: 3,
			maxcarddrop: 3,
			cardmach: 0,
			nextmach: 10,
      fish: { x: 60,
            y: 50,
            dx: 0,
            dy: 0,
            rotation: 0,
            flip: ""},
     };      
  }
  

 movefish = (x,y) => {
   let fish = this.state.fish;
   if (x === -1 && y === 0){
     fish.rotation = 270;
   } 
   if (x === 1 && y === 0){
     fish.rotation = 90;
   }
   if (x === 0 && y === -1){
     fish.rotation = 180
   } 
   if (x === 0 && y === 1){
     fish.rotation = 0
   } 
   x = x/2;
   y = y/2;
    if (fish.x <= 10 ){
       x = 0;
       fish.x = 10;
     }
    if (fish.x >= 85 ){
       x = 0;
       fish.x = 85;
     }
    if (fish.y <= 10 ){
       y = 0;
       fish.y = 10;
     }
    if (fish.y >= 90 ){
       y = 0;
       fish.y = 90;
     }
   
    this.setState(prevState => ({
      fish :{
          x: prevState.fish.x + x,
          y: prevState.fish.y + y,
          rotation: fish.rotation
      }
    }));
}
 randommovefish = () =>{
   clearInterval(this.interval); //clear previus interval
   let moveto = Math.floor(Math.random() * 4);
      switch(moveto) {
        case 0:
          this.interval = setInterval(() => this.movefish(-1,0), 100);
          break;
        case 1:
          this.interval = setInterval(() => this.movefish(1,0), 100);
          break;
        case 2:
          this.interval = setInterval(() => this.movefish(0,-1), 100);
          break;
        case 3:
          this.interval = setInterval(() => this.movefish(0,1), 100);
          break;
        default:
      }  
 }
 
 componentWillUnmount() {
  clearInterval(this.interval);
 } 
 
//start ************
 onMouseDown = (ev) => {
   this.setState(prevState => ({
     inDragMode: true,
     cardOffset: {x: 0, y: 0} //{x: ev.clientX, y: ev.clientY}
   }));
 }
 onTouchStart = (ev) => {
   //ev.preventDefault(); //chrome error Treat Document Level Touch Event Listeners as Passive
    this.setState({
     inDragMode: true,
     cardOffset: {x: 0, y: 0}
   });
 }
//move **********
 onMouseMove = (ev) => {
   ev.preventDefault();
   let x = ev.clientX + this.state.cardOffset.x;
   let y = ev.clientY + this.state.cardOffset.y;
   let target = ev.target;
   this.handleCardMove(target,x,y);
 }
 onTouchMove = (ev) => {
   //ev.preventDefault(); //chrome error Treat Document Level Touch Event Listeners as Passive
   let x = ev.touches[0].pageX;
   let y = ev.touches[0].pageY;
   let target = ev.touches[0].target;
   this.handleCardMove(target,x,y);
 }
//end ***********
 onMouseUp = (ev) => {
   //ev.preventDefault();
  this.handleCardReset();
 }
 onTouchEnd = (ev) => {
   ev.preventDefault();
  this.handleCardReset();
 }
 
 handleCardReset(){
	  //Uncomment if you want on release click/touch the card back to its initial position
   /*
	  //reset to start poss
    let card = document.getElementsByClassName("draw");
    card[0].style.left = "50%";
    card[0].style.top = "70%";
   */
   this.setState(prevState => ({
     inDragMode: false,
     inNewCard: false,
     cardOffset: {x: 0, y: 0}
   }));
 }
 
 handleCardMove = (ev,X,Y) => {
  if (this.state.inDragMode && !this.state.inNewCard){
   let Card = ev;
     if (Card.id !== (this.state.carddraw.icon[0] + this.state.carddraw.color)){
       Card = Card.parentNode;
       if (Card.id !== (this.state.carddraw.icon[0] + this.state.carddraw.color)){
         Card = Card.parentNode;
         if (Card.id !== (this.state.carddraw.icon[0] + this.state.carddraw.color)){
          Card = Card.parentNode;
         }
       }
     }
   let left = Math.max(X, 41); //1px left border + correction see Card.style.left
   let top = Math.max(Y, 41); //1px top border + correction

   left = Math.min(left, window.innerWidth - 41);
   top = Math.min(top, window.innerHeight - 41);

   Card.style.left = Math.floor(left -  45 ) + "px";
   Card.style.top = Math.floor(top - 45 ) + "px";


   let elements = document.elementsFromPoint(left, top);
    // make sure an element was found - some areas on the page may have no elements
    if (elements) {
      let Drop = false;
      elements.forEach(function(element,index) {
        if (element.className === "card")
        Drop = element
      });
      if(Drop !== false ) {
        this.handleCardDrop(Card, Drop);
      }
    }
  }
 }
 
 handleCardDrop = (card, drop) => {
   if ((card.id === drop.id) && !this.state.inNewCard) {
     
     //new list,card,draw,drop,color
		 let newcolor = this.state.cardcolor;
		 
     let newlist = this.state.cardlist.slice();
     newlist.push(this.state.carddraw.icon[0]); //put back draw to the list
     
     let newdrop = this.state.carddrop.slice();
          
     let key = newdrop.indexOf(this.state.carddraw); // find current draw index in drop
     //1st mach ALWAYS get key = -1.... WHY!!!!????
     if (key < 0) { // someone explain to me why
       key = 0; //bug fixed?? -.-
     }
     
     newdrop.splice(key,1, { icon: newlist.splice(0,1), color: this.nextcolor(newcolor) }); //remplace the drop for new card
		 newcolor = this.nextcolor(newcolor);
		 
		 // score update
		 let newcardmach = this.state.cardmach;
		 let newnextmach = this.state.nextmach;
		 let newmaxcarddrop = this.state.maxcarddrop;
		 newcardmach++;
		 
		 if (newcardmach > newnextmach){
			 newnextmach = newnextmach * 3;
			 newmaxcarddrop++
		 }
		 if (newmaxcarddrop > 6) {
			 newmaxcarddrop = 6;
		 }

     if (newdrop.length < newmaxcarddrop){
			 //add new card to drop (drop length + 1)
			 key = Math.floor(Math.random() * newdrop.length);
			 newdrop.splice(key,0, { icon: newlist.splice(0,1), color: this.nextcolor(newcolor) });
			 newcolor = this.nextcolor(newcolor);
		 }
		 
		 key = Math.floor(Math.random() * newdrop.length); //pick random drop

     let newdraw = newdrop.splice(key,1); //move "key" index drop to draw
     newdrop.splice(key,0,newdraw[0]); //copy again in drop .... need bether way to do this

		 window.navigator.vibrate([200, 100, 200]); // vibrete the phone

     this.setState({
       inNewCard: true,
       cardlist: newlist,
       carddraw: newdraw[0],
       carddrop: newdrop,
       cardcolor: newcolor,
			 cardmach: newcardmach,
			 nextmach: newnextmach,
			 maxcarddrop: newmaxcarddrop,
     });
    this.randommovefish();
    this.handleCardReset();
   }
 }
 
 nextcolor = (color) => {
	 let newcolor = color + 5; //calculate next color
     if (newcolor > 11){
       newcolor = newcolor - 12;
     }
	 return newcolor;
 }
 

  render() {
    let dropcards = [];
    this.state.carddrop.forEach ((drop) => {
      dropcards.push(
        <div id={drop.icon[0] + drop.color} key={drop.icon[0] + drop.color} className="card">
          <Card icon={drop.icon} color={drop.color} size={"3"}/>
        </div>
      );
    });
    
    return (
      <div className="container-drag">
        <div className="sea"></div>
				<div className="score">{this.state.cardmach}</div>
        <div className="fish" style={{
                    top: this.state.fish.x + "%",
                    left: this.state.fish.y + "%",
                    }} >
          <FontAwesomeIcon 
              icon={faFish}
              size="3x"
              flip={this.state.fish.flip}
              rotation={this.state.fish.rotation}
          />
        </div>
        <div key={this.state.carddraw.icon[0] + this.state.carddraw.color}
             id={this.state.carddraw.icon[0] + this.state.carddraw.color} 
             className="draw"
             onMouseDown = {(e)=>this.onMouseDown(e)}
             onMouseMove = {(e)=>this.onMouseMove(e)}
             onMouseUp = {(e)=>this.onMouseUp(e)}
             onTouchStart = {(e)=>this.onTouchStart(e)}
             onTouchMove = {(e)=>this.onTouchMove(e)}
             onTouchEnd = {(e)=>this.onTouchEnd(e)}
             onTouchCancel = {(e)=>this.onTouchEnd(e)}
        >
          <Card icon={this.state.carddraw.icon} color={this.state.carddraw.color} size="4" />
        </div>

        <div className="drophere">
          {dropcards}
        </div>

      </div>
    );
  }
}


export default Game;
