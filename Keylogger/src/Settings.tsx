import Theme from "./Theme";
import Font from "./Font";
import "./index.css";

function Settings () {
    return (
        <>
            <br></br>
            <div style={{overflowY:"scroll", height:"85vh"}}>
                <Font></Font>
                <Theme></Theme>
            </div>
        </>
    )
}
export default Settings;