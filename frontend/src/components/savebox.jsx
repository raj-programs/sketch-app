import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react";
import { IoSave } from "react-icons/io5"
function DialogBox ({ onSave }){
    const [name, setName] = useState("untitled")
    return(
        <>
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="tool-buttons" data-name="SAVE" ><IoSave /></button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                    <Dialog.Content className="dialog-content">

                        <Dialog.Title>
                            Are you sure you want to save Drawing
                        </Dialog.Title>

                        <Dialog.Description>
                            Enter a name for your drawing
                        </Dialog.Description>
                        <input type="text" 
                        placeholder="E.g., Hose Sketch"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                        
                        <Dialog.Close asChild>
                            <button onClick={() => onSave(name)}>Save</button>
                        </Dialog.Close>

                        <Dialog.Close asChild>
                        <button>Cancel</button>
                        </Dialog.Close>
                    </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
        </>
    )
}

export default DialogBox;