import { useEffect } from "react";
import { useCanvas } from "../utils/functions";
import { useTool } from "../hooks/useTool";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";
import "./canvas.css";
import Toolbar from "./toolbar";
import pen from "../assets/pen.png"
function DrawCanvas(){

    const {
        canvasref, 
        startDrawing, 
        stopdrawing,
        draw,
        handleUndo,
        handleRedo,
        handleSave,
        handleColorPicker,
        colorPicker,
        color,
        setColor,
        handleDelete
    } = useCanvas();

    const [tool, setTool] = useTool();

    useEffect(() => {
        const cursor = tool === "pen" ? `url("${pen}") 0 16, auto` :
                       "default";
        document.body.style.cursor = cursor;
    }, [tool]);

    return (
        <>
        <div className="container">
            <div className="toolbar">
                <Toolbar 
                onUndo={handleUndo} 
                onRedo={handleRedo}
                onSave={handleSave}
                setTool={setTool}
                onColor={handleColorPicker}
                onDelete={handleDelete}/>
                
            </div>
        <div className="canvas-wrapper">
        <canvas 
            ref={canvasref}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopdrawing}
            onMouseLeave={stopdrawing}
        />
        {colorPicker && (
            <ColorPicker color={color} onChange={setColor}/>
        )}
        </div>
        </div>
        </>
    );
}

export default DrawCanvas;