import { NavLink } from "react-router";

function Nav() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
