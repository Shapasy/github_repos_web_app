const { REACT_APP_NAME } = process.env

export const Footer = () => {
    return <footer id="footer_root">
        <h5>&copy;{REACT_APP_NAME}</h5>
    </footer>
}