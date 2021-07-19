import { dbService } from "fbase";
import Gleet from "../components/Gleet";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [gleet, setGleet] = useState("");
    const [gleets, setGleets] = useState([]);
    useEffect(() => {
        dbService.collection("gleets").onSnapshot(snapshot => { //.collection("gleets").orderBy("createdAt","desc").onSnapshot(~~)
            const gleetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            setGleets(gleetArray);
        })
    }, [])
    const onSubmit = async (event) => { //promise를 리턴하기 때문에 async 넣는다
        event.preventDefault(); //submit 클릭시 새로고침되는거 막으려고
        await dbService.collection("gleets").add({
            text: gleet, // 이 gleet는 위에 setState의 gleet값
            createdAt: Date.now(),
            creatorId: userObj.uid,
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
        <div>
            {gleets.map(gleet => (
                <Gleet
                key={gleet.id} 
                gleetObj={gleet}
                isOwner={gleet.creatorId === userObj.uid}
                />
            ))}
        </div>
    </div>
    )
};
export default Home; 