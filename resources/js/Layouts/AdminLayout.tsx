// import React, { ReactNode } from "react";
// import { Head } from "@inertiajs/react";
// import Sidebar from "@/Components/Backend/Sidebar/Sidebar";
// import Navbar from "@/Components/Backend/Navbar/Navbar";
// import ErrorBoundary from "@/Components/ErrorBoundary";
// import { Toaster } from "sonner";

// interface AdminLayoutProps {
//     children: ReactNode;
//     PageTitle?: string;
// }

// const AdminLayout: React.FC<AdminLayoutProps> = ({ children, PageTitle }) => {
//     return (
//         <div className="font-sans">
//             <Head title={PageTitle} />
//             <div className="md:ml-64 min-h-screen bg-neutral-100 dark:bg-neutral-800 md:peer-[.collapsed]/sidebar:ml-[58px] transition-all">
//                 <Navbar />
//                 <Sidebar />

//                 <div className="px-4">
//                     <ErrorBoundary>
//                         <Toaster
//                             position="top-right"
//                             expand={true}
//                             richColors
//                             closeButton
//                         />
//                         {/* <EmailNotVerified /> */}
//                         {children}
//                     </ErrorBoundary>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminLayout;
import React, { ReactNode } from "react";

// import EmailNotVerified from "@/Components/Backend/EmailNotVerified";
import { Head } from "@inertiajs/react";
import ErrorBoundary from "@/Components/ErrorBoundary";
import { Toaster } from "sonner";
import Sidebar from "@/Components/Backend/Navigation/Sidebar";
import Navbar from "@/Components/Backend/Navigation/Navbar";

interface AdminLayoutProps {
    children: ReactNode;
    PageTitle?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, PageTitle }) => {
    return (
        <div className="font-sans">
            <Head title={PageTitle} />
            <Sidebar />
            <div className="md:ml-64 min-h-screen bg-neutral-100 dark:bg-neutral-800 md:peer-[.collapsed]/sidebar:ml-[58px] transition-all">
                <Navbar />

                <div className="px-4">
                    <ErrorBoundary>
                        {/* <EmailNotVerified /> */}
                        {children}
                        <Toaster
                            position="top-right"
                            expand={true}
                            richColors
                            closeButton
                        />
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
