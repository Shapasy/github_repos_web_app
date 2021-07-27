import github_image from '../images/git-hub.svg'

const { REACT_APP_NAME } = process.env

export const Header = () => {
    return <header id="header_root">
        <img src={github_image} width="60px" />
        <h1>&nbsp;{REACT_APP_NAME}</h1>
    </header>
}