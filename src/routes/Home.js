import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet"

import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([])

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


    return (
        <div className="container">
            <NweetFactory userObj={userObj}></NweetFactory>
            <div style={{ marginTop: 30 }}>
                {nweets.map(nweet => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}>
                    </Nweet>
                ))}
            </div>
        </div>
    )
}
export default Home;