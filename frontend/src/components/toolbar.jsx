import { FaUndo, FaRedo, FaDownload } from "react-icons/fa"
import { MdDelete, MdFormatColorFill, MdBrightness7 } from "react-icons/md"
import { VscNewFile } from "react-icons/vsc"
import { IoSave } from "react-icons/io5"

function Toolbar({ onUndo, onRedo, onDownload, onColor, onDelete, onNew, onSave }) {
    return (
        <>
        <button className="tool-buttons" data-name="NEW" onClick={onNew}><VscNewFile /></button>
        <button className="tool-buttons" data-name="SAVE" onClick={onSave}><IoSave /></button>
            <button className="tool-buttons" data-name="UNDO" onClick={onUndo}><FaUndo />  </button>
            <button className="tool-buttons" data-name="REDO" onClick={onRedo}><FaRedo />  </button>
            <button className="tool-buttons" data-name="SAVE" onClick={onDownload}><FaDownload />  </button>
            <button className="tool-buttons" data-name="COLOR" onClick={onColor}>
                <MdFormatColorFill />
            </button>
            <button className="tool-buttons" data-name="DELETE" onClick={onDelete}><MdDelete />  </button>
            <button className="tool-buttons" data-name="LIGHT/DARK MODE"><MdBrightness7 /></button>
        </>
    )
}

export default Toolbar