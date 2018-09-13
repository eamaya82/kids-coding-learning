An attempt to approach programming for children (babies under 5 years old) through games  
if he can do a drag and drop, he could program without knowing ...  
you just have to guide him through something that entertains him and what better than a game.  

## Need help?

If you need help using this app, we encourage you to:

- Check out the [Getting Started Guide](docs/getting-started.md) in the docs folder of this repository
- If you can't find the answer there, open an issue in this repository and add the label `question`

## Project maintainers

This project is maintained by @eamaya82. Use of this project under the [MIT License](LICENSE.md).
 
## To-do list / Roadmap:
pending developments, any idea or improvement is well received  

- [ ] different game modes
  - [x] Game core
    - [ ] levels
    - [x] endless
    - [x] show score
    - [x] increase of the difficulty according to the score
    - [ ] the fish needs a goal (now it moves randomly)
  - [x] pair mode: mach the 2 images
    - [x] different groups of images / icons
    - [ ] more and/or bether images on groups
  - [ ] cards for move the fish: to guide the fish to the target, instead of making a pair, by pressing a card the fish moves in that direction
  - [ ] programming: choose the cards in an order, then the fish will perform actions in that order, the idea is that they have obstacles and objectives.
- [ ] animation (on move, bubbles, etc)  
  - [x] animation on new Card  
  - [x] animation on fish
  - [ ] bubbles https://codepen.io/matchboxhero/pen/LzdgOv?editors=1100
  - [ ] seaweed and other things in the fish tank
  - [ ] improve 3d effect https://codepen.io/ameyraut/pen/mzktE?editors=1100
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
