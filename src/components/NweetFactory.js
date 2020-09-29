import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuid4 } from "uuid"

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("")
    const [attachment, setAttachment] = useState("")
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = '';
        if (attachment !== '') {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuid4()}`)
            const response = await fileRef.putString(attachment, "data_url")
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl: attachmentUrl
        }
        dbService.collection("nweets").add(nweetObj)
        setNweet("")
    }
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNweet(value)
    }
    const onClearAttachment = () => {
        setAttachment(null)
    }

    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        //console.log(file)
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result)
        }

        reader.readAsDataURL(theFile);
    }
    return (
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange}></input>
            <input type="submit" value="Nweet" />

            {attachment &&
                <div>
                    <img src={attachment} width="50px" height="50px"></img>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            }
        </form>

    )
}

export default NweetFactory;