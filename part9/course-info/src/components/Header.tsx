interface NameProps {
    name: String;
}

const Header = (props: NameProps): JSX.Element => {
    return <h1>{props.name}</h1>
}

export default Header;