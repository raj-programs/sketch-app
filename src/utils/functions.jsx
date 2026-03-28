import { useEffect, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette"
import "react-color-palette/css"


export function useCanvas() {

    const canvasref = useRef(null);
    const ctxRef = useRef(null);
    const pointsref = useRef([]);
    const finalpointsref = useRef([]);
    const undoRef = useRef([]);
    const redoRef = useRef([]);

    const [drawing, setDrawing] = useState(false);
    const [colorPicker, setColorPicker] = useState(false);
    const [color, setColor] = useColor("black")

    const redrawCanvas = () => {
            const canvas = canvasref.current;
            const ctx = ctxRef.current;

            if(!canvas || !ctx) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            finalpointsref.current.forEach(stroke => {
                if (stroke.points.length === 0) return;
                ctx.beginPath();
                ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

                for (let i = 1; i < stroke.points.length; i++) {
                    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
                }

                ctx.strokeStyle = stroke.color;
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.closePath();
            })
        }

   useEffect(() => {

   const resize = () => {
    const canvas = canvasref.current;
    const rect = canvas.parentElement.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    ctxRef.current = canvas.getContext("2d");

    redrawCanvas();
};

resize();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
}, []);

    const startDrawing = (e) => {
        const c = ctxRef.current;
        setDrawing(true);

        c.beginPath();

        pointsref.current = [];

        const rect = canvasref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        c.moveTo(x, y);

        pointsref.current.push({ x, y });

        redoRef.current = [];
    };

    const draw = (e) => {
        if (!drawing) return;

        const rect = canvasref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const c = ctxRef.current;

        c.lineTo(x, y);
        c.strokeStyle = color.hex;
        c.lineWidth = 3;
        c.stroke();

        pointsref.current.push({ x, y });
    };

    const stopdrawing = () => {
        setDrawing(false);

        if(pointsref.current.length > 0)
            {
        finalpointsref.current.push({ points: [...pointsref.current], color: color.hex });

        }

        ctxRef.current.beginPath();

    };

    const handleUndo = () => {

        if (finalpointsref.current.length === 0) return;

        const point = finalpointsref.current.pop();

        undoRef.current.push(point);
        redrawCanvas()
    }

    const handleRedo = () => {
        if (undoRef.current.length === 0) return;

        const point = undoRef.current.pop();

        finalpointsref.current.push(point);
        redrawCanvas()

    }

    const handleSave = (filename = `drawing_${Date.now()}`) => {
        const canvas = canvasref.current;
        if(!canvas) return;

        const tempCanvas = document.createElement("canvas");
        tempCanvas.height = canvas.height;
        tempCanvas.width = canvas.width;

        const tempctx = tempCanvas.getContext("2d");
        tempctx.fillStyle = "white";
        tempctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        tempctx.drawImage(canvas, 0, 0);


        const url = tempCanvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.download = `${filename}.png`;
        link.href = url;
        link.click();

    }

    const handleColorPicker = () => {
        setColorPicker(prev => !prev)
    }

    const handleDelete = () => {
        pointsref.current = [];
        finalpointsref.current = [];
        redoRef.current = [];
        undoRef.current = [];

        const canvas = canvasref.current;
        const ctx = ctxRef.current;

        if(canvas && ctx){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    return {
        canvasref,
        startDrawing,
        draw,
        stopdrawing,
        handleUndo,
        handleRedo,
        handleSave,
        handleColorPicker,
        colorPicker,
        color,
        setColor,
        handleDelete
    };

}

