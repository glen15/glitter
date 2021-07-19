import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
    const [gleet, setGleet] = useState("");
    const onSubmit = async (event) => { //promise를 리턴하기 때문에 async 넣는다
        event.preventDefault(); //submit 클릭시 새로고침되는거 막으려고
        await dbService.collection("gleets").add({
            gleet, // === gleet:gleet 같아서 짧게 생략한것
            createdAt: Date.now(),
        });
        setGleet(""); //submit 했으니 다시 비워주는 것
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