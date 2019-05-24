import React from 'react';
import { Link } from "react-router-dom";

const ConfirmationPage = () => {
    return(
        <div>
            <h1>Confirmation Page</h1>
            <button>
                <Link to="/home" className="link">
                    Finish Up
                </Link>
            </button>
        </div>
    )
}

export default ConfirmationPage