import { FaUndo, FaRedo, FaDownload } from "react-icons/fa"
import { MdDelete, MdFormatColorFill, MdBrightness7 } from "react-icons/md"
import DialogBox from "./savebox.jsx"
import Newfile from "./newFile.jsx"
import Deletefile from "./deleteFile.jsx"

function Toolbar({ onUndo, onRedo, onDownload, onColor, onDelete, onSave }) {
    return (
        <>
        <Newfile onDelete={onDelete}/>
        <DialogBox onSave={onSave} />
            <button className="tool-buttons" data-name="UNDO" onClick={onUndo}><FaUndo />  </button>
            <button className="tool-buttons" data-name="REDO" onClick={onRedo}><FaRedo />  </button>
            <button className="tool-buttons" data-name="COLOR" onClick={onColor}>
                <MdFormatColorFill />
            </button>
            <button className="tool-buttons" data-name="DOWNLOAD" onClick={onDownload}><FaDownload /> </button>
            <Deletefile onDelete={onDelete} />
        </>
    )
}

export default Toolbar