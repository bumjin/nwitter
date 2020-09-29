import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false)
    const [newNweet, setNewNweet] = useState(nweetObj.text)

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        })
        setEditing(false)
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewNweet(value);
    }

    const onDeleteClick = async () => {
        const ok = window.confirm('Are you sure you want to delete this tweet?')
        if (ok) {
            //delete nweet
            await dbService.doc(`nweets/${nweetObj.id}`).delete()
            await storageService.refFromURL(`${nweetObj.attachmentUrl}`).delete()

        }
    }

    const toggleEditing = () => setEditing((prev) => !prev);

    return (
        < div >
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" onChange={onChange} placeholder="Edit your nweet" value={newNweet} required></input>
                        <button onClick={toggleEditing}>Cancel</button>
                        <input type="submit" value="Update Nweet"></input>
                    </form>
                </>
            ) :
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px"></img>}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )
                    }
                </>
            }

        </div >
    )
}



export default Nweet