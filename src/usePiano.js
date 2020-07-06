import { useState, useEffect } from 'react';

const usePiano = (tiles) => {
 const [blacks, setBlacks] = useState([]);
 const [whites, setWhites] = useState([]);
 const classOnPress = 'press';
 const classNormal = '';
 const types = { white: 'white', black: 'black' };

 useEffect(() => {
   setBlacks(tiles.blacks.map(tile => {
     return {...tile, audio: new Audio(tile.sound), className: classNormal };
    }));
   setWhites(tiles.whites.map(tile => {
     return {...tile, audio: new Audio(tile.sound), className: classNormal };
   }))
   console.log('ok');
 }, [tiles.whites, tiles.blacks]);

  const playKey = (e) => {
      let type = types.white;
      let tiles = whites.filter(tile => tile.key === e.key);
      if(tiles.length === 0){
        tiles = blacks.filter(tile => tile.key === e.key);
        type = types.black;
      }
      if(tiles.length > 0){
        play(type, tiles[0].index);
      }
  };

  useEffect(() => {
    document.addEventListener('keydown', playKey);
    return () => {
     document.removeEventListener('keydown', playKey);
    };
  },[blacks, whites]);



 const pressBlackTile = (index) => {
    let new_blacks = blacks.slice();
    new_blacks[index].className = classOnPress; 
    setBlacks(new_blacks);

    setTimeout(() => {
      new_blacks = blacks.slice();
      new_blacks[index].className = classNormal;
      setBlacks(new_blacks);
    }, 300);
 };

 const pressWhiteTile = (index) => {
    let new_whites = whites.slice();
    new_whites[index].className = classOnPress;
    setWhites(new_whites);
   
    setTimeout(() => {
      new_whites = whites.slice();
      new_whites[index].className = classNormal;
      setWhites(new_whites);
    }, 300);
 };

 const play = (type, index) => {
  let audio;
  if(type === types.black){
    audio = blacks[index].audio;
    pressBlackTile(index);
  } else {
    audio = whites[index].audio;
    pressWhiteTile(index);
  }
  if(!audio.paused){
    audio.currentTime = 0;
  }
  audio.play();
 };

  const getBlackTilesByGroups = () => {
    let groups = [];
    let types = {
      short: { max: 2, name: 'short'},
      large: { max: 3, name: 'large'}
    };
    let currType = types.short.name;
    // index current group
    let currGroup = 0, countGroup = 0;
    // push the first group
    groups.push({ type: currType, tiles: [], index: 0 });

    for(let i = 0; i < blacks.length; i+=1){
      // countGroup has the max size of his group type
      if( (currType === types.short.name && countGroup === types.short.max)
        || (currType === types.large.name && countGroup === types.large.max) ){
        // update counts
        countGroup = 0;
        currGroup += 1;
        // switch type group
        currType = currType === types.short.name ? types.large.name : types.short.name;
        // add new group
        groups.push({ type: currType, tiles: [], index: groups.length });
      }
      // add element to current group
      groups[currGroup].tiles.push(blacks[i]);
      countGroup += 1;
    }
    return groups;
  };
  

  return {
    getBlackTilesByGroups,
    play,
    whites
  };

};

export { usePiano };
