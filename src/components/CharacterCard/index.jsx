import { useEffect } from 'react';
import { useState } from 'react';
import '../CharacterCard/style.css';

function CharacterCard(prop) {
   
    
    let [alive, uploadAlive] = useState('alive')

    useEffect(()=> {
         uploadAlive(prop.listOne.status)
      }, [prop.listOne.status])
   
    
    
    return <div className='cardCharter'>
        <img src={prop.listOne.image} className='imgCharter'></img>
        <div className='infCharter'>
            <h4 id={prop.listOne.name}>{prop.listOne.name}</h4>
            <div className='state'>
               <div className={alive}>
                </div> <h6>{prop.listOne.status} - {prop.listOne.species}</h6>
            </div>
            <h5>Last know location:</h5>
            <p>{prop.listOne.origin.name}</p>
            <h5>First seen in:</h5>
            <p>{prop.listOne.location.name}</p></div>
    </div>
}

export default CharacterCard;