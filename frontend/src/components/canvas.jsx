import { useEffect } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { useTool } from "../hooks/useTool";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";
import "./canvas.css";
import Toolbar from "./toolbar";
import pen from "../assets/pen.png"
import Navbar from "./navbar";
import Login from "../pages/loginpage"
import DialogBox from "./savebox";
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

    const [tool, setTool] = useTool();

    useEffect(() => {
        const cursor = tool === "pen" ? `url("${pen}") 0 16, auto` :
                       "default";
        document.body.style.cursor = cursor;
    }, [tool]);

    return (
        <>
        <Navbar />
        <div className="container">
            <div className="toolbar">
                <Toolbar 
                onUndo={handleUndo} 
                onRedo={handleRedo}
                onDownload={handleDownload}
                setTool={setTool}
                onColor={handleColorPicker}
                onDelete={handleDelete}
                onSave={handleSave}
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