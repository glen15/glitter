import { dbService } from "fbase";
import Gleet from "../components/Gleet";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [gleet, setGleet] = useState("");
    const [gleets, setGleets] = useState([]);
    useEffect(() => {
        dbService.collection("gleets").onSnapshot(snapshot => { //.collection("gleets").orderBy("createdAt","desc").onSnapshot(~~)
        // snapshot : 데이터베이스에 무슨일이 있을 때 알림을 받음
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
    const onFileChnage = (event) => {
        // console.log(event.target.files); // input이 가진 타겟에서 파일까지 접근
        const {target:{files},} = event //이벤트안으로 가서 target에서 files가져와라 es6의 기능
        const theFile = files[0]; // 파일만들고
        const reader = new FileReader(); //파일리더기 만들고
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
        }
        reader.readAsDataURL(theFile); //파일리더기로 파일 읽고
    };
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input value={gleet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChnage}/>
            <input type="submit" value="Gleet" />
        </form>
        <div>
            {gleets.map(gleet => (
                <Gleet
                key={gleet.id} 
                gleetObj={gleet} //모든데이터
                isOwner={gleet.creatorId === userObj.uid} //userObj는 Router에서 Home으로 보낸 prop
                />
            ))}
        </div>
    </div>
    )
};
export default Home; 