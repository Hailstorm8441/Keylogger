import { initializeApp } from 'firebase/app';
import { deleteUser, getAuth } from 'firebase/auth';
import { getDatabase, ref, set, remove, onValue } from 'firebase/database';
import './Login.css';
import { useEffect, useState } from 'react';

const firebaseConfig = {
    apiKey: {input key here},
    authDomain: {input key here},
    databaseURL: {input key here},
    projectId: {input key here},
    storageBucket: {input key here},
    messagingSenderId: {input key here},
    appId: {input key here},
};
const myApp = initializeApp(firebaseConfig);
const myauth = getAuth(myApp);

function Login () {
    const [username, setusername] = useState(localStorage.getItem("currentUser"));
    const [image, setimage] = useState("");

    const signUserOut = () => {
        auth.signOut();
        localStorage.setItem('highscores', JSON.stringify({
            scores: [[0,0,0,0],[0,0,0,0],[0]]
        }));
        localStorage.setItem('currentUser', "");
        location.reload();
    }

    const deleteAccount = async () => {
        if (confirm("Are you sure you want to delete your account")) {
            if (auth.currentUser) {
                const db = getDatabase(myApp);
                const id = auth.currentUser.uid;
                const reference = ref(db, 'users/' + id);
                remove(reference);
                localStorage.setItem('highscores', JSON.stringify({
                    scores: [[0,0,0,0],[0,0,0,0],[0]]
                }));
                localStorage.setItem('currentUser', "");
                setimage("");
                await deleteUser(auth.currentUser);1
                location.reload();
            }
        } else {
            return;
        }
    }

    const deleteScores = async () => {
        if (confirm("Are you sure you want to delete your high scores")) {
            if (auth.currentUser) {
                const db = getDatabase(myApp);
                const id = auth.currentUser.uid;
                const highscoreReference = ref(db, 'users/' + id + "/scores");
                set(highscoreReference, [[0, 0, 0, 0], [0, 0, 0, 0], 0]);
            }
        } else {
            return;
        }
    }

    const changeProfilePic = () => {
        if (auth.currentUser?.emailVerified) {
            let imagesrc = prompt("Input the image url below");
            if (imagesrc) {setimage(imagesrc);}
            const db = getDatabase(myApp);
            const id = auth.currentUser?.uid;
            const reference = ref(db, "users/" + id + "/profileIcon");
            set(reference, {
                profileIcon: imagesrc
            })
        }
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const db = getDatabase(myApp);
            const id = user.uid;
            const reference = ref(db, "users/" + id + "/profileIcon");
            if (auth.currentUser?.email?.split("@")[0]) {
                setusername(auth.currentUser.email.split("@")[0]);
            }
            onValue(reference, (snapshot) => {
                const dataItem = snapshot.val();
                if (dataItem) {
                    setimage(dataItem["profileIcon"]);
                }
            })
        }
    }, [])

    return(
        <>
            <div className='loginWrapper userInfo'>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginLeft: "-100px", marginBottom: "2vh" }}>
                    <div style={{ fontSize: "40px", marginTop: "30px", marginRight: "20px" }}>Signed in as {username}</div>
                    <div className='profilePicWrapper' onClick={changeProfilePic}>
                        <img className='userProfilePic' src={image}></img>
                        <div className='userProfilePicHover'>
                            <div className='userProfilePicText'>Change profile photo</div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
                    <div className='logingrid' style={{ marginBottom: "-3vh" }}>
                        <button onClick={signUserOut} style={{height:"90px"}} className='loginbutton userInfoButton'>Sign Out</button>
                    </div>
                    <div className='logingrid' style={{ marginBottom: "2vh" }}>
                        <button onClick={deleteAccount} className='dangerousbutton userInfoButton'>Delete account</button>
                        <button onClick={deleteScores} className='dangerousbutton userInfoButton'>Reset Highscores</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export const auth = myauth;
export default Login;