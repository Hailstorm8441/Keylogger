import { useEffect, useState } from 'react';
import './Theme.css';

function Theme () {
    const [arealoaded, setarealoaded] = useState(false);
    const [currentTheme, setcurrentTheme] = useState(["#0f0f0f", "#1a1a1a", "#313131", "#8f8f8f", "#ffffff","#f23232"]);
    let themes = {
        "Dark": ["#0f0f0f", "#1a1a1a", "#313131", "#8f8f8f", "#ffffff","#f23232"],
        "Light": ["#ffffff", "#e1e1e1", "#c1c1c1", "#616161", "#0f0f0f", "#f23232"],
        "Catpuccin": ["#1e1e2e", "#181825", "#11111b", "#9399b2", "#a6e3a1", "#f38ba8"],
        "Miami": ["#202020", "#2a2a2a", "#414141", "#0bd3d3", "#f890e7", "#D59E03"],
        "Terminal": ["#000000", "#0a0a0a", "#212121", "#00ff00", "#ffffff", "#ff0000"],
        "VScode": ["#1E1E1E", "#191919","#2D2D2D", "#D4D4D4", "#007ACC", "#E24446"],
        "Spearmint": ["#111111", "#222222", "#333333", "#dddddd", "#1DCD9F", "#CD1D1F"],
        "Nightowl": ["#011627", "#0B2942", "#0B4972", "#5C84A3", "#22da6e", "#ef5350"],
        "Ketchup & Mustard": ["#BF2216", "#921F0F", "#85190D", "#C7AF16", "#ffffff", "#6F2116"],
        "Grape": ["#240044", "#3B0365", "#5B2385", "#ffffff", "#449F34", "#D26F2B"],
        "Ape": ["#323437", "#2C2E31", "#3C3E41", "#D1D0C5", "#E2B714","#BC4452"],
        "Nord": ["#FFFFFF", "#D8DEE9", "#AFB7C6", "#4C566A", "#5E81AC", "#B05B63"],
        "Dracula": ["#282A36", "#44475A", "#34374A", "#F8F8F2", "#50FA7B", "#FF79C6"],
        "Sweden": ["#0058A3", "#024F8E", "#023F7E", "#57ABDB", "#FFCC02", "#D63E40"],
        "95": ["#008081", "#C0C0C0", "#8F8F8F", "#242021", "#040381", "#EF8A4C"]
    }; 

    const themeOption = (colors:Array<string>) => {
        if (colors[0] !== "random") {
            setcurrentTheme(colors);
            localStorage.setItem("theme", JSON.stringify(colors));
        } else {
            let tempcolors = [getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()]
            setcurrentTheme(tempcolors)
            localStorage.setItem("theme", JSON.stringify(tempcolors));
        }
    }

    const genColoredDivs = (colors:Array<string>) => {
        return (
            <div style={{display:"flex", justifyContent:"space-between", marginTop:"1vh"}}>
                <div style={{backgroundColor:colors[0], width:"25px", height:"25px", borderStyle:"solid", borderWidth:"2px", borderRadius:"5px", marginLeft:"0.2vw", marginRight:"0.2vw"}}></div>
                <div style={{backgroundColor:colors[1], width:"25px", height:"25px", borderStyle:"solid", borderWidth:"2px", borderRadius:"5px", marginLeft:"0.2vw", marginRight:"0.2vw"}}></div>
                <div style={{backgroundColor:colors[2], width:"25px", height:"25px", borderStyle:"solid", borderWidth:"2px", borderRadius:"5px", marginLeft:"0.2vw", marginRight:"0.2vw"}}></div>
                <div style={{backgroundColor:colors[3], width:"25px", height:"25px", borderStyle:"solid", borderWidth:"2px", borderRadius:"5px", marginLeft:"0.2vw", marginRight:"0.2vw"}}></div>
                <div style={{backgroundColor:colors[4], width:"25px", height:"25px", borderStyle:"solid", borderWidth:"2px", borderRadius:"5px", marginLeft:"0.2vw", marginRight:"0.2vw"}}></div>
                <div style={{backgroundColor:colors[5], width:"25px", height:"25px", borderStyle:"solid", borderWidth:"2px", borderRadius:"5px", marginLeft:"0.2vw", marginRight:"0.2vw"}}></div>
            </div>
        )
    }

    useEffect(() => {
        if (!arealoaded) {
            let style = window.getComputedStyle(document.body);
            setcurrentTheme([style.getPropertyValue("--background"), style.getPropertyValue("--secondary1"), style.getPropertyValue("--secondary2"), style.getPropertyValue("--textcolor"), style.getPropertyValue("--correcttextcolor"), style.getPropertyValue("--incorrecttextcolor")])
            setarealoaded(true);
        } else {
            document.documentElement.style.cssText = "--background: " + currentTheme[0] + "; --secondary1: " + currentTheme[1] + "; --secondary2: " + currentTheme[2] + "; --textcolor: " + currentTheme[3] + ";" + "; --correcttextcolor: " + currentTheme[4] + "; --incorrecttextcolor:" + currentTheme[5] + ";";
        }
    }, [currentTheme])

    return (
        <>
            <br></br>
            <div className='themeBox'>
                <div style={{display:"flex", justifyContent:"left", fontSize:"35px"}}>
                    Theme:
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div className="grid">
                        <button className='gridItem' onClick={() => themeOption(themes["Light"])}>
                            Light
                            {genColoredDivs(themes["Light"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Nord"])}>
                            Nord
                            {genColoredDivs(themes["Nord"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["95"])}>
                            95
                            {genColoredDivs(themes["95"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Sweden"])}>
                            Sweden
                            {genColoredDivs(themes["Sweden"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Ketchup & Mustard"])}>
                            Ketchup & Mustard
                            {genColoredDivs(themes["Ketchup & Mustard"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Grape"])}>
                            Grape
                            {genColoredDivs(themes["Grape"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Dark"])}>
                            Dark
                            {genColoredDivs(themes["Dark"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Ape"])}>
                            Ape Writer
                            {genColoredDivs(themes["Ape"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["VScode"])}>
                            VScode
                            {genColoredDivs(themes["VScode"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Spearmint"])}>
                            Spearmint
                            {genColoredDivs(themes["Spearmint"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Miami"])}>
                            Miami
                            {genColoredDivs(themes["Miami"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Catpuccin"])}>
                            Catpuccin
                            {genColoredDivs(themes["Catpuccin"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Dracula"])}>
                            Dracula
                            {genColoredDivs(themes["Dracula"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Nightowl"])}>
                            Nightowl
                            {genColoredDivs(themes["Nightowl"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(themes["Terminal"])}>
                            Terminal
                            {genColoredDivs(themes["Terminal"])}
                        </button>
                        <button className='gridItem' onClick={() => themeOption(["random"])}>
                            Random
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default Theme;