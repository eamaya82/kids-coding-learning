import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faArrowDown,faArrowLeft,faArrowRight,faFish } from '@fortawesome/free-solid-svg-icons'
import './App.css';

const cards = [{name:"UP",
             icon: faArrowUp,
             category:"draw",
             bgcolor:"LightYellow",
             iconcolor:"yellow",
             onlyon: "commandup"},
            
            {name:"DOWN",
             icon: faArrowDown,
             category:"draw",
             bgcolor:"LightCyan",
             iconcolor:"blue",
             onlyon: "commanddown"},
            
            {name:"LEFT",
             icon: faArrowLeft,
             category:"draw",
             bgcolor:"LightSalmon",
             iconcolor:"red",
             onlyon: "commandleft"},
            
            {name:"RIGHT",
             icon: faArrowRight,
             category:"draw",
             bgcolor:"PaleGreen",
             iconcolor:"lime",
             onlyon: "commandright"}
           ];

class App extends Component {
  state = {
    tasks: [{name:"UP",
             icon: faArrowUp,
             category:"draw",
             bgcolor:"LightYellow",
             iconcolor:"yellow",
             onlyon: "commandup"}
            ],
    fish: { x: 60,
            y: 50,
            rotation: 0,
            flip: ""
           },
    
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
   let tasks = this.state.tasks.filter((task) => {
     if(task.name === id && task.onlyon === cat ){
       task.category = cat;
       drawnewcard = true;
     }
     return task;
   });
   let randomCard =  Object.assign({},cards[Math.floor(Math.random()*cards.length)]);
   if(drawnewcard){
    tasks.push(randomCard);
          
     let fish = this.state.fish;
      switch(cat) {
        case "commandup":
          fish.x = fish.x - 10
          fish.rotation = 270
          break;
        case "commanddown":
          fish.x = fish.x + 10
          fish.rotation = 90
          break;
        case "commandleft":
          fish.y = fish.y - 10
          fish.rotation = 180
          break;
        case "commandright":
          fish.y = fish.y + 10
          fish.rotation = 0
          break;
      }
     if (fish.x < 0 )  fish.x = 0
     if (fish.y < 0 )  fish.y = 0
     if (fish.x > 70 )  fish.x = 70
     if (fish.x > 90 )  fish.x = 90
     
     
   }
   
   
   
   this.setState({
     ...this.state,
     tasks
   });
 }
 
  render() {
    let tasks = {
      draw: [],
      commandup: [],
      commanddown: [],
      commandleft: [],
      commandright: [],
    }
    this.state.tasks.forEach ((t) => {
      tasks[t.category].push(
        <div
          key={t.name}
          onDragStart = {(e)=>this.onDragStart(e, t.name)}
          draggable
          className="draggable"
          style={{backgroundColor: t.bgcolor}}
        >
          <FontAwesomeIcon icon={t.icon} size="6x" style={{color: t.iconcolor}} />
        </div>
      );
    });
    
    return (
      <div className="container-drag">
        <div className="sea">
        </div>
        <div style={{
                    position: "absolute",
                    top: this.state.fish.x + "%",
                    left: this.state.fish.y + "%",
                    color: "OrangeRed"}} >
          <FontAwesomeIcon icon={faFish} size="6x" flip={this.state.fish.flip} rotation={this.state.fish.rotation}/>
        </div>
        <div
          className="draw"
          
          onDragOver={(e)=>this.onDragOver(e)}
          onDrop={(e)=>{this.onDrop(e, "draw")}}
        >
          {tasks.draw}
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
