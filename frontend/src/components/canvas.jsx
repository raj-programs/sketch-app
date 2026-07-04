import { useEffect } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";
import "../styles/canvas.css";
import Toolbar from "./toolbar";
import Navbar from "./navbar";
import Login from "../pages/loginpage"
import DialogBox from "./savebox";
import { useState } from "react";
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
                <Login 
                onSuccess={
                    () => setShowlogin(false)
                }
                />
            )
        }
        </div>
        </div>
        </>
    );
}

export default DrawCanvas;