import { useEffect } from "react"

const { REACT_APP_NAME } = process.env

export const PageNotFound = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = `${REACT_APP_NAME} - 404`
    }, [])

    return <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", marginTop: "20px"
    }}>
        <h1>404</h1>
        <h3>Page Not Found</h3>
    </div>
}