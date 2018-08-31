import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faArrowDown,faArrowLeft,faArrowRight,faFish } from '@fortawesome/free-solid-svg-icons'
import './App.css';

const cardlist = [{name:"card-up",
             icon: faArrowUp,
             category:"draw",
             onlyon: "commandup"},
            
            {name:"card-down",
             icon: faArrowDown,
             category:"draw",
             onlyon: "commanddown"},
            
            {name:"card-left",
             icon: faArrowLeft,
             category:"draw",
             onlyon: "commandleft"},
            
            {name:"card-right",
             icon: faArrowRight,
             category:"draw",
             onlyon: "commandright"}
           ];

class App extends Component {
  state = {
    cards: [{name:"card-up",
             icon: faArrowUp,
             category:"draw",
             onlyon: "commandup"},
            ],
    fish: { x: 60,
            y: 50,
            dx: 0,
            dy: 0,
            rotation: 0,
            flip: ""
           },
    
  }
 move = (x,y) => {
   let fish = this.state.fish;
   if (x==-1 && y==0){
     fish.rotation = 270
     if (fish.x <= 0 )  x = 0
   } 
   if (x==1 && y==0){
     fish.rotation = 90
     if (fish.x >= 70 )  x = 0
   }
   if (x==0 && y==-1){
     fish.rotation = 180
     if (fish.y <= 0 )  y = 0
   } 
   if (x==0 && y==1){
     fish.rotation = 0
     if (fish.y >= 90 )  y = 0
   } 
   
    this.setState(prevState => ({
      fish :{
          x: prevState.fish.x + x,
          y: prevState.fish.y + y,
          rotation: fish.rotation
      }
    }));
}
 componentWillUnmount() {
  clearInterval(this.interval);
 }
 
 
 onDragStart = (ev, id) => {
   ev.dataTransfer.setData("text/plain",id);
 }
 
 onDragOver = (ev) => {
   ev.preventDefault();
 }
 
 onDrop = (ev, cat) => {
   let id = ev.dataTransfer.getData("text");
   
   let drawnewcard = false;
   let cards = this.state.cards.filter((card) => {
     if(card.name === id && card.onlyon === cat ){
       card.category = cat;
       drawnewcard = true;
     }
     return card;
   });
   let randomCard =  Object.assign({},cardlist[Math.floor(Math.random()*cardlist.length)]);
   if(drawnewcard){
    cards.push(randomCard);
          
     let fish = this.state.fish;
     clearInterval(this.interval); //clear previus interval
      switch(cat) {
        case "commandup":
          this.interval = setInterval(() => this.move(-1,0), 100);
          //fish.x = fish.x - 10
          //fish.rotation = 270
          break;
        case "commanddown":
          this.interval = setInterval(() => this.move(1,0), 100);
          //fish.dx = fish.dx + 10
          //fish.rotation = 90
          break;
        case "commandleft":
          this.interval = setInterval(() => this.move(0,-1), 100);
          //fish.dy = fish.dy - 10
          //fish.rotation = 180
          break;
        case "commandright":
          this.interval = setInterval(() => this.move(0,1), 100);
          //fish.dy = fish.dy + 10
          //fish.rotation = 0
          break;
      }
     if (fish.x < 0 )  fish.x = 0
     if (fish.y < 0 )  fish.y = 0
     if (fish.x > 70 )  fish.x = 70
     if (fish.x > 90 )  fish.x = 90
     
     
   }
   
   
   
   this.setState({
     ...this.state,
     cards
   });
 }
 
  render() {
    let cards = {
      draw: [],
      commandup: [],
      commanddown: [],
      commandleft: [],
      commandright: [],
    }
    
    
    
     
    
    this.state.cards.forEach ((t) => {
      cards[t.category].push(
        <div
          key={t.name}
          onDragStart = {(e)=>this.onDragStart(e, t.name)}
          draggable
          className={t.name,"draggable"}
          style={{backgroundColor: t.bgcolor}}
        >
          <FontAwesomeIcon
              icon={t.icon}
              size="6x"
              className={t.name} />
        </div>
      );
    });
    
    return (
      <div className="container-drag">
        <div className="sea">
        </div>
        <div className="fish" style={{
                    top: this.state.fish.x + "%",
                    left: this.state.fish.y + "%",
                    }} >
          <FontAwesomeIcon 
              icon={faFish}
              size="6x"
              flip={this.state.fish.flip}
              rotation={this.state.fish.rotation}
          />
        </div>
        <div
          className="draw"
          onDragOver={(e)=>this.onDragOver(e)}
          onDrop={(e)=>{this.onDrop(e, "draw")}}
        >
          {cards.draw}
        </div>

        <div className="drophere">
          <div
            className="card"
            style={{backgroundColor: "yellow"}}
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>{this.onDrop(e, "commandup")}}
          >
            <FontAwesomeIcon icon={faArrowUp} size="6x" style={{color: "olive"}} />
          </div>
          <div
            className="card"
            style={{backgroundColor: "blue"}}
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>{this.onDrop(e, "commanddown")}}
          >
            <FontAwesomeIcon icon={faArrowDown} size="6x" style={{color: "navy"}} />
          </div>
          <div
            className="card"
            style={{backgroundColor: "red"}}
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>{this.onDrop(e, "commandleft")}}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="6x" style={{color: "maroon"}} />
          </div>
          <div
            className="card"
            style={{backgroundColor: "lime"}}
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>{this.onDrop(e, "commandright")}}
          >
            <FontAwesomeIcon icon={faArrowRight} size="6x" style={{color: "green"}} />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
