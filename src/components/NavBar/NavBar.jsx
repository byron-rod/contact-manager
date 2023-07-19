import React from "react";
import { Link } from "react-router-dom";

let NavBar = () => {
    return (
        <>
        <nav className="navbar navbar-dark bg-primary navbar-expand-sm"> 
            <div className="container">
                <Link to={'/'} className="navbar-brand"> <i class="fa-solid fa-user-group"/> Contact Manager </Link>
                    </div> 
        </nav>
         
        </>
    )
}
export default NavBar;