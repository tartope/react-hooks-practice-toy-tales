import React from "react";

function ToyCard({ toy, handleDelete, handleClickLikes }) {
  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button onClick={()=> handleClickLikes(toy)} className="like-btn">Like {"<3"}</button>
      <button onClick={() => handleDelete(toy.id)} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
