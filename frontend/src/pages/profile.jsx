import { useEffect, useState } from "react";
import api from "../../services/baseapi.js";
import { handleError } from "../utils/responseHandler.js";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import * as Dialog from "@radix-ui/react-dialog";
import "../styles/profile.css";
import toast from "react-hot-toast";

function Profile() {

    const [getUser, setGetuser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const response = await api.get("/api/me");
                setGetuser(response.data.data);
            } catch (error) {
                console.log(error)
                handleError(error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged Out Successfully!!")
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="profile-btn">
                    <FaRegUser />
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="profile-overlay" />

                <Dialog.Content className="profile-modal">

                    <Dialog.Close asChild>
                        <button className="close-profile">
                            <IoClose />
                        </button>
                    </Dialog.Close>

                    {!getUser ? (
                        <div className="profile-loading">
                            Loading...
                        </div>
                    ) : (
                        <>
                            <div className="profile-header">
                                <div className="profile-avatar">
                                    {getUser.name.charAt(0).toUpperCase()}
                                </div>

                                <h2 className="profile-name">
                                    {getUser.name}
                                </h2>

                                <p className="profile-email">
                                    {getUser.email}
                                </p>
                            </div>

                            <div className="profile-info">

                                <div className="profile-item">
                                    <p className="profile-label">
                                        Username
                                    </p>

                                    <p className="profile-value">
                                        {getUser.userName}
                                    </p>
                                </div>

                                <div className="profile-item">
                                    <p className="profile-label">
                                        Email
                                    </p>

                                    <p className="profile-value">
                                        {getUser.email}
                                    </p>
                                </div>

                            </div>
                            <Dialog.Close asChild>

                            <button
                                className="logout"
                                onClick={handleLogout}
                            >
                                <CiLogout />
                                Logout
                            </button>
                            </Dialog.Close>
                        </>
                    )}

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Profile;