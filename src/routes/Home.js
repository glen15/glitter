import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [gleet, setGleet] = useState("");
    const [gleets, setGleets] = useState([]);
    const getGleet = async () => { //async awiat 쓰기위해서 따로 함수모듈화해서 useEffect에 넣기
        const dbGleets = await dbService.collection("gleets").get();
        dbGleets.forEach((document) => {
            const gleetObject = {
                ...document.data(),
                id: document.id,
            }
            setGleets((prev) => [ ...prev, gleetObject]) //set이 붙는 함수를 쓸 때, 값이 아닌 함수를 넣으면 리액트가 이전값에 접근가능하게 해준다
        })
    }
    useEffect(() => {
        getGleet();
    }, [])
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
    console.log(gleets);
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input value={gleet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="Gleet" />
        </form>
        <div>
            {gleets.map(gleet => (
            <div key={gleet.id}>
                <h4>{gleet.gleet}</h4>
            </div>))}
        </div>
    </div>
    )
};
export default Home; 