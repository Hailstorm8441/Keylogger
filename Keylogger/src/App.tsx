import { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import Test from './Test';
import Settings from './Settings';
import Login from './Login';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './Login';
import './Login.css';

const provider = new GoogleAuthProvider();

function App() {
  enum pages {
    TEST = 0,
    SETTINGS = 1,
    LEADERBOARD = 2,
    LOGIN = 3
  }
  const [startingTheme] = useState(["#0f0f0f", "#1a1a1a", "#313131", "#8f8f8f", "#ffffff","#f23232", "False"]);
  const [currentPage, setcurrentPage] = useState(pages.TEST);
  const [gottencookies, setgottencookies] = useState(false);

  function page () {
    switch (currentPage) {
      case pages.TEST:
        return (
          <>
            <Test></Test>
          </>
        )
      case pages.SETTINGS:
        return (
          <>
            <Settings></Settings>
          </>
        )
      case pages.LOGIN:
        return (
          <Login></Login>
        )
    }
  }

  const loginClick = async () => {
    if (auth.currentUser) {
      setcurrentPage(pages.LOGIN);
    } else {
      signInWithPopup(auth, provider)
      .then(() => {
        setcurrentPage(pages.LOGIN);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
      });
    }
  }

  useEffect(() => {
    if (!gottencookies) {
      const existingTheme = localStorage.getItem("theme");
      const existingFont = localStorage.getItem("font");
      if (existingTheme !== null) {
        const theme = JSON.parse(existingTheme);
        if (existingFont !== null) {
          const font = JSON.parse(existingFont);
          document.body.style.fontFamily = font.StoredFont;
          if (font.StoredFont === "Roboto") {
              document.body.style.fontWeight = "200";
          } else if (font.StoredFont === "Rubik") {
              document.body.style.fontWeight = "500";
          } else {
              document.body.style.fontWeight = "450";
          }
          if (font.StoredFont === "Wingdings") {
              document.body.style.fontSize = "120%"
          } else {
              document.body.style.fontSize = "170%"
          }
        }
        document.documentElement.style.cssText = "--background: " + theme[0] + "; --secondary1: " + theme[1] + "; --secondary2: " + theme[2] + "; --textcolor: " + theme[3] + ";" + "; --correcttextcolor: " + theme[4] + "; --incorrecttextcolor:" + theme[5] + ";";
      } else {
        document.body.style.fontFamily = "Rubik";
        document.documentElement.style.cssText = "--background: " + startingTheme[0] + "; --secondary1: " + startingTheme[1] + "; --secondary2: " + startingTheme[2] + "; --textcolor: " + startingTheme[3] + ";" + "; --correcttextcolor: " + startingTheme[4] + "; --incorrecttextcolor:" + startingTheme[5] + ";";
      }
      setgottencookies(true);
    }
  }, [gottencookies])

  return (
    <>
      <div className='routesWrapper'>
        <div id="test" onClick={ () => setcurrentPage(pages.TEST) } className='title'>
          KeyLogger
        </div>
        <div>
          <span onClick={ loginClick } style={{marginRight:"1vw", marginLeft:"1vw"}} className='material-symbols-outlined routes' title='Login'>
            person
          </span>
          <span onClick={ () => setcurrentPage(pages.SETTINGS) } style={{marginRight:"1vw"}} className="material-symbols-outlined routes" title='Theme'>
            palette
          </span>
        </div>
      </div>
      <div style={{marginTop:"-2vh"}}>
        {page()}
      </div>
    </>
  )
}

export default App;