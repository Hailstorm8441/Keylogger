import "./Font.css";

function Font () {

    function setFont(font:string) {
        document.body.style.fontFamily = font;
        localStorage.setItem("font", JSON.stringify({StoredFont:font}));
        if (font === "Roboto") {
            document.body.style.fontWeight = "200";
        } else if (font === "Rubik") {
            document.body.style.fontWeight = "500";
        } else {
            document.body.style.fontWeight = "450";
        }
        if (font === "Wingdings") {
            document.body.style.fontSize = "120%"
        } else if (font === "Playwrite DK Loopet") {
            document.body.style.fontSize = "130%";
        } else {
            document.body.style.fontSize = "170%"
        }
    }

    return(
        <>
            <div id="fontsettings" className="primarydiv">
                <div style={{fontSize:35}}>Font:</div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div className="fontgrid">
                        <button className="fontgridItem" style={{fontSize:"30px", fontFamily: "Rubik", fontWeight: "500"}} onClick={() => setFont("Rubik")}>Rubik</button>
                        <button className="fontgridItem" style={{fontSize:"30px", fontFamily: "Times-new-roman", fontWeight: "450"}} onClick={() => setFont("Times-new-roman")}>Times</button>
                        <button className="fontgridItem" style={{fontSize:"30px", fontFamily: "Roboto", fontWeight: "200"}} onClick={() => setFont("Roboto")}>Roboto</button>
                        <button className="fontgridItem" style={{fontSize:"24px", fontFamily: "Playwrite DK Loopet", fontWeight: "450"}} onClick={() => setFont("Playwrite DK Loopet")}>Cursive</button>
                        <button className="fontgridItem" style={{fontSize:"28px", fontFamily: "Typewriter", fontWeight: "450"}} onClick={() => setFont("Typewriter")}>Typewriter</button>
                        <button className="fontgridItem" style={{fontSize:"30px", fontFamily: "Impact", fontWeight: "450"}} onClick={() => setFont("Impact")}>Impact</button>
                        <button className="fontgridItem" style={{fontSize:"30px", fontFamily: "Comic Neue", fontWeight: "450"}} onClick={() => setFont("Comic Neue")}>Comic Sans</button>
                        <button className="fontgridItem" style={{fontSize:"30px", fontFamily: "Tagesschrift", fontWeight: "450"}} onClick={() => setFont("Tagesschrift")}>Tagesschrift</button>
                        <button className="fontgridItem" style={{fontSize:"30px", fontFamily: "Pixelify Sans", fontWeight: "450"}} onClick={() => setFont("Pixelify Sans")}>Pixel</button>
                        <button className="fontgridItem" style={{fontSize:"22px", fontFamily: "Wingdings", fontWeight: "400"}} onClick={() => setFont("Wingdings")}>Wingdings</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Font;