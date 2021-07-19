import React from "react";

const Gleet = ({gleetObj, isOwner}) => ( //이거 왜 {}쓰면 안되는거지
    <div>
        <h4>{gleetObj.text}</h4>
        {isOwner && 
        <>
        <button>Delete Gleet</button>
        <button>Edit Gleet</button>
        </>
        }
    </div>
)

export default Gleet;