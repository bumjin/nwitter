import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet"
import { v4 as uuid4 } from "uuid"

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])
    const [attachment, setAttachment] = useState("")
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        //console.log(file)
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent)
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result)
        }

        reader.readAsDataURL(theFile);
    }
    useEffect(() => {
        dbService.collection("nweets").onSnapshot(snapshot => {
            //console.log(snapshot.docs);
            const nweetsArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(nweetsArray)
        })
    }, [])

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
    return (
        <div>
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
            <div>
                {nweets.map(nweet => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}>
                    </Nweet>
                ))}
            </div>
        </div>
    )
}
export default Home;