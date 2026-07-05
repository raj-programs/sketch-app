import { useEffect } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";
import "../styles/canvas.css";
import Toolbar from "./toolbar";
import Navbar from "./navbar";
import DialogBox from "./savebox";
import { useState } from "react";
import LoginDialog from "../pages/loginpage";
import SignUp from "../pages/signuppage";
function DrawCanvas(){

    const {
        canvasref, 
        startDrawing, 
        stopdrawing,
        draw,
        handleUndo,
        handleRedo,
        handleDownload,
        handleColorPicker,
        colorPicker,
        color,
        setColor,
        handleDelete,
        handleSave,
        showLogin,
        setShowlogin,
    } = useCanvas();

    const [darkMode, setDarkmode] = useState(false);
    const [showSignup, setShowsignup] = useState(false)

useEffect(() => {

    const handleAuthExpired = () => {
        setShowlogin(true);
    };

    window.addEventListener("auth-expired", handleAuthExpired);

    return () => {
        window.removeEventListener("auth-expired", handleAuthExpired);
    };

}, [setShowlogin]);

    const toggleTheme = () => {
        setDarkmode(prev => !prev)
    }


    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode])

    return (
        <>
        <Navbar
        darkMode={darkMode} 
        toggleTheme={toggleTheme}
        />
        <div className="container">
            <div className="toolbar">
                <Toolbar 
                onUndo={handleUndo} 
                onRedo={handleRedo}
                onDownload={handleDownload}
                onColor={handleColorPicker}
                onDelete={handleDelete}
                onSave={handleSave}
                onThemeChange={toggleTheme}
                />
                
            </div>
        <div className="canvas-wrapper">
        <canvas 
            ref={canvasref}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopdrawing}
            onMouseLeave={stopdrawing}
        />
        </div>
        <div className="color-container">
        {colorPicker && (
            <ColorPicker color={color} onChange={setColor} className="color-picker" />
        )}

        {
            showLogin && (
               <LoginDialog
    open={showLogin}
    onOpenChange={setShowlogin}
    onSignupClick={() => {
        setShowlogin(false);
        setShowsignup(true);
    }}
/>
            )
        }

        <SignUp
    open={showSignup}
    onOpenChange={setShowsignup}
    onLoginClick={() => {
        setShowsignup(false);
        setShowlogin(true);
    }}
/>
        </div>
        </div>
        </>
    );
}

export default DrawCanvas;