import { generate } from "random-words";
import { useEffect, useState, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { auth } from "./Login";
import './Test.css'
import './index.css'

function Test () {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [timeSpent, settimeSpent] = useState(0);
    const [timeleft, settimeleft] = useState(0);
    const [displaytimeleft, setdisplaytimeleft] = useState<any>(null);
    const [words, setwords] = useState(0);
    const [currentword, setcurrentword] = useState(0);
    const [mode, setmode] = useState("");
    const [testStarted, settestStarted] = useState(false);
    const [siteloaded, setsiteloaded] = useState(true);
    const [randomlist] = useState([""]);
    const [displaylist] = useState([""]);
    const [highlightcolor, sethighlightcolor] = useState("inputbox");
    const [wpm, setwpm] = useState(0);
    const textRef = useRef(Array(displaylist.length).fill(null));
    const formRef = [useRef<HTMLInputElement | null>(null), useRef<HTMLInputElement | null>(null), useRef<HTMLInputElement | null>(null), useRef<HTMLInputElement | null>(null)];
    const [ishomebutton, setishomebutton] = useState(false);
    const [flipper, setflipper] = useState("Start");
    const [options, setoptions] = useState(["10", "30", "50", "100", "words"]);
    const [highscores, sethighscores] =useState([[0,0,0,0], [0,0,0,0], [0]]);
    const [displayedrows, setdisplayedrows] = useState([0,10,20,30]);
    const [errors, seterrors] = useState(0);
    const [accuracy, setaccuracy] = useState(0);
    const [rawwpm, setrawwpm] = useState(0);
    const [wordstyped, setwordstyped] = useState(0);
    const [canttype, setcanttype] = useState(false);
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

    const handleChange = (event: any) => {
        if (!testStarted) {
            event.target.value = "";
        }
        if (displaylist[currentword]) {
            if (event.target.value !== displaylist[currentword].slice(0, event.target.value.length)) {
                if (canttype) {
                    sethighlightcolor("invalid");
                } else {
                    sethighlightcolor("invalid");
                    seterrors(errors+1);
                    setcanttype(true);
                }
            } else {
                sethighlightcolor("inputbox");
                setcanttype(false);
            }
        }
        if (event.target.value === displaylist[currentword]) {
            if (textRef.current[currentword]) {
                textRef.current[currentword].style.color = "var(--correcttextcolor)";
            }
            if (options[4] === "words") {
                setcurrentword(currentword + 1);
            } else if (options[4] === "secs") {
                setcurrentword(currentword + 1);
                setwordstyped(wordstyped + randomlist[currentword].length);
            }
            event.target.value = "";
        } 
        if (currentword > displayedrows[1] - 1) {
            if (options[4] === "words") {
                setdisplayedrows([displayedrows[0] + 10, displayedrows[1] + 10, displayedrows[2] + 10, displayedrows[3] + 10]);
                for (let i = displayedrows[0]; i < displayedrows[1]; i++) {
                    let style = window.getComputedStyle(document.body);
                    if (textRef.current[i]) {
                        textRef.current[i].style.color = style.getPropertyValue("--textcolor");
                    }
                }
            } else if (options[4] === "secs") {
                for (let i = 0; i < 10; i++) {
                    randomlist.push(returnstring(generate()));
                }
                for (let i = 0; i < randomlist.length; i++) {
                    displaylist[i] = randomlist[i];
                }
                setdisplayedrows([displayedrows[0] + 10, displayedrows[1] + 10, displayedrows[2] + 10, displayedrows[3] + 10]);
                for (let i = displayedrows[0]; i < displayedrows[1]; i++) {
                    let style = window.getComputedStyle(document.body);
                    if (textRef.current[i]) {
                        textRef.current[i].style.color = style.getPropertyValue("--textcolor");
                    }
                }
            }
        }
    }

    const genlist = () => {
        length = randomlist.length;
        for (let i = 0; i < length; i++) {
            randomlist.pop();
        }
        for (let i = 0; i < words; i++) {
            let tempstring = returnstring(generate());
            randomlist.push(tempstring);
        }
    }

    const handleClick = () => {
        if (formRef[0].current?.checked === false && formRef[1].current?.checked === false && formRef[2].current?.checked === false && formRef[3].current?.checked == false) {
            alert("You need to select an option");
        } else if (displaylist[1000] || flipper === "Start") {
            setflipper("Stop");
            stoptest();
            let reallength = displaylist.length;
            for (let i = 0; i < reallength; i++) {
                displaylist.pop();
            }
            genlist();
            for (let i = 0; i < randomlist.length; i++) {
                displaylist[i] = randomlist[i];
            }
            //Probably bad practice but for some reason the app won't work without it
            //It has something to do with React not liking the words variable
            if (options[4] === "words") {
                 if (mode === "10") {
                    setdisplaytimeleft(null);
                    settimeleft(0);
                    setwords(10);
                } else if (mode === "30") {
                    setdisplaytimeleft(null);
                    settimeleft(0);
                    setwords(30);
                } else if (mode === "50") {
                    setdisplaytimeleft(null);
                    settimeleft(0);
                    setwords(50);
                } else if (mode === "100") {
                    setdisplaytimeleft(null);
                    settimeleft(0);
                    setwords(100);
                }
                settimeleft(0);
            } else if (options[4] = "secs") {
                if (mode === "10") {
                    settimeleft(10);
                    setwords(30);
                } else if (mode === "30") {
                    settimeleft(30);
                    setwords(30);
                } else if (mode === "60") {
                    settimeleft(60);
                    setwords(30);
                } else if (mode === "120") {
                    settimeleft(120);
                    setwords(30);
                }
            }
            if(inputRef.current) {
                inputRef.current.value = "";
                inputRef.current.focus();
            }
            setcurrentword(0);
            if (options[4] === "secs") {
                settimeSpent(0);
                setdisplaytimeleft(timeleft);
            }
            settestStarted(true);
            for (let i = 0; i < randomlist.length; i++) {
                if (textRef.current[i]) {
                    textRef.current[i].style.opacity = "100%"
                    textRef.current[i].style.color = "white";
                }
            }
        } else {
            stoptest();
            setdisplaytimeleft(null);
            setflipper("Start");
        }
    }

    useEffect(() => {
        if (siteloaded) {
            const existing_highscores = localStorage.getItem('highscores');
            if (existing_highscores !== null) {
                const json_highscores = JSON.parse(existing_highscores ?? "");
                sethighscores([[json_highscores["scores"][0][0],json_highscores["scores"][0][1],json_highscores["scores"][0][2],json_highscores["scores"][0][3]], [json_highscores["scores"][1][0],json_highscores["scores"][1][1],json_highscores["scores"][1][2],json_highscores["scores"][1][3]], json_highscores["scores"][2]]);
            } else {
                sethighscores([[0,0,0,0], [0,0,0,0], [0]]);
            }
            setwords(10);
            settimeleft(10);
            setsiteloaded(false);
        }
    }, [siteloaded])

    const handleform = (event: any) => {
        if (!testStarted) {
            if (event.target.id !== "words" || event.target.id !== "time") {
                setmode(event.target.id);
            }   
            if (event.target.id === "words") {
                formRef.forEach((i) => {
                    if (i.current) {
                        i.current.checked = false;
                    }
                });
                setoptions(["10", "30", "50", "100", "words"]);
            } else if (event.target.id === "time") {
                formRef.forEach((i) => {
                    if (i.current) {
                        i.current.checked = false;
                    }
                });
                setoptions(["10", "30", "60", "120", "secs"]);
            }
        }
    }

    useEffect(() => {
        const existing_user = auth.currentUser;
        if (existing_user) {
            const db = getDatabase(myApp);
            const dataReference = ref(db, 'users/' + existing_user.uid + "/scores/");
            onValue(dataReference, (snapshot) => {
                const dataItem = snapshot.val();
                if (dataItem) {
                    sethighscores([[snapshot.val()[0][0], snapshot.val()[0][1], snapshot.val()[0][2], snapshot.val()[0][3]], [snapshot.val()[1][0], snapshot.val()[1][1], snapshot.val()[1][2], snapshot.val()[1][3]], [snapshot.val()[2]]])
                    localStorage.setItem('highscores', JSON.stringify({
                        scores: [[snapshot.val()[0][0], snapshot.val()[0][1], snapshot.val()[0][2], snapshot.val()[0][3]], [snapshot.val()[1][0], snapshot.val()[1][1], snapshot.val()[1][2], snapshot.val()[1][3]], [snapshot.val()[2]]]
                    }))
                } else {
                    sethighscores([[0,0,0,0],[0,0,0,0],[0]]);
                    localStorage.setItem('highscores', JSON.stringify({
                        scores: [[0,0,0,0],[0,0,0,0],[0]]
                    }))
                }
            })
        }
    }, [])


    //Probably bad practice but for some reason the app won't work without it
    //It has something to do with React not updating the useState quick enough and react not liking the words variable
    useEffect(() => {
        if (!testStarted) {
            setdisplaytimeleft(null);
        }
        if (options[4] === "words") {
            if (mode === "10") {
                setdisplaytimeleft(null);
                settimeleft(0);
                setwords(10);
            } else if (mode === "30") {
                setdisplaytimeleft(null);
                settimeleft(0);
                setwords(30);
            } else if (mode === "50") {
                setdisplaytimeleft(null);
                settimeleft(0);
                setwords(50);
            } else if (mode === "100") {
                setdisplaytimeleft(null);
                settimeleft(0);
                setwords(100);
            }
        } else if (options[4] = "secs") {
            if (mode === "10") {
                settimeleft(10);
                setwords(30);
            } else if (mode === "30") {
                settimeleft(30);
                setwords(30);
            } else if (mode === "60") {
                settimeleft(60);
                setwords(30);
            } else if (mode === "120") {
                settimeleft(120);
                setwords(30);
            }
        }
    }, [mode, options, testStarted])

    const stoptest = () => {
        if (!ishomebutton) {
            setcurrentword(words);
            settestStarted(false);
            setcurrentword(0);
            settimeSpent(0);
            setwordstyped(0);
            seterrors(0);
            setishomebutton(false);
            setdisplaytimeleft(null);
            if(inputRef.current) {
                inputRef.current.value = "";
                sethighlightcolor("inputbox");
            }
            let reallength = displaylist.length;
            for (let i = 0; i < reallength; i++) {
                displaylist.pop();
            }
            setdisplayedrows([0, 10, 20, 30]);
        } else {
            setishomebutton(false);
            setcurrentword(words);
            settestStarted(false);
            setcurrentword(0);
            settimeSpent(0);
            seterrors(0);
            setwordstyped(0);
            setdisplaytimeleft(null);
            if(inputRef.current) {
                inputRef.current.value = "";
                sethighlightcolor("inputbox");
            }
            let reallength = displaylist.length;
            for (let i = 0; i < reallength; i++) {
                displaylist.pop();
            }
            setdisplayedrows([0, 10, 20, 30]);
        }
    }

    function updateHighscores (i1:number, i2:number, value:number) {
        let tempscores = highscores;
        tempscores[i1][i2] = value;
        sethighscores(tempscores);
        localStorage.setItem("highscores", JSON.stringify({
            scores: tempscores
        }));
    }

    //TODO - update this to work with the new method
    useEffect(() => {
        if (testStarted) {
            const countdownInterval = setInterval(() => {
                if (currentword === words && options[4] === "words" || timeleft > 0 && timeleft - (timeSpent*0.001) === 0 && options[4] === "secs") {
                    if (options[4] === "words") {
                        setaccuracy((returnlistcharlength(randomlist)-errors)/returnlistcharlength(randomlist));
                        setrawwpm((returnlistcharlength(randomlist) / 5)/(timeSpent * 0.00001667));
                        setwpm((returnlistcharlength(randomlist) / 5)/(timeSpent * 0.00001667) * (returnlistcharlength(randomlist)-errors)/returnlistcharlength(randomlist));
                        const realwpm = ((returnlistcharlength(randomlist) / 5)/(timeSpent * 0.00001667) * (returnlistcharlength(randomlist)-errors)/returnlistcharlength(randomlist));
                        let highscore;
                        const index = Math.round(mode as any as number / 25);
                        if (index > 3) {
                            highscore = highscores[0][3];
                            if (realwpm > highscore) {
                                updateHighscores(0, 3, realwpm);
                            }
                        } else {
                            highscore = highscores[0][index];
                            if (realwpm > highscore) {
                                updateHighscores(0, index, realwpm);
                            }
                        }
                    } else if (options[4] === "secs") {
                        setaccuracy((returnlistcharlength(randomlist)-errors)/returnlistcharlength(randomlist));
                        setrawwpm((wordstyped / 5)/(timeleft * 0.01667));
                        setwpm(((wordstyped / 5)/(timeleft * 0.01667)) * ((returnlistcharlength(randomlist)-errors)/returnlistcharlength(randomlist)));
                        const realwpm = (((wordstyped / 5)/(timeleft * 0.01667)) * ((returnlistcharlength(randomlist)-errors)/returnlistcharlength(randomlist)));
                        let highscore;
                        const index = Math.round(mode as any as number / 30);
                        if (index > 3) {
                            highscore = highscores[1][3];
                            if (realwpm > highscore) {
                                updateHighscores(1, 3, realwpm);
                            }
                        } else {
                            highscore = highscores[1][index];
                            if (realwpm > highscore) {
                                updateHighscores(1, index, realwpm);
                            }
                        }
                    }
                    const existing_user = auth.currentUser;
                    const tempscores = localStorage.getItem('highscores');
                    if (existing_user && tempscores && existing_user.emailVerified) {
                        const db = getDatabase(myApp);
                        const dataReference = ref(db, 'users/' + existing_user.uid + "/scores");
                        const highscorejson = JSON.parse(tempscores);
                        set(dataReference, highscorejson.scores);
                    }
                    setcurrentword(0);
                    settimeSpent(0);
                    setdisplaytimeleft(null);
                    for (let i = displayedrows[0]; i < displayedrows[1]; i++) {
                        if (textRef.current[i]) {
                            textRef.current[i].style.opacity = "0%";
                            textRef.current[i].style.color = "white";
                        }
                    }
                    let reallength = displaylist.length;
                    for (let i = 0; i < reallength; i++) {
                        displaylist.pop();
                    }
                    if (inputRef.current) {
                        inputRef.current.value = "";
                    }
                    setflipper("Start");
                    sethighlightcolor("inputbox");
                    setishomebutton(true);
                    settestStarted(false);
                }
                clearInterval(countdownInterval);
                settimeSpent(timeSpent + 50);
                if (options[4] === "secs") {
                    setdisplaytimeleft(timeleft - Math.floor(timeSpent * 0.001));
                } else {
                    setdisplaytimeleft(null);
                }
            }, 50);
            return () => clearInterval(countdownInterval);   
        }
    }, [testStarted, timeSpent, highscores, mode, options, wpm, accuracy, rawwpm])
    return (
        <div className="testarea">
            <br></br>
            <div style={{display:"flex", justifyContent:"center"}}>
                <div className="modeselect">
                    <form className="submodeslect">
                        <label htmlFor="words">Word mode:</label>
                        <input type="radio" id="words" name="words" onChange={handleform} defaultChecked className="radio"></input> <br></br>
                        <label htmlFor="time">Time mode:</label>
                        <input type="radio" id="time" name="words" onChange={handleform} className="radio"></input> <br></br>
                    </form>
                    <form>
                        <label htmlFor={options[0]}>{options[0]} {options[4]}:</label>
                        <input type="radio" id={options[0]} name="words" onChange={handleform} defaultChecked className="radio" ref={formRef[0]}></input> <br></br>
                        <label htmlFor={options[1]}>{options[1]} {options[4]}:</label>
                        <input type="radio" id={options[1]} name="words" onChange={handleform} className="radio" ref={formRef[1]}></input> <br></br>
                        <label htmlFor={options[2]}>{options[2]} {options[4]}:</label>
                        <input type="radio" id={options[2]} name="words" onChange={handleform} className="radio" ref={formRef[2]}></input> <br></br>
                        <label htmlFor={options[3]}>{options[3]} {options[4]}:</label>
                        <input type="radio" id={options[3]} name="words" onChange={handleform} className="radio" ref={formRef[3]}></input> <br></br>
                    </form>
                </div>
            </div>
            <div className="timer">
                { displaytimeleft }
            </div>
            {ishomebutton && !testStarted ? (
                <div className="finalscoreswrapper" id="stats">
                    <div className="boldtitle">
                        WPM:
                        <div className="boldtext">
                            {Math.round(wpm)}
                        </div>
                    </div>
                    <div>
                        Errors:
                        <div className="boldtext">
                            { errors }
                        </div>
                    </div>
                    <div>
                        Accuracy:
                        <div className="boldtext">
                            { Math.floor(accuracy * 100) + "%" }
                        </div>
                    </div>
                </div>
            ) : (
                <div className="fadeout"></div>
            )}
            {testStarted ? (
                <div className="gametextwrapper">
                    { displaylist.slice(displayedrows[0], displayedrows[1]).map((x, i) => {
                        return (
                            <span key={i} ref={(element) => {
                                textRef.current[i + displayedrows[0]] = element;
                            }}>{x}</span>
                        );
                    })}
                    <br></br>
                    { displaylist.slice(displayedrows[1], displayedrows[2]).map((x, i) => {
                        return (
                            <span key={i} ref={(element) => {
                                textRef.current[i + displayedrows[1]] = element;
                            }}>{x}</span>
                        );
                    })}
                    <br></br>
                    { displaylist.slice(displayedrows[2], displayedrows[3]).map((x, i) => {
                        if (displayedrows[3] !== 0) {
                            return (
                                <span key={i} ref={(element) => {
                                    textRef.current[i + displayedrows[2]] = element;
                                }}>{x}</span>
                            );
                        } else {
                            return (
                                <span></span>
                            );
                        }
                    })}
                </div>
            ) : (
                <div></div>
            )}
            {!ishomebutton && !testStarted ? (
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div className="highscoreswrapper">
                        <div className="highscoretitle">
                            Highscores:
                        </div>
                        <div className="highscores">
                            <div style={{display:"flex", justifyContent:"space-between", flexWrap: "wrap"}}>
                                <div className="highscoresubwrapper" style={{marginRight:"0.5vw"}}>
                                    <div style={{marginLeft:"20px",marginRight:"20px"}}>
                                        <div style={{fontSize:"45%", textAlign:"center"}}>
                                            10 Words:
                                        </div>
                                        <div className="highscoretitle">
                                            {Math.round(highscores[0][0])}
                                        </div>
                                    </div>
                                    <div style={{marginLeft:"20px",marginRight:"20px"}}>
                                        <div style={{fontSize:"45%", textAlign:"center"}}>
                                            30 Words:
                                        </div>
                                        <div className="highscoretitle">
                                            {Math.round(highscores[0][1])}
                                        </div>
                                    </div>
                                    <div style={{marginLeft:"20px",marginRight:"20px"}}>
                                        <div style={{fontSize:"45%", textAlign:"center"}}>
                                            50 Words:
                                        </div>
                                        <div className="highscoretitle">
                                            {Math.round(highscores[0][2])}
                                        </div>
                                    </div>
                                    <div style={{marginLeft:"20px",marginRight:"20px"}}>
                                        <div style={{fontSize:"45%", textAlign:"center"}}>
                                            100 Words:
                                        </div>
                                        <div className="highscoretitle">
                                            {Math.round(highscores[0][3])}
                                        </div>
                                    </div>
                                </div>
                                <div className="highscoresubwrapper" style={{marginLeft:"0.5vw", width:"380px"}}>
                                    <div style={{marginLeft:"20px",marginRight:"20px"}}>
                                        <div style={{fontSize:"50%", textAlign:"center"}}>
                                            10 Secs:
                                        </div>
                                        <div className="highscoretitle">
                                            {Math.round(highscores[1][0])}
                                        </div>
                                    </div>
                                    <div style={{marginLeft:"15px",marginRight:"20px"}}>
                                        <div style={{fontSize:"50%", textAlign:"center"}}>
                                            30 Secs:
                                        </div>
                                        <div className="highscoretitle">
                                            {Math.round(highscores[1][1])}
                                        </div>
                                    </div>
                                    <div style={{marginLeft:"15px",marginRight:"20px"}}>
                                        <div style={{fontSize:"50%", textAlign:"center"}}>
                                            60 Secs:
                                        </div>
                                        <div className="highscoretitle">
                                            {Math.round(highscores[1][2])}
                                        </div>
                                    </div>
                                    <div style={{marginLeft:"15px",marginRight:"20px"}}>
                                        <div style={{fontSize:"50%", textAlign:"center"}}>
                                            100 Secs:
                                        </div>
                                        <div className="highscoretitle">
                                            {Math.round(highscores[1][3])}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="fadeout"></div>
            )}
            <input ref={inputRef} onChange={handleChange} className={highlightcolor} id="inputbox"></input>
            <div>
                <button onClick={handleClick} className="controlbuttons">
                    {flipper} test
                </button>
                {ishomebutton ? (
                    <button className="controlbuttons" onClick={stoptest}>Return home</button>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}

function returnlistcharlength(inlist: any) {
    let returnval = 0;
    for (let i = 0; i < inlist.length; i++) {
        returnval += (inlist[i].length);
    }
    return returnval;
}

function returnstring (instring: string | string[]) {
    instring = instring + " ";
    return instring.toString();
}

export default Test;