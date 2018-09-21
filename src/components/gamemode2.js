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
		this.state = {
			inDragMode: false,
			inNewCard: false,
			cardOffset: {
				x: 0,
				y: 0
			},

			cardDraw: {
				icon: ['arrow-left'],
				color: 0,
        command: 4,
			},
			cardDrop: [{
				icon: ['arrow-left'],
				color: 1,
        command: 4,
			  },
        {
					icon: ['arrow-up'],
					color: 2,
          command: 8,
				},
				{
					icon: ['arrow-down'],
					color: 3,
          command: 2,
				},
        {
					icon: ['arrow-right'],
					color: 4,
          command: 6,
				},
			],
			cardColor: 5,
			//maxcardDrop: 2,
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

  //fish ***********
  commandfish(Command) {
		this.setState({
        //fishSequence: updateSequence,
        fishCommand: Command,
     });
	}
  commanddone = () => {
    let nextCommand = 0;
     this.setState({
        //fishSequence: updateSequence,
        fishCommand: nextCommand,
     });
 }

	render() {
		let dropcards = [];
		this.state.cardDrop.forEach((drop) => {
			dropcards.push(
				<div
          key={drop.icon[0] + drop.color}
          id={drop.icon[0] + drop.color} className='card'
         
          onClick={() => this.commandfish(drop.command)}
        >
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
				<div className='score' style={{top: '1px'}}>
					{this.state.cardMach}
				</div>
				<div className='drophere' style={{top: '70vh'}}>
					{dropcards}
				</div>
			</div>
		);
	}
}


export default Game;