import React from "react"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"

const ErrorPage = () => {

    return (
        <div id="errorPage">
            <h1 id="errorTitle">404 Page Not Found</h1>
            <h2 className="errorMessage">Oops, this page doesn't seem to exist.</h2>
            <h2 className="errorMessage">Sorry for the inconvenience. Please click the button below to head back to the connect page... Thank you.</h2>
            <Link to="/connect">
            <Button
            id="errorButton"
            color="secondary"
            variant="contained">
                Back
            </Button>
            </Link>
        </div>
    )
}

export default ErrorPage