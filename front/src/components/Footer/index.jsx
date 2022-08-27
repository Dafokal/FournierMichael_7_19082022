import { useContext } from 'react';
import styled from 'styled-components';
import colors from '../../utils/style/colors';

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
`;

function Footer() {
    return <FooterContainer></FooterContainer>;
}

export default Footer;
