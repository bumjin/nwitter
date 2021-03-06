import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase"
import { useHistory } from "react-router-dom";
const Profile = ({ userObj, refreshUser }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/")
        //refreshUser();
    }
    const getMyNweets = async () => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createAt")
            .get()
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
            refreshUser();
        }
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" autoFocus onChange={onChange} placeholder="Display Name" value={newDisplayName} className="formInput"></input>
                <input type="submit" value="Update Profile" className="formBtn"
                    style={{
                        marginTop: 10,
                    }}></input>
            </form>
            <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</button>
        </div>
    )

}
export default Profile;