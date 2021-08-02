import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({refreshUser, userObj}) => {
    //데이터베이스를 필터링해서 여기서는 userObj.uid를 기준으로 저거랑 일치하는 것만 불러온것
    // const getMyGleets = async () => { 
    //     const gleets = await dbService
    //         .collection("gleets")
    //         .where("creatorId", "==", userObj.uid)
    //         .orderBy("createdAt")//, "desc" 이걸 괄호안에 넣어서 내림차순 할 수 있지만 인덱스하나 더 만들어야함
    //         .get();
    //         console.log(gleets.docs.map(doc => doc.data()));
    // };
    // useEffect(() => {
    //     getMyGleets();
    // }, [])

    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    
    const onChange = (event) => {
        const {target : {value},} = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();//App에서 가져온 함수
        }
    };
    return (
    <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input 
                onChange={onChange}
                type="text"
                autoFocus
                placeholde="Display name"
                value={newDisplayName}
                className="formInput"
            />
            <input
                type="submit"
                value="Update Profile"
                className="formBtn"
                style={{marginTop: 10,}}
            />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            Log Out
        </span>
    </div>
    );
};