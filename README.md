An attempt to approach programming for children (babies) through games  
if he can do a drag and drop, he could program without knowing ...  
you just have to guide him through something that entertains him and what better than a game.  

## TODO:

- [ ] different game modes
  - [x] pair mode: different groups of images / icons
    - [x] Game core
      - [ ] levels
      - [x] endless
      - [x] show score
      - [x] increase of the difficulty according to the score
      - [ ] the fish needs a goal (now it moves randomly)
  - [ ] cards for move the fish: to guide the fish to the target, instead of making a pair, by pressing a card the fish moves in that direction
  - [ ] programming: choose the cards in an order, then the fish will perform actions in that order, the idea is that they have obstacles and objectives.
- [ ] animation (on move, bubbles, etc)  
  - [x] animation on new Card  
  - [x] animation on fish
  - [ ] bubbles https://codepen.io/matchboxhero/pen/LzdgOv?editors=1100
  - [ ] seaweed and other things in the fish tank
- [x] split in components (all logic is in app.js)
	- [x] Card component
	- [x] Game logic
	- [x] Font awesome icon load
- [x] "drag-and-drop" for mouse and touch
  - [x] Mouse
    - [ ] mouse movement bug (move mouse quick off the card and release click then move mouse over the card )
  - [x] Touch
- [ ] configuration options
  - [ ] reset card on release
  - [x] back to main menu
  - [ ] change the fish for a frog, bug ,snake etc... can by part of the levels?
- [ ] react native
