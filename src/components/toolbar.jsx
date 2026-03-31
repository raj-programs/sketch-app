import { FaUndo, FaRedo, FaSave } from "react-icons/fa"
import { MdDelete, MdFormatColorFill, MdBrightness7 } from "react-icons/md"

function Toolbar({ onUndo, onRedo, onSave, onColor, onDelete }) {
    return (
        <>
            <button className="tool-buttons" onClick={onUndo} ><FaUndo /></button>
            <button className="tool-buttons"onClick={onRedo}><FaRedo /></button>
            <button className="tool-buttons" onClick={onSave}><FaSave /></button>
            <button className="tool-buttons" onClick={onColor}>
                <MdFormatColorFill />
                </button>
            <button className="tool-buttons" onClick={onDelete}><MdDelete /></button>
            <button><MdBrightness7 /></button>
        </>
    )
}

export default Toolbar