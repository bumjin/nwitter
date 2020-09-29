import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input type="text" onChange={onChange} placeholder="Edit your nweet" value={newNweet} required autoFocus className="formInput"></input>
                        <input type="submit" value="Update Nweet" className="formBtn"></input>
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                </>
            ) :
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} ></img>}
                    {isOwner && (
                        <div class="nweet__actions">
                            <button onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></button>
                            <button onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></button>
                        </div>
                    )
                    }
                </>
            }

        </div >
    )
}



export default Nweet