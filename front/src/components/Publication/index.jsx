import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../utils/style/colors';
import { LoggedContext } from '../../utils/context';
import { useContext } from 'react';
import { useState } from 'react';
import { useFetch } from '../../utils/hooks';
import iconLike from '../../assets/icon-like.png';
import iconDislike from '../../assets/icon-dislike.png';
import iconLiked from '../../assets/icon-liked.png';
import iconDisliked from '../../assets/icon-disliked.png';

const PublicationWrapper = styled.div`
    padding: 1.5em 0;
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 2em;
    width: 100%;
    transition: 200ms;
    border: 1px solid ${colors.tertiary};
    color: black;
    &:hover {
        box-shadow: 2px 4px 10px #dddddd;
    }
`;
const PublicationInfo = styled.div`
    padding: 0 2em;
`;
const PublicationAuthor = styled.h3``;
const PublicationDate = styled.span``;
const PublicationText = styled.span`
    font-size: 1.5em;
    padding: 1em 1.5em 0;
`;
const PublicationImage = styled.img`
    padding-top: 1em;
    width: calc(100% + 2px);
    align-self: center;
`;
const ActionsWrapper = styled.div`
    font-size: 1.5em;
    padding: 1em 1.5em 0;
    display: flex;
    justify-content: space-between;
`;
const LikeFieldWrapper = styled.div`
    display: flex;
`;
const LikeBtnWrapper = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    & input {
        display: none;
    }
    & img {
        width: 2em;
        margin-left: 0.5em;
        transition: transform ease-in-out 75ms;
    }
    &:hover img {
        transform: scale(1.1);
    }
    & span {
        align-self: flex-start;
    }
    :nth-child(2) {
        padding-left: 1em;
    }
`;
const ModifyBtn = styled(Link)`
    text-decoration: none;
    background: white;
    color: black;
    font-size: 0.8em;
`;

function Publication({
    publicationId,
    likes,
    dislikes,
    usersLiked,
    usersDisliked,
    text,
    picture,
    userId,
    date,
    setReloadPublications,
    reloadPublications,
}) {
    const { userLogged, setUserLogged } = useContext(LoggedContext);
    const dateString = new Date(parseInt(date)).toLocaleDateString('fr-FR');
    const timeString = new Date(parseInt(date))
        .toLocaleTimeString('fr-FR')
        .slice(0, -3)
        .replace(':', 'h');

    const { isDataLoading, data, error } = useFetch(
        `http://localhost:3001/api/auth/${userId}`,
        []
    );

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
                localStorage.removeItem('user');
                window.location = '/login';
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
            <PublicationInfo>
                <PublicationAuthor>
                    {data.name} {data.surname}
                </PublicationAuthor>
                <PublicationDate>
                    Le {dateString} à {timeString}
                </PublicationDate>
            </PublicationInfo>
            <PublicationText>{text}</PublicationText>
            {picture === '' ? (
                ''
            ) : (
                <PublicationImage src={picture} alt="freelance" />
            )}
            <ActionsWrapper>
                <LikeFieldWrapper>
                    <LikeBtnWrapper>
                        <span>{likes}</span>
                        <img
                            alt="J'aime"
                            src={
                                usersLiked.includes(userLogged.userId)
                                    ? iconLiked
                                    : iconLike
                            }
                        />
                        <input
                            type="button"
                            name="buttonLike"
                            value="buttonLike"
                            onClick={() =>
                                likePublication(
                                    usersLiked.includes(userLogged.userId)
                                        ? 0
                                        : 1
                                )
                            }
                        />
                    </LikeBtnWrapper>
                    <LikeBtnWrapper>
                        <span>{dislikes}</span>
                        <img
                            alt="Je n'aime pas"
                            src={
                                usersDisliked.includes(userLogged.userId)
                                    ? iconDisliked
                                    : iconDislike
                            }
                        />
                        <input
                            type="button"
                            name="buttonLike"
                            value="buttonLike"
                            onClick={() =>
                                likePublication(
                                    usersDisliked.includes(userLogged.userId)
                                        ? 0
                                        : -1
                                )
                            }
                        />
                    </LikeBtnWrapper>
                </LikeFieldWrapper>
                {userLogged.userId === userId ? (
                    <div>
                        <ModifyBtn to={`/modify/${publicationId}`}>
                            Modifier
                        </ModifyBtn>
                        <button onClick={deletePublication}>Supprimer</button>
                    </div>
                ) : (
                    ''
                )}
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
