import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import animal_cow from './sounds/animal_cow.wav';
import animal_elephant from './sounds/animal_elephant.wav';
import animal_frog from './sounds/animal_frog.wav';
import animal_kitty from './sounds/animal_kitty.wav';
import animal_owl from './sounds/animal_owl.wav';
import animal_rooster from './sounds/animal_rooster.wav';
import animal_sheep from './sounds/animal_sheep.wav';

import sound_tom from './sounds/sound_tom.wav';
import sound_clap from './sounds/sound_clap.wav';
import sound_kick from './sounds/sound_kick.wav';
import sound_openhat from './sounds/sound_openhat.wav';
import sound_boom from './sounds/sound_boom.wav';
import sound_ride from './sounds/sound_ride.wav';
import sound_snare from './sounds/sound_snare.wav';

import piano_a from './sounds/piano_a.wav';
import piano_b from './sounds/piano_b.wav';
import piano_c from './sounds/piano_c.wav';
import piano_d from './sounds/piano_d.wav';
import piano_e from './sounds/piano_e.wav';
import piano_f from './sounds/piano_f.wav';
import piano_g from './sounds/piano_g.wav';

import Card from './cards';
import Fish from './fish';

import '../App.css';

library.add(faArrowLeft);

class Game extends Component {
  constructor(props) {
    super(props);
    //let iconList = ["square", "circle", "play", "certificate", "star"];

    this.state = {
      cardList: [],
      cardDrop: [
        { icon: 'question', color: 6, id: 8, src: animal_cow },
        { icon: 'question', color: 7, id: 9, src: animal_elephant },
        { icon: 'question', color: 8, id: 10, src: animal_frog },
        { icon: 'question', color: 9, id: 11, src: animal_kitty },
        { icon: 'question', color: 10, id: 12, src: animal_owl },
        { icon: 'question', color: 11, id: 13, src: animal_rooster },
        { icon: 'question', color: 12, id: 14, src: animal_sheep },

        { icon: 'drum', color: 0, id: 1, src: sound_tom },
        { icon: 'drum', color: 1, id: 2, src: sound_clap },
        { icon: 'drum', color: 2, id: 3, src: sound_kick },
        { icon: 'drum', color: 3, id: 4, src: sound_openhat },
        { icon: 'drum', color: 4, id: 5, src: sound_boom },
        { icon: 'drum', color: 5, id: 6, src: sound_ride },
        { icon: 'drum', color: 6, id: 7, src: sound_snare },

        { icon: 'music', color: 11, id: 15, src: piano_a },
        { icon: 'music', color: 11, id: 16, src: piano_b },
        { icon: 'music', color: 11, id: 17, src: piano_c },
        { icon: 'music', color: 11, id: 18, src: piano_d },
        { icon: 'music', color: 11, id: 19, src: piano_e },
        { icon: 'music', color: 11, id: 20, src: piano_f },
        { icon: 'music', color: 11, id: 21, src: piano_g }
      ],
      cardColor: 0,
      currentCard: null,
      maxcardDrop: 2,
      cardMach: 0,
      nextMach: 6,
      fishCommand: 0,
      fishSequence: []
    };
  }

  componentDidMount() {
    //this.newdraw();
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
  playsound(ev, id) {
    let source = document.getElementById('audio-' + id);
    source.currentTime = 0;
    source.play();
    this.commandfish();
  }

  //fish ***********
  commandfish() {
    let moveTo = (Math.floor(Math.random() * 4) + 1) * 2;
    let updateSequence = this.state.fishSequence;
    let nextCommand = this.state.fishCommand;
    updateSequence.push(moveTo);
    if (updateSequence.length === 1 && nextCommand === 0) {
      nextCommand = moveTo;
      updateSequence = [];
    }
    this.setState({
      fishSequence: updateSequence,
      fishCommand: nextCommand
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
      fishCommand: nextCommand
    });
  };

  render() {
    let dropcards = [];
    this.state.cardDrop.forEach((drop, index) => {
      dropcards.push(
        <div
          key={drop.id}
          id={drop.id}
          className="card cardmenu"
          style={{
            top: Math.floor(index / 7) * 30 + 5 + '%',
            left: `${(index % 7) * 12 + 9}%`
          }}
          onClick={e => this.playsound(e, drop.id)}
        >
          <audio id={'audio-' + drop.id} type="audio/wav" src={drop.src} />
          <Card icon={[drop.icon]} color={drop.color} size={3} />
        </div>
      );
    });

    return (
      <div className="container-drag">
        <Fish
          command={this.state.fishCommand}
          done={this.commanddone}
          speed={0.5}
        />
        <div className="backmenu" onClick={() => this.goHomeScreen()}>
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </div>
        <div className="drophere">{dropcards}</div>
      </div>
    );
  }
}

export default Game;
