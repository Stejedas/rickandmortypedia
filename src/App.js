
import './App.css';
import CharacterCard from './components/CharacterCard';
import React, { useEffect } from 'react';
import { useState } from 'react';

function App() {
  
  // useState variables for Cards  //
  let [Characters, uploadCharacters] = useState([]);
  let [CharactersFiltred, uploadCharactersFiltred] = useState(Characters);
  let [secondFilter, uploadSecondFilter] = useState([])
  let [nextPage, uploadNextPage] = useState('')
  

  // useEffect with Rick and Morty character values //
  useEffect(()=> {
    fetch('https://rickandmortyapi.com/api/character')
    .then(r => r.json()).then(e => { 
      uploadCharacters(e.results); 
      uploadCharactersFiltred(e.results); 
      uploadSecondFilter(e.results)
      console.log(e.info.next)
      uploadNextPage(e.info.next)});
      

  }, [])

// search filter //
const handleChange = (c) => {
  let filteredCharc = Characters.filter(d => 
    d.name.toLowerCase().includes(c.target.value.toLowerCase()));
  uploadCharactersFiltred(filteredCharc);
  uploadSecondFilter(CharactersFiltred);
  console.log(c.target.value)

}

// filter alive, dead and all //
const handleAlive = () => {
  const segfilteredCharc = CharactersFiltred.filter(d => d.status === "Alive");
  uploadSecondFilter(segfilteredCharc);
}
const handleDead = (c) => {
  const segfilteredCharc = CharactersFiltred.filter(d => d.status === "Dead");
  uploadSecondFilter(segfilteredCharc);
}
const handleAll = (c) => {
  const segfilteredCharc = CharactersFiltred.filter(d => d.status != 0);
  uploadSecondFilter(segfilteredCharc);
}

// bring the following 20 characters, next page //
const handleMoreCharters = (c) => {
  console.log(c)
  fetch(nextPage)
    .then(r => r.json()).then(e => { 
      let arraynueva = e.results;
      arraynueva.map(e =>Characters.push(e) )
      
      uploadNextPage(e.info.next)
      uploadCharacters(Characters);
      uploadCharactersFiltred(Characters);
      uploadSecondFilter(CharactersFiltred)
    });   
}

  return (
    <React.Fragment>
    <div className='header'>
    <h1 className='title'>The Rick and Morty API</h1>
    <input type='text' className='filterInput' placeholder='Busqueda:' onKeyUp={handleChange}></input>
    <div className='containerButtons'>
      <button className='button' onClick={handleAlive}>VIVOS</button>
      <button className='button' onClick={handleDead}>MUERTOS</button>
      <button className='button' onClick={handleAll}>TODOS</button>
    </div>
     </div>
     <div className="containerCards">
    {secondFilter.map((e,i) => {
    return <CharacterCard key={i} listOne={e}></CharacterCard>})}
     

     <button onClick={handleMoreCharters} className='button'>PÁGINA SIGUIENTE</button>
    </div>
    </React.Fragment>
  )
}

export default App;
