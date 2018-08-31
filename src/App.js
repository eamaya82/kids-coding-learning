import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faArrowDown,faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './App.css';

class App extends Component {
  state = {
    tasks: [{name:"UP",
             icon: faArrowUp,
             category:"wip",
             bgcolor:"yellow",
             iconcolor:"olive"},
            
            {name:"DOWN",
             icon: faArrowDown,
             category:"wip",
             bgcolor:"blue",
             iconcolor:"navy"},
            
            {name:"LEFT",
             icon: faArrowLeft,
             category:"wip",
             bgcolor:"red",
             iconcolor:"maroon"},
            
            {name:"RIGHT",
             icon: faArrowRight,
             category:"wip",
             bgcolor:"lime",
             iconcolor:"green"}
           ]
  }
 
 onDragStart = (ev, id) => {
   console.log('dragstart:',id);
   ev.dataTransfer.setData("text/plain",id);
 }
 
 onDragOver = (ev) => {
   ev.preventDefault();
 }
 
 onDrop = (ev, cat) => {
   let id = ev.dataTransfer.getData("text");
   
   let tasks = this.state.tasks.filter((task) => {
     if(task.name == id){
       task.category = cat;
     }
     return task;
   });
   
   this.setState({
     ...this.state,
     tasks
   });
 }
 
  render() {
    var tasks = {
      wip: [],
      complete: []
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
        <h2 className="header">DRAG & DROP DEMO</h2>
        <div
          className="wip"
          onDragOver={(e)=>this.onDragOver(e)}
          onDrop={(e)=>{this.onDrop(e, "wip")}}
        >
          <span className="task-header">WIP</span>
          {tasks.wip}
        </div>
        <div
          className="droppable"
          onDragOver={(e)=>this.onDragOver(e)}
          onDrop={(e)=>{this.onDrop(e, "complete")}}
        >
          <span className="task-header">COMPLETED</span>
          {tasks.complete}
        </div>
      </div>
    );
  }
}

export default App;
