import React, { useState } from "react";


function ToyForm({ handleSubmit }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  function onSubmit(event){
    event.preventDefault()

    const newToy = {
      name: event.target['name'].value,
      image: event.target['image'].value,
      likes: 0,
    }
    // console.log(newToy)
    handleSubmit(newToy);
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={onSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={event => setImage(event.target.value)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
