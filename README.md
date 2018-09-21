An attempt to approach programming for children (babies under 5 years old) through games  
if he can do a drag and drop, he could program without knowing ...  
you just have to guide him through something that entertains him and what better than a game.  

## Need help?

If you need help using this app, we encourage you to:  

- Check out the [Getting Started Guide](docs/getting-started.md) in the docs folder of this repository
- See the [Development Notes](docs/dev-notes.md), where you will find the internal details of the components, the rules established for their use and additional things that are not yet implemented
- If you can't find the answer there, open an issue in this repository and add the label `question`

## Project maintainers

This project is maintained by @eamaya82. Use of this project under the [MIT License](LICENSE).  


## Roadmap:
Any idea or improvement is well received  

- [x] Game mode 1: Pair, drag and drop to match up
- [x] Game mode 2: Press, move the thing towards the objective
- [ ] Game mode 3: Programin, choose the order of the commands to reach the objective
- [x] Game mode 4: Seeks, look for the equal card  
- [ ] Game mode 5: Harvest, move the fish (with mouse or touch) to pickup stuff  
- [ ] animals and backgrounds (fish, frog, snake, etc)
- [ ] levels
- [ ] Config / setings
- [ ] Sounds and Text (englis and spanish)
- [ ] React Native
 
## To-do list
Pending developments  

- [ ] different game modes
  - [x] Game core
    - [ ] levels
    - [x] endless
    - [x] show score
      - [ ] change score color on score points
    - [x] increase of the difficulty according to the score
    - [ ] the fish needs a goal (now it moves randomly)
      - [x] secuences mechanics for the fish
  - [x] Game mode 1 [dev-notes](docs/dev-notes.md#game-mode1) pair mode: match the 2 images  
    - [x] different groups of images / icons
    - [ ] more and/or bether images on groups
  - [x] Game mode 2 [dev-notes](docs/dev-notes.md#game-mode2) touch or press cards for move the fish: to guide the fish to the target, instead of making a pair, by pressing a card the fish moves in that direction  
    - [ ] fish objectives to get points  
  - [ ] Game mode 3 programming: choose the cards in an order, then the fish will perform actions in that order, the idea is that they have obstacles and objectives.  
  - [x] Game mode 4 Seeks, look/flip the 2 same cards  
  - [ ] Game mode 5 move the fish to collect  
- [ ] split in components  
	- [x] Card component [dev-notes](docs/dev-notes.md#cards)  
	- [x] Game logic
	- [x] Font awesome (load all icons)  
  - [x] fish [dev-notes](docs/dev-notes.md#fish)  
- [ ] improvements (animation, details, sounds, texts etc)  
  - [x] animation on new Card  
  - [x] animation on fish  
  - [x] bubbles [from here][bubbles4] (other demos [demo1][bubbles1] [demo2][bubbles2] [demo3][bubbles3])  
    - [ ] need to tweak, big bubbles go fast and small slow
  - [ ] seaweed and other things in the fish tank  
  - [ ] change the fish for a frog, bug ,snake etc... can by part of the levels?  
  - [ ] backgrounds (for example aquarium for fish)  
  - [ ] improve 3d effect (example [codepen][cp3deffect])  
  - [ ] sounds and text  
- [x] "drag-and-drop" for mouse and touch  
  - [x] Mouse  
    - [ ] mouse movement `bug` [#2](/../../issues/2) (move mouse quick off the card)  
  - [x] Touch  
- [ ] configuration options  
  - [ ] reset card on release  
  - [x] back to main menu  
  - [ ] Game FullScreen error "Failed to execute 'requestFullScreen' on 'Element': API can only be initiated by a user gesture."  
- [ ] react native  

To Clean  
- [ ] cardOffset in Game component  


[bubbles1]: https://codepen.io/matchboxhero/pen/LzdgOv?editors=1100
[bubbles2]: https://www.html5canvastutorials.com/advanced/html5-canvas-animated-bubbles/
[bubbles3]: https://codepen.io/Mark_Bowley/pen/mEtqj
[bubbles4]: http://jsfiddle.net/p5gpx
[cp3deffect]: https://codepen.io/ameyraut/pen/mzktE?editors=1100
