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
any idea or improvement is well received

- [ ] Game mode: Pair, drag and drop to match up
- [ ] Game mode: Seeks, look for the equal card
- [ ] Game mode: Press, move the thing towards the objective
- [ ] Game mode: Programin, choose the order of the commands to reach the objective
- [ ] animals and backgrounds (fish, frog, snake, etc)
- [ ] levels
- [ ] Config / setings
- [ ] Sounds and Text (englis and spanish)
- [ ] React Native
 
## To-do list
pending developments

- [ ] different game modes
  - [x] Game core
    - [ ] levels
    - [x] endless
    - [x] show score
      - [ ] change score color on score points
    - [x] increase of the difficulty according to the score
    - [ ] the fish needs a goal (now it moves randomly)
      - [x] secuences mechanics for the fish
  - [x] pair mode: match the 2 images
    - [x] different groups of images / icons
    - [ ] more and/or bether images on groups
  - [ ] Seeks, look/flip the 2 images on the 18 cards (3 x 6)
  - [ ] touch or press cards for move the fish: to guide the fish to the target, instead of making a pair, by pressing a card the fish moves in that direction
  - [ ] programming: choose the cards in an order, then the fish will perform actions in that order, the idea is that they have obstacles and objectives.
- [ ] improvements (animation, details, sounds, texts etc)  
  - [x] animation on new Card  
  - [x] animation on fish
  - [ ] bubbles https://codepen.io/matchboxhero/pen/LzdgOv?editors=1100
  - [ ] seaweed and other things in the fish tank
  - [ ] change the fish for a frog, bug ,snake etc... can by part of the levels?
  - [ ] improve 3d effect https://codepen.io/ameyraut/pen/mzktE?editors=1100
  - [ ] sounds and text
- [x] split in components (all logic is in app.js)
	- [x] Card component
	- [x] Game logic
	- [x] Font awesome icon load
  - [x] fish
  - [ ] backgrounds (for example aquarium for fish)
- [x] "drag-and-drop" for mouse and touch
  - [x] Mouse
    - [ ] mouse movement bug #2 (move mouse quick off the card)
  - [x] Touch
- [ ] configuration options
  - [ ] reset card on release
  - [x] back to main menu
  - [ ] Game FullScreen error "Failed to execute 'requestFullScreen' on 'Element': API can only be initiated by a user gesture."
- [ ] react native

to clean
- [ ] cardOffset in Game component
