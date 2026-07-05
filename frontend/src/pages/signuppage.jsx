import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import api from "../../services/baseapi.js";
import toast from "react-hot-toast";
import { handleError, handleSucess } from "../utils/responseHandler.js";

function SignUp({ open, onOpenChange, onLoginClick }) {
    const [name, setName] = useState("");
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/api/auth/signup", {
                name,
                userName,
                email,
                password,
            });

            const result = handleSucess(response);

            toast.success(result.message);

            setName("");
            setUsername("");
            setEmail("");
            setPassword("");

            onOpenChange(false);

        } catch (error) {
            const err = handleError(error);
            toast.error(err.message);
        }
    };

    return (
        <Dialog.Root
            open={open}
            onOpenChange={onOpenChange}
        >
            <Dialog.Portal>

                <Dialog.Overlay className="dialog-overlay" />

                <Dialog.Content className="dialog-content">

                    <Dialog.Title className="dialog-title">
                        Create Account
                    </Dialog.Title>

                    <Dialog.Description className="dialog-description">
                        Create an account to save and manage your drawings.
                    </Dialog.Description>

                    <form onSubmit={handleSignin}>

                        <input
                            className="dialog-input"
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            className="dialog-input"
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ marginTop: "14px" }}
                        />

                        <input
                            className="dialog-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ marginTop: "14px" }}
                        />

                        <input
                            className="dialog-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ marginTop: "14px" }}
                        />

                        <p
                            className="dialog-description"
                            style={{ marginTop: "16px" }}
                        >
                            Already have an account?{" "}

                            <button
                                type="button"
                                className="dialog-link"
                                onClick={() => {
                                    onOpenChange(false);
                                    onLoginClick();
                                }}
                            >
                                Login
                            </button>
                        </p>

                        <div
                            className="dialog-buttons"
                            style={{ marginTop: "22px" }}
                        >
                            <Dialog.Close asChild>
                                <button
                                    type="button"
                                    className="dialog-cancel"
                                >
                                    Cancel
                                </button>
                            </Dialog.Close>

                            <button
                                type="submit"
                                className="dialog-save"
                            >
                                Create Account
                            </button>
                        </div>

                    </form>

                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default SignUp;