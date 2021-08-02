import React, { useEffect, useState } from "react";
import { dbService, sotrageService } from "fbase";
import Gleet from "components/Gleet";
import GleetFactory from "components/GleetFactory";

const Home = ({ userObj }) => {
    const [gleets, setGleets] = useState([]);
    useEffect(() => {
        dbService.collection("gleets").onSnapshot(snapshot => { //.collection("gleets").orderBy("createdAt","desc").onSnapshot(~~)
        // snapshot : 데이터베이스에 무슨일이 있을 때 알림을 받음
            const gleetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setGleets(gleetArray);
        });
    }, []);
    return (
    <div className="container">
       <GleetFactory userObj={userObj}/> 
        <div style={{ marginTop: 30 }}>
            {gleets.map((gleet) => (
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