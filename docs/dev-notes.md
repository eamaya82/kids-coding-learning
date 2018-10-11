# Online Utilities  


- http://bennettfeely.com/clippy/  
- http://cssanimate.com/  
- http://www.patternify.com/  
  
- https://www.w3schools.com/css/css3_gradients.asp  
- https://www.w3schools.com/colors/colors_hsl.asp  
  
svg  
- http://jxnblk.com/paths/  
- https://svg2jsx.herokuapp.com/  
- https://editor.method.ac/  
   
- https://jsfiddle.net/w8r/yx0y1jLc/  
- https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateTransform  

other webs/links
memory game - https://github.com/sromku/memory-game  
robbie-the-robot - https://github.com/MatthiasKainer/robbie-the-robot - https://robbie-the-robot.herokuapp.com


# Augmented Reality on Web (Web AR)
for Kids to learn Alphabets with fun. - https://github.com/prashant-andani/AR-Alphabets  
AR.js Efficient Augmented Reality for the Web - https://aframe.io/blog/arjs/ - https://medium.com/arjs  
Augmented Reality in 10 Lines of HTML - https://medium.com/arjs/augmented-reality-in-10-lines-of-html-4e193ea9fdbf  
Area Learning with Multi-Markers in AR - https://medium.com/arjs/area-learning-with-multi-markers-in-ar-js-1ff03a2f9fbe  
https://github.com/nitin42/React-Web-AR  



# Components

## Game-mode1
Pair, drag and drop to match up  
**props**  
@data: array of icons, example ['square','circle','play','certificate','star','heart']  
@toHome: funtion to tell parent exit game  

**stats**  
cardColor: int 0 to 11 of next card color  (Hue * 30)  
cardDraw: array [[icon] , color] of card in draw position  
cardDrop: array of arrays [[[icon], color],[[icon], color]...] of cards to mach  
cardList: array list of a available icons to choose  
cardMach: int, actual score of match/pairs done  
_cardOffset: for mouse offset, is not currently used_  
fishCommand: value to pass to the fish component for internal command  
fishSequence: array on next commands to set in fishCommand  
inDragMode: bolean to set if a card is draging mode (mouse or touch)  
inNewCard: bolean to set if a new card is show  
maxcardDrop: int max drops/match card show  
nextMach: score needed for increment @maxcardDrop  

- commanddone: function for communication with the child and know when the @fishCommand is done/finished  

## Game-mode2
Press, move the thing towards the objective  
**props**  
@data: array of icons, example ['square','circle','play','certificate','star','heart']  
@toHome: funtion to tell parent exit game 

## Game-mode4
Seeks, look for the equal card  




# Internal Components

### Cards
**props**  
@size: int 1 to 9? _fonr awesome size prop_ also use "(size * 15)px" to calc height and width of the card  
@icon: ['icon-name'] font awesome icon name (no the library name)  
@color: int 0 to 11, calc the Hue degree on the color wheel by "color * 30"  

**state**  
style: css values for width, height, color, backgroundColor, backgroundImage, border, boxShadow, animation, animationIterationCount  
size: @size + "x" example '4x'  
key: is make by "C-" + @icon + @color  
  example icon=['bicycle'] and color=10 then key='C-bicycle10'  


### fish
now is a clowfish

**prop**  
@command: integer 0 to 9 (0-9 for now can be more)  
@done: funtion to tell parent command done  
@speed: "1 * value" to increment % dist (% of the screen), normal value speed = 0.25  that is, it changes by (1/4)% screen per render  

command values  for movements (like nunpad)  
  
Command | action  
:---: | ---
5 | nothing / stop / dont move  (not implemented)  
8 | up  
9 | up + rigth  (not implemented)  
6 | right  
3 | right + down  (not implemented)  
2 | down  
1 | down + left  (not implemented)  
4 | left  
7 | left + up  (not implemented)  
0 | start command/standby/do noting (not return command done)  
  
> can by "> 9" commands to do spacial move (like atack, pick-up, change color, animation etc)  
  
  
  