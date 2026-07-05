import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/baseapi";
import { handleError, handleSucess } from "../utils/responseHandler";

function LoginDialog({
    open,
    onOpenChange,
    onSignupClick
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/api/auth/login", {
                email,
                password,
            });

            const result = handleSucess(response);

            localStorage.setItem("token", response.data.data.token);

            toast.success(result.message);

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
                        Welcome Back
                    </Dialog.Title>

                    <Dialog.Description className="dialog-description">
                        Login to save and manage your drawings.
                    </Dialog.Description>

                    <form onSubmit={handleLogin}>

                        <input
                            className="dialog-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            Don't have an account?{" "}

                            <button
                                type="button"
                                className="dialog-link"
                                onClick={() => {
                                    onOpenChange(false);
                                    onSignupClick();
                                }}
                            >
                                Sign Up
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
                                Login
                            </button>

                        </div>

                    </form>

                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default LoginDialog;