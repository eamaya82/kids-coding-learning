# Components

## Game
**props**
@list: array of icons, example ['square','circle','play','certificate','star','heart']
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

## Cards
**props**
@size: int 1 to 9? _fonr awesome size prop_ also use "(size * 15)px" to calc height and width of the card
@icon: ['icon-name'] font awesome icon name (no the library name)
@color: int 0 to 11, calc the Hue degree on the color wheel by "color * 30"

**state**
style: css values for width, height, color, backgroundColor, backgroundImage, border, boxShadow, animation, animationIterationCount
size: @size + "x" example '4x'
key: is make by "C-" + @icon + @color
  example icon=['bicycle'] and color=10 then key='C-bicycle10'


## fish
**prop**
@command: integer 0 to 9 (0-9 for now can be more)
@done: funtion to tell parent command done
@speed: "1 * value" to increment % dist (% of the screen), normal value speed = 0.25  that is, it changes by (1/4)% screen per render

command values
for movements (like nunpad)
  5 nothing / stop / dont move
  8 up
  9 up + rigth
  6 right
  3 right + down
  2 down
  1 down + left
  4 left
  7 left + up
  
  0 start command/standby/do noting (not return command done)
  can by > 9 comand to do spacial move (like atack, change color or die animation etc)
