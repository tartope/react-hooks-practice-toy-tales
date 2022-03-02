import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const toysAPI = 'http://localhost:3001/toys';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(toy) {
    console.log(toy)
    fetch(toysAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(toy)
    })
      .then((response) => response.json())
      .then((json) => setToys([...toys, json]));
  }

  function deleteToy(id){
    // console.log('deleting', id)
    fetch(`${toysAPI}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(()=> setToys(toys.filter(toy => toy.id !== id)))
  }

  function incrementLikes(toy){
    // console.log('increment', toy.id)
    fetch(`${toysAPI}/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({likes: toy.likes +1})
    })
    // .then(response => response.json())
    // .then(json => console.log(json))
    .then(() => 
    setToys(
      toys.map(item => item.id !== toy.id ? item : {...item, likes: item.likes +1}))
    )
  }

  useEffect(()=> {
    fetch(toysAPI)
      .then(response => response.json())
      // .then(toysData => console.log(toysData))
      .then(toysData => setToys(toysData));
  }, []);

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleSubmit={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleDelete={deleteToy} handleClickLikes={incrementLikes}/>
    </>
  );
}

export default App;

//Deliverable 1:
//1 add useEffect to line 1.
//2 set state on line 11 (set to empty array).
//3 useEffect on line 17 to fetch data (setToys to toysData).
//4 pass down props to ToysContainer element (toys={toys} <-from variable).
//5 go to ToysContainer component and pass toys (prop) in parameter.
//6 map toys (prop) to return element <ToyCard with 'key' and 'toy' (prop) /> (this displays card).
//7 got to ToyCard component and pass toy (prop).
//8 place toy.name, toy.image, etc in each element to display toy info on page.

//Deliverable 2 (control form):
//1 got to ToyForm and add useState to line 1.
//2 on lines 4 & 5, set state for form input text fields (name & image)(set to empty string).
//3 we can value of text fiels to reflect the state (lines: 16 & 24).
//4 lines 17 & 26, add onChange (event inline function and setState).
//5 in App component add 'handleSubmit' function to ToyForm element.
//6 line 17, create function; go to ToyForm component and pass through as props.
//7 in form open tag, add 'onSubmit={onSubmit}'.
//8 create onSubmit function (add 'e.prevent.default').
//9 create 'newToy' variable for newToy object (optional: import v4 as uuid at line 2 for unique id in objeck); add handleSubmit and pass it newToy for data.
//10 go to App component and create addToy function.
//11 create fetch(POST) in addToy function; in second .then return setToys([...toys, json])

//Deliverable 3:
//1 go to ToyCard component and pass in 'handleDelete' props.
//2 in button opening tag, add 'onclick...' and pass in toy.id.
//3 go to App component and add function deleteToy that takes an id in parameter.
//4 pass function down as props to ToyContainer element.
//5 go to ToyContainer component and pass props in parameter, and ToyCard element.
//6 go to App component and add DELETE fetch.
//7 in delete fetch, update state using filter, setToys to filter toy that does not match id (!==).

//Deliverable 4:
//1 in ToyCard componenet, pass parameter 'handleClickLikes' and in 'like' button element, pass function.
//2 in ToyContainer component, pass parameter 'handleClickLikes' and in ToyCard element.
//3 in App component, pass 'handleClickLikes=incrementLikes' into ToyContainer element.
//4 create incrementLikes function and pass it 'toy' parameter.
//5 create PATCH fetch and in body '{likes: toy.likes +1}'.
//6 in .then update state using map, and use ternary to return item, or item with updated likes.