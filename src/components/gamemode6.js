import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Card from "./cards";
import Fish from "./fish";
import Sound_boom from "./sounds/boom.wav";
import Sound_clap from "./sounds/clap.wav";
import Sound_kick from "./sounds/kick.wav";
import Sound_openhat from "./sounds/openhat.wav";
import Sound_ride from "./sounds/ride.wav";
import Sound_snare from "./sounds/snare.wav";
import Sound_tom from "./sounds/tom.wav";

import Animal_cow from "./sounds/animal_cow.wav";
import Animal_elephant from "./sounds/animal_elephant.wav";
import Animal_frog from "./sounds/animal_frog.wav";
import Animal_kitty from "./sounds/animal_kitty.wav";
import Animal_owl from "./sounds/animal_owl.wav";
import Animal_rooster from "./sounds/animal_rooster.wav";
import Animal_sheep from "./sounds/animal_sheep.wav";

import Piano_a from "./sounds/piano_a.wav";
import Piano_b from "./sounds/piano_b.wav";
import Piano_c from "./sounds/piano_c.wav";
import Piano_d from "./sounds/piano_d.wav";
import Piano_e from "./sounds/piano_e.wav";
import Piano_f from "./sounds/piano_f.wav";
import Piano_g from "./sounds/piano_g.wav";

import "../App.css";

library.add(faArrowLeft);

class Game extends Component {
  constructor(props) {
    super(props);
    //let iconList = ["square", "circle", "play", "certificate", "star"];

    this.state = {
      cardList: [],
      cardDrop: [
        { icon: "question", color: 6, id: 8, soundsrc: Animal_cow },
        { icon: "question", color: 7, id: 9, soundsrc: Animal_elephant },
        { icon: "question", color: 8, id: 10, soundsrc: Animal_frog },
        { icon: "question", color: 9, id: 11, soundsrc: Animal_kitty },
        { icon: "question", color: 10, id: 12, soundsrc: Animal_owl },
        { icon: "question", color: 11, id: 13, soundsrc: Animal_rooster },
        { icon: "question", color: 12, id: 14, soundsrc: Animal_sheep },

        { icon: "drum", color: 0, id: 1, soundsrc: Sound_tom },
        { icon: "drum", color: 1, id: 2, soundsrc: Sound_clap },
        { icon: "drum", color: 2, id: 3, soundsrc: Sound_kick },
        { icon: "drum", color: 3, id: 4, soundsrc: Sound_openhat },
        { icon: "drum", color: 4, id: 5, soundsrc: Sound_boom },
        { icon: "drum", color: 5, id: 6, soundsrc: Sound_ride },
        { icon: "drum", color: 6, id: 7, soundsrc: Sound_snare },

        { icon: "music", color: 11, id: 15, soundsrc: Piano_a },
        { icon: "music", color: 11, id: 16, soundsrc: Piano_b },
        { icon: "music", color: 11, id: 17, soundsrc: Piano_c },
        { icon: "music", color: 11, id: 18, soundsrc: Piano_d },
        { icon: "music", color: 11, id: 19, soundsrc: Piano_e },
        { icon: "music", color: 11, id: 20, soundsrc: Piano_f },
        { icon: "music", color: 11, id: 21, soundsrc: Piano_g }
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
    let source = document.getElementById("audio-" + id);
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
            top: Math.floor(index / 7) * 30 + 5 + "%",
            left: `${(index % 7) * 13 + 7}%`
          }}
          onClick={e => this.playsound(e, drop.id)}
        >
          <audio id={"audio-" + drop.id}>
            <source src={drop.soundsrc} />
          </audio>
          <Card icon={[drop.icon]} color={drop.color} size={4} />
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
