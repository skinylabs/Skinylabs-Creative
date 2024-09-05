import { useState } from "react";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { X } from "lucide-react";

function EmailNotVerified() {
    const { auth } = usePage<PageProps>().props;
    const [showAlert, setShowAlert] = useState(true);

    const handleClose = () => {
        setShowAlert(false);
    };

    return (
        <div>
            {showAlert && auth.user && !auth.user.email_verified_at && (
                <div className="bg-red-600 text-white font-semibold flex items-center justify-between p-2 rounded-lg">
                    <span>
                        Email Anda belum diverifikasi. Klik{" "}
                        <a
                            href="/email/verify"
                            className="underline hover:text-red-300"
                        >
                            di sini{" "}
                        </a>
                        untuk memverifikasi email Anda.
                    </span>
                    <button
                        onClick={handleClose}
                        className="text-lg  bg-white p-2 text-red-600 rounded-md"
                    >
                        <X />
                    </button>
                </div>
            )}
        </div>
    );
}

export default EmailNotVerified;
