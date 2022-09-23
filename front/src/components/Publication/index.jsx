import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../utils/style/colors';
import DefaultPicture from '../../assets/profile.png';
import { LoggedContext } from '../../utils/context';
import { useContext } from 'react';

const PublicationText = styled.span`
    color: #5843e4;
    font-size: 22px;
    font-weight: normal;
    padding-left: 15px;
`;

const PublicationImage = styled.img`
    height: 150px;
    width: 150px;
    align-self: center;
    border-radius: 50%;
`;

const PublicationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 15px;
    background-color: ${colors.backgroundLight};
    border-radius: 30px;
    width: 300px;
    height: 300px;
    transition: 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`;

function Publication({ publicationId, text, picture, userId }) {
    const { userLogged, setUserLogged } = useContext(LoggedContext);
    return (
        <PublicationWrapper>
            <PublicationText>{text}</PublicationText>
            <PublicationImage src={picture} alt="freelance" />
            {userLogged.userId === userId ? (
                <div>
                    <Link to={`/modify/${publicationId}`}>Modifier</Link>
                    <a>Supprimer</a>
                </div>
            ) : (
                ''
            )}
        </PublicationWrapper>
    );
}

Publication.propTypes = {
    text: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    picture: PropTypes.string,
};

Publication.defaultProps = {
    text: '',
    userId: '',
    picture: DefaultPicture,
};

export default Publication;
