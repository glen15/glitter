import { useState } from "react";
import { dbService, sotrageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Gleet = ({gleetObj, isOwner}) => {
    const  [editing, setEditing] = useState(false); //edit mode 변경을 위해서
    const  [newGleet, setNewGleet] = useState(gleetObj.text); //edit input에 넣는걸 onChange반영하기 위해서
     
    const  onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this gleet?");
        if (ok) {
            await dbService.doc(`gleets/${gleetObj.id}`).delete(); //firebase
            //doc 의 id를 알고있기 때문에 가능했지. 이건 home에서 보내준 gleetObj덕분이고
            //gleets collection에서 id로 document를 찾아온거 / firebase callection 보면 확인가능
            await sotrageService.refFromURL(gleetObj.attachmentUrl).delete(); // 사진도 storage에서 지우기
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev);
    //전에 값을 받아서 반대로 바꿔서 저장
    //편집모드로 들어가게할 때 이렇게 쓰면 좋겠다. useState로 true false 바꾸면서
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`gleets/${gleetObj.id}`).update({
            text: newGleet,
        });
        setEditing(false)
    };
    const onChange = (event) => {
        const {target:{value},} = event;
        setNewGleet(value);
        //이거해야 새로 작성하는 수정하기 글이 보이지
    }

    return (
        <div className="gleet">
          {editing ? (
            <>
              <form onSubmit={onSubmit} className="container gleetEdit">
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newGleet}
                  required
                  autoFocus
                  onChange={onChange}
                  className="formInput"
                />
                <input type="submit" value="Update Gleet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          ) : (
            <>
              <h4>{gleetObj.text}</h4>
              {gleetObj.attachmentUrl && <img src={gleetObj.attachmentUrl} />}
              {isOwner && (
                <div className="gleet__actions">
                  <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                  <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      );
    };
    
    export default Gleet;