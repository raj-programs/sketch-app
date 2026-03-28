import { FaUndo, FaRedo, FaSave, FaEraser } from "react-icons/fa"
import { MdDelete, MdFormatColorFill } from "react-icons/md"

function Toolbar({ onUndo, onRedo, onSave, onColor, onDelete }) {
    return (
        <>
            <button onClick={onUndo} ><FaUndo /></button>
            <button onClick={onRedo}><FaRedo /></button>
            <button onClick={onSave}><FaSave /></button>
            <button onClick={onColor}>
                <MdFormatColorFill />
                </button>
            <button onClick={onDelete}><MdDelete /></button>
        </>
    )
}

export default Toolbar