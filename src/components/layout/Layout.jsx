import { Outlet } from "react-router";

import Nav from "../ui/Nav";

function Layout() {
    return (
        <>
            <header>
                <Nav />
            </header>
            <div className="wrapper-site">
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default Layout;
