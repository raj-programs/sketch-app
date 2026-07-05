import { useEffect, useState } from "react";
import api from "../../services/baseapi.js";
import { FaEdit, FaTrash, FaEye, FaDownload } from "react-icons/fa";
import "../styles/dashboard.css";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog"
import Navbar from "../components/navbar.jsx";

function Dashboard() {
    const [getData, setGetdata] = useState([]);
    const [drawingPreview, setdrawingPreview] = useState(null)

    useEffect(() => {
        const fetchDrawings = async () => {
            try {

                const drawings = await api.get("/api/dashboard");

                setGetdata(drawings.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDrawings();
    }, []);

    const handleDelete = async (id) => {
        try {

            await api.delete(`/api/delete/${id}`);

            setGetdata((prev) => prev.filter((drawing) => drawing._id !== id));

            toast.success("Deleted SuccessFully!!")

        } catch (error) {
            console.error(error)

            toast.error(error.message)
            
        }
    }

    const handleImageDownload = async (imageUrl, filename) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${filename}.png`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    } catch (err) {
        console.error(err);
        toast.error("Failed to download image");
    }
};
    return (
        <>
        <Navbar />
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>My Drawings</h1>
                <p>{getData.length} Drawings</p>
            </div>

            <div className="drawing-grid">
                {getData.map((drawing) => (
                    <div className="drawing-card" key={drawing._id}>

                        <div className="drawing-preview">
                            <img
                            style={{backgroundColor: drawing.backgroundColor}}
                                src={drawing.thumbnailUrl}
                                alt={drawing.name}
                            />
                        </div>

                        <div className="drawing-info">
                            <h3>{drawing.name}</h3>

                            <span>
                                {new Date(drawing.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="drawing-actions">
                            <button onClick={() => setdrawingPreview(drawing)}>
                                <FaEye />
                            </button>

                            <button className="delete-btn" onClick={() => handleDelete(drawing._id)}>
                                <FaTrash />
                            </button>
                        </div>

                    </div>
                ))}
            </div>

             { drawingPreview && (
    <Dialog.Root
        open={!!drawingPreview}
        onOpenChange={() => setdrawingPreview(null)}
    >
        <Dialog.Content className="preview-dialog">
    <div className="preview-header">
        <Dialog.Title className="preview-title">
            {drawingPreview.name}
        </Dialog.Title>

        <Dialog.Close asChild>
            <button className="close-btn">
                ✕
            </button>
        </Dialog.Close>
    </div>

    <div className="preview-body">
        <img
            src={drawingPreview.imageUrl}
            alt={drawingPreview.name}
            className="preview-image"
        />
    </div>

    <div className="preview-footer">
        <span>
            {new Date(drawingPreview.createdAt).toLocaleDateString()}
        </span>

        <button
            className="download-btn"
            onClick={() =>
                handleImageDownload(
                    drawingPreview.imageUrl,
                    drawingPreview.name
                )
            }
        >
            <FaDownload />
            Download
        </button>
    </div>
</Dialog.Content>
    </Dialog.Root>
)}
        </div>
        </>

       
    );
}

export default Dashboard;