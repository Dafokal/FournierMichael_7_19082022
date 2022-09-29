import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../utils/style/colors';
import DefaultPicture from '../../assets/profile.png';
import { LoggedContext } from '../../utils/context';
import { useContext } from 'react';
import { useState } from 'react';

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
    background-color: black;
    border-radius: 30px;
    width: 300px;
    height: 300px;
    transition: 200ms;
    color: white;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`;

const ActionsWrapper = styled.div``;

function Publication({
    publicationId,
    likes,
    dislikes,
    usersLiked,
    usersDisliked,
    text,
    picture,
    userId,
    setReloadPublications,
    reloadPublications,
}) {
    const { userLogged, setUserLogged } = useContext(LoggedContext);

    async function deletePublication(e) {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:3001/api/publications/${publicationId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + userLogged.token,
                    },
                }
            );
            if (response.ok) {
                setReloadPublications(
                    reloadPublications === true ? false : true
                );
            } else {
                //localStorage.removeItem('user');
                //window.location = '/login';
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function likePublication(likeValue) {
        try {
            const response = await fetch(
                `http://localhost:3001/api/publications/${publicationId}/like`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + userLogged.token,
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({
                        userId: userLogged.userId,
                        like: likeValue,
                    }),
                }
            );
            if (response.ok) {
                setReloadPublications(
                    reloadPublications === true ? false : true
                );
            } else {
                localStorage.removeItem('user');
                window.location = '/login';
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <PublicationWrapper>
            <PublicationText>{text}</PublicationText>
            {picture === '' ? (
                ''
            ) : (
                <PublicationImage src={picture} alt="freelance" />
            )}
            <ActionsWrapper>
                {userLogged.userId === userId ? (
                    <div>
                        <Link to={`/modify/${publicationId}`}>Modifier</Link>
                        <button onClick={deletePublication}>Supprimer</button>
                    </div>
                ) : (
                    ''
                )}
                <div>
                    <span>{likes}</span>
                    <button
                        onClick={() =>
                            likePublication(
                                usersLiked.includes(userLogged.userId) ? 0 : 1
                            )
                        }
                    >
                        J'aime
                    </button>
                    <span>{dislikes}</span>
                    <button
                        onClick={() =>
                            likePublication(
                                usersDisliked.includes(userLogged.userId)
                                    ? 0
                                    : -1
                            )
                        }
                    >
                        Je n'aime pas
                    </button>
                </div>
            </ActionsWrapper>
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
    picture: '',
};

export default Publication;
