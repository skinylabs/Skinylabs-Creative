"use client";

import { Home, GraduationCap, User2, Lock } from "lucide-react";
import {
    SidebarLinkList,
    SidebarLinkItem,
    SidebarSubLinkList,
    SidebarSubLinkItem,
    SidebarLinkItemIcon,
} from "./SidebarLink";
import useSidebar from "@/hooks/useSidebar";

export default function Sidebar() {
    const { handleMouseOutAndLeave, toggleSidebar } = useSidebar();

    return (
        <>
            <div
                className="fixed z-40 top-0 left-0 -translate-x-full md:translate-x-0 w-64 h-full bg-indigo-950 dark:bg-neutral-900 flex flex-col transition-all group/sidebar peer/sidebar md:[&.collapsed]:w-[58px] md:[&.collapsed]:hover:w-64 [&.mobile-shown]:translate-x-0"
                data-sidebar
                onMouseLeave={handleMouseOutAndLeave}
            >
                <div className="text-center h-16 flex items-center justify-center border-b border-b-neutral-700 flex-shrink-0">
                    <a
                        href="/dashboard"
                        className="font-black text-2xl text-neutral-100"
                    >
                        <span className="md:group-[.collapsed]/sidebar:hidden md:group-[.collapsed]/sidebar:group-hover/sidebar:inline">
                            SKINYLABS
                        </span>
                        <span className="hidden md:group-[.collapsed]/sidebar:inline md:group-[.collapsed]/sidebar:group-hover/sidebar:hidden">
                            S
                        </span>
                    </a>
                </div>
                <div className="py-8 px-2 overflow-y-auto min-h-0 h-full">
                    <div className="space-y-8">
                        <SidebarLinkList>
                            <SidebarLinkItem
                                url="/dashboard"
                                icon={
                                    <SidebarLinkItemIcon>
                                        <Home size={18} />
                                    </SidebarLinkItemIcon>
                                }
                                label="Dashboard"
                            />
                        </SidebarLinkList>
                        <SidebarLinkList label="Product">
                            <SidebarLinkItem
                                url="/Vector"
                                icon={
                                    <SidebarLinkItemIcon>
                                        <Home size={18} />
                                    </SidebarLinkItemIcon>
                                }
                                label="Vector"
                            />
                            <SidebarLinkItem
                                url="/photography"
                                icon={
                                    <SidebarLinkItemIcon>
                                        <Home size={18} />
                                    </SidebarLinkItemIcon>
                                }
                                label="Photography"
                            />
                            <SidebarLinkItem
                                url="/code"
                                icon={
                                    <SidebarLinkItemIcon>
                                        <Home size={18} />
                                    </SidebarLinkItemIcon>
                                }
                                label="Source Code"
                            />
                        </SidebarLinkList>
                        <SidebarLinkList label="Pages">
                            <SidebarLinkItem
                                icon={
                                    <SidebarLinkItemIcon>
                                        <Lock size={18} />
                                    </SidebarLinkItemIcon>
                                }
                                label="Authentication"
                            >
                                <SidebarSubLinkList>
                                    <SidebarSubLinkItem
                                        url="/login"
                                        label="Login"
                                    />
                                    <SidebarSubLinkItem
                                        url="/signup"
                                        label="Register"
                                    />
                                    <SidebarSubLinkItem
                                        url="/forgot-password"
                                        label="Forgot password"
                                    />
                                    <SidebarSubLinkItem
                                        url="/reset-password"
                                        label="Reset password"
                                    />
                                </SidebarSubLinkList>
                            </SidebarLinkItem>
                        </SidebarLinkList>
                    </div>
                </div>
            </div>
            <div
                className="fixed top-0 left-0 w-full h-full md:hidden bg-black/50 z-30 opacity-0 invisible peer-[.mobile-shown]/sidebar:opacity-100 peer-[.mobile-shown]/sidebar:visible"
                onClick={toggleSidebar}
            ></div>
        </>
    );
}
