import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledLink } from '../../utils/style/Common';
import DefaultLogo from '../../assets/logo-default.svg';
import colors from '../../utils/style/colors';

const HomeLogo = styled.img`
    width: 20em;
`;

const NavContainer = styled.nav`
    padding: 1em 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
`;

function Header() {
    return (
        <NavContainer>
            <Link to="/">
                <HomeLogo src={DefaultLogo} />
            </Link>
            <div>
                <StyledLink to="/">Accueil</StyledLink>
                <StyledLink
                    to="/login"
                    onClick={() => localStorage.removeItem('user')}
                >
                    Se déconnecter
                </StyledLink>
            </div>
        </NavContainer>
    );
}

export default Header;
