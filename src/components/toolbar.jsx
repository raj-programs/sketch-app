import { FaUndo, FaRedo, FaSave } from "react-icons/fa"
import { MdDelete, MdFormatColorFill, MdBrightness7 } from "react-icons/md"

function Toolbar({ onUndo, onRedo, onSave, onColor, onDelete }) {
    return (
        <>
            <button className="tool-buttons" data-name="UNDO" onClick={onUndo}><FaUndo />  </button>
            <button className="tool-buttons" data-name="REDO" onClick={onRedo}><FaRedo />  </button>
            <button className="tool-buttons" data-name="SAVE" onClick={onSave}><FaSave />  </button>
            <button className="tool-buttons" data-name="COLOR" onClick={onColor}>
                <MdFormatColorFill />
            </button>
            <button className="tool-buttons" data-name="DELETE" onClick={onDelete}><MdDelete />  </button>
            <button className="tool-buttons" data-name="LIGHT/DARK MODE"><MdBrightness7 /></button>
        </>
    )
}

export default Toolbar