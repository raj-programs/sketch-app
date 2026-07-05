import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { IoSave } from "react-icons/io5";
import "../styles/dialog.css";

function DialogBox({ onSave }) {
    const [name, setName] = useState("Untitled");

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="tool-buttons" data-name="Save">
                    <IoSave />
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />

                <Dialog.Content className="dialog-content">

                    <Dialog.Title className="dialog-title">
                        Save Drawing
                    </Dialog.Title>

                    <Dialog.Description className="dialog-description">
                        Give your drawing a memorable name so you can easily find it later.
                    </Dialog.Description>

                    <input
                        className="dialog-input"
                        type="text"
                        placeholder="e.g. House Sketch"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="dialog-buttons">

                        <Dialog.Close asChild>
                            <button
                                className="dialog-cancel"
                            >
                                Cancel
                            </button>
                        </Dialog.Close>

                        <Dialog.Close asChild>
                            <button
                                className="dialog-save"
                                onClick={() => onSave(name)}
                            >
                                <IoSave />
                                Save
                            </button>
                        </Dialog.Close>

                    </div>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default DialogBox;