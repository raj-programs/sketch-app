import { useEffect, useRef, useState } from "react";
import { useColor } from "react-color-palette";
import "react-color-palette/css";

import { drawShape } from "../utils/drawingUtil/drawUtils";
import detectShape from "../utils/detectionUtils/detectionUtils";

export function useCanvas() {

    const canvasref = useRef(null);
    const ctxRef = useRef(null);

    const pointsref = useRef([]);
    const shapeRef = useRef([]);

    const undoRef = useRef([]);
    const redoRef = useRef([]);

    const [drawing, setDrawing] = useState(false);
    const [colorPicker, setColorPicker] = useState(false);
    const [color, setColor] = useColor("black");

    const redrawCanvas = () => {
        const canvas = canvasref.current;
        const ctx = ctxRef.current;

        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapeRef.current.forEach(shape => {
            drawShape(ctx, shape);
        });
    };

    useEffect(() => {
        const resize = () => {
            const canvas = canvasref.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
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
        const ctx = ctxRef.current;
        if (!ctx) return;

        setDrawing(true);
        ctx.beginPath();

        pointsref.current = [];

        const rect = canvasref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.moveTo(x, y);
        pointsref.current.push({ x, y });

        redoRef.current = [];
    };

    const draw = (e) => {
        if (!drawing) return;

        const rect = canvasref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = ctxRef.current;

        ctx.lineTo(x, y);
        ctx.strokeStyle = color.hex;
        ctx.lineWidth = 3;
        ctx.stroke();

        pointsref.current.push({ x, y });
    };

    const stopdrawing = () => {
        setDrawing(false);

        if (pointsref.current.length === 0) return;

        const stroke = {
            points: [...pointsref.current],
            color: color.hex
        };

        const detectedShape = detectShape(stroke);
        shapeRef.current.push(
            detectedShape || { type: "freehand", points: stroke.points, color: color.hex }
        );

        pointsref.current = [];
        ctxRef.current.beginPath();



        redrawCanvas();
    };

    const handleUndo = () => {
        if (shapeRef.current.length === 0) return;

        const last = shapeRef.current.pop();
        undoRef.current.push(last);

        redrawCanvas();
    };

    const handleRedo = () => {
        if (undoRef.current.length === 0) return;

        const last = undoRef.current.pop();
        shapeRef.current.push(last);

        redrawCanvas();
    };

    const handleDownload = (filename = `drawing_${Date.now()}`) => {
        const canvas = canvasref.current;
        if (!canvas) return;

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;

        const tempctx = tempCanvas.getContext("2d");

        tempctx.fillStyle = "white";
        tempctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        tempctx.drawImage(canvas, 0, 0);

        const url = tempCanvas.toDataURL("image/png", 1.0);

        const link = document.createElement("a");
        link.download = `${filename}.png`;
        link.href = url;
        link.click();

        handleDelete();
    };

    const handleDelete = () => {
        pointsref.current = [];
        shapeRef.current = [];
        undoRef.current = [];
        redoRef.current = [];

        const canvas = canvasref.current;
        const ctx = ctxRef.current;

        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const handleColorPicker = () => {
        setColorPicker(prev => !prev);
    };

    const newFile = () => {

    }

    return {
        canvasref,
        startDrawing,
        draw,
        stopdrawing,
        handleUndo,
        handleRedo,
        handleDownload,
        handleDelete,
        handleColorPicker,
        colorPicker,
        color,
        setColor
    };
}