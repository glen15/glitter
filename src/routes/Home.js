import React, { useState } from "react";

const Home = () => {
    const [gleet, setGleet] = useState("");
    const onSubmit = (event) => {
        event.preventDefault(); //submit 클릭시 새로고침되는거 막으려고
    };
    const onChange = (event) => {
        const { 
            target: {value},
        } = event;
        // event 안에있는 target 안에있는 value를 내놔라는것
        setGleet(value);
    };
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input value={gleet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="Gleet" />
        </form>
    </div>
    )
};
export default Home; 