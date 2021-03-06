import React, { useState } from "react";
import { dbService, sotrageService } from "fbase";
import {v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const GleetFactory = ({userObj}) => {
    const [gleet, setGleet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => { //promise를 리턴하기 때문에 async 넣는다
        if (gleet === "") {
            return;
          }
        event.preventDefault(); //submit 클릭시 새로고침되는거 막으려고
        let attachmentUrl = "";
        if (attachment !== ""){
            const attachmentRef = sotrageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`); // 파일에 대한 레퍼런스 refFromURL 메소드로 storage에서 찾을 수도 있다
            const response = await attachmentRef.putString(attachment, "data_url"); //readAsDataURL 했던게 data_url
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const gleetObj = {
            text: gleet, // 이 gleet는 위에 setState의 gleet값
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("gleets").add(gleetObj);
        setGleet(""); //submit 했으니 다시 비워주는 것
        setAttachment("");
    };
    const onChange = (event) => {
        const { 
            target: {value},
        } = event;
        // event 안에있는 target 안에있는 value를 내놔라는것
        setGleet(value);
    };
    const onFileChange = (event) => {
        // console.log(event.target.files); // input이 가진 타겟에서 파일까지 접근
        const {target:{ files },} = event; //이벤트안으로 가서 target에서 files가져와라 es6의 기능
        const theFile = files[0]; // 파일만들고
        const reader = new FileReader(); //파일리더기 만들고
        reader.onloadend = (finishedEvent) => {
            const {currentTarget:{result},} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile); //파일리더기로 파일 읽고
    };
    const onClearAttachment = () => setAttachment(""); //사진 미리보기 없애기
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                className="factoryInput__input"
                value={gleet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                opacity: 0,
                }}
            />
        {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                        backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                 )}
        </form>
    )}

export default GleetFactory;