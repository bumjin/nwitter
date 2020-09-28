import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase"
import { useHistory } from "react-router-dom";
const Profile = ({ userObj }) => {
    console.log(userObj.displayName)
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/")
    }
    const getMyNweets = async () => {
        console.log(userObj.uid)
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createAt")
            .get()
        console.log(nweets.docs.map(doc => doc.data()))
    }
    useEffect(() => {
        getMyNweets();
    }, [])

    const onChange = (event) => {
        const { target: { value } } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            })
        }
    }
    return (<>
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} placeholder="Display Name" value={newDisplayName}></input>
            <input type="submit" value="Update Profile"></input>
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>)

}
export default Profile;