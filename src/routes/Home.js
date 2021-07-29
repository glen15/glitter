import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";
import { dbService, sotrageService } from "fbase";
import Gleet from "../components/Gleet";

const Home = ({ userObj }) => {
    const [gleet, setGleet] = useState("");
    const [gleets, setGleets] = useState([]);
    const [attachment, setAttachment] = useState();
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
        const fileRef = sotrageService.ref().child(`${userObj.uid}/${uuidv4()}`); // 파일에 대한 레퍼런스
        const response = await fileRef.putString(attachment, "data_url") //readAsDataURL 했던게 data_url
        console.log(response);

        /* await dbService.collection("gleets").add({
            text: gleet, // 이 gleet는 위에 setState의 gleet값
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setGleet(""); //submit 했으니 다시 비워주는 것 */
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
            const {currentTarget:{result},} = finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile); //파일리더기로 파일 읽고
    };
    const onClearAttatchment = () => setAttachment(null) //사진 미리보기 없애기
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input value={gleet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChnage}/>
            <input type="submit" value="Gleet" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttatchment}>Clear</button>
                </div>
            
            )}
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