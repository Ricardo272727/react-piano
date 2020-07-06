import React from 'react'; 
import "./Piano.scss"; 
import { usePiano } from './usePiano.js';
import { Container, Row, Col } from 'reactstrap';


const Piano = props => {

 const piano = usePiano(props.tiles);
 
 return (
        <div className="piano">

          <div className="blacks">
            { piano.getBlackTilesByGroups().map(group => (
              <div className={group.type} key={group.index}>
                {
                  group.tiles.map(tile => (
                      <button
                        key={tile.index}
                        className={tile.className}
                        onClick={() => piano.play('black', tile.index)}>
                        {tile.name}
                      </button>
                  ))
                }
              </div>
            )) }
          </div>

          <div className="whites">
           {
             piano.whites.map(tile => (
              <button
                key={tile.index}
                className={tile.className}
                onClick={() => piano.play('white', tile.index) }>
                {tile.name}
              </button>
             ))    
           }
          </div>
        
        </div>
 );
} 

export default Piano;
