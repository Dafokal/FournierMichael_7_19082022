import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../utils/style/colors';
import { LoggedContext } from '../../utils/context';
import { EditContext } from '../../utils/context';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useFetch } from '../../utils/hooks';
import iconLike from '../../assets/icon-like.svg';
import iconDislike from '../../assets/icon-dislike.svg';
import iconDelete from '../../assets/icon-delete.svg';
import iconEdit from '../../assets/icon-edit.svg';
import iconConfirm from '../../assets/icon-confirm.svg';
import iconCancel from '../../assets/icon-cancel.svg';
import iconPhoto from '../../assets/icon-photo.svg';

const PublicationWrapper = styled.div`
    padding: 1.5em 0;
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 2em;
    width: 100%;
    transition: 200ms;
    border: 1px solid ${colors.grayLight};
    color: black;
    &:hover {
        box-shadow: 2px 4px 10px #dddddd;
    }
`;
const PublicationInfo = styled.div`
    padding: 0 2em;
`;
const PublicationAuthor = styled.h3`
    font-size: 1.5em;
`;
const PublicationDate = styled.span``;
const PublicationText = styled.span`
    font-size: 1.5em;
    padding: 1.3em 1.5em 0;
`;
const PublicationImage = styled.img`
    padding-top: 1.25em;
    width: calc(100% + 2px);
    align-self: center;
`;
const ActionsWrapper = styled.div`
    font-size: 1.5em;
    padding: 1.4em 1.5em 0;
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
        width: 1.6em;
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
const LikeBtn = styled.img`
    fill: ${colors.tertiary};
`;
const LikedBtn = styled.img`
    filter: invert(73%) sepia(68%) saturate(536%) hue-rotate(97deg)
        brightness(101%) contrast(94%);
`;
const DislikeBtn = styled.img`
    fill: ${colors.tertiary};
`;
const DislikedBtn = styled.img`
    filter: invert(25%) sepia(53%) saturate(5407%) hue-rotate(1deg)
        brightness(102%) contrast(105%);
`;
const ControlFieldWrapper = styled.div`
    display: flex;
`;
const EditBtnWrapper = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    & input {
        display: none;
    }
    & img {
        width: 1.6em;
        transition: transform ease-in-out 75ms;
    }
    &:hover img {
        transform: scale(1.1);
    }
`;
const DeleteBtnWrapper = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 1.5em;
    & input {
        display: none;
    }
    & img {
        width: 1.5em;
        transition: transform ease-in-out 75ms;
    }
    &:hover img {
        transform: scale(1.1);
    }
`;
const EditForm = styled.form`
    padding-top: 1.25em;
    display: flex;
    flex-direction: column;
`;
const EditControlWrapper = styled.div`
    font-size: 1.5em;
    padding: 0.9em 1.5em 0;
    display: flex;
    justify-content: flex-end;
`;
const TextModificatorWrapper = styled.textarea`
    width: 100%;
    font-size: 1.5em;
    display: block;
    max-width: calc(100% - 2em);
    resize: none;
    overflow: hidden;
    background-color: ${colors.grayLighter};
    border: none;
    border-radius: 0.7em;
    padding: 0.5em;
    margin: 0 1em;
    transition: background-color ease-in-out 150ms;
    &:focus {
        outline: 1px solid ${colors.tertiary};
    }
`;
const ImageModificatorWrapper = styled.label`
    width: calc(100% + 2px);
    align-self: center;
    cursor: pointer;
    position: relative;
    display: block;
    overflow: hidden;
    margin-top: 0.5em;
    margin-bottom: .6em;
    & input {
        display: none;
    }
    & img {
        width: 100%;
        transition: transform ease-in-out 500ms;
    }
    &::after {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.5);
        background-image: url("${iconPhoto}");
        background-repeat: no-repeat;
        background-size: 10%;
        background-position: center;
        opacity: 0;
        transition: opacity ease-in-out 450ms 50ms;
    }
    &:hover {
        &::after {
            opacity: 1;
        }
        & img {
            transform: scale(1.1);
        }
`;
const ConfirmBtnWrapper = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    & input {
        display: none;
    }
    & img {
        width: 1.45em;
        transition: transform ease-in-out 75ms;
    }
    &:hover img {
        transform: scale(1.1);
    }
`;
const CancelBtnWrapper = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 1.5em;
    & input {
        display: none;
    }
    & img {
        width: 1.45em;
        transition: transform ease-in-out 75ms;
    }
    &:hover img {
        transform: scale(1.1);
    }
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
    const { isEditing, setIsEditing } = useContext(EditContext);
    const [editMode, setEditMode] = useState(false);
    const [userLike, setUserLike] = useState(0);
    const [likeCount, setLikeCount] = useState(likes);
    const [dislikeCount, setDislikeCount] = useState(dislikes);
    const dateString = new Date(parseInt(date)).toLocaleDateString('fr-FR');
    const timeString = new Date(parseInt(date))
        .toLocaleTimeString('fr-FR')
        .slice(0, -3)
        .replace(':', 'h');

    const { isDataLoading, data, error } = useFetch(
        `http://localhost:3001/api/auth/${userId}`,
        []
    );

    useEffect(() => {
        if (usersLiked.includes(userLogged.userId)) {
            setUserLike(1);
        } else if (usersDisliked.includes(userLogged.userId)) {
            setUserLike(-1);
        }
    }, []);

    useEffect(() => {
        if (editMode) {
            autoGrow(
                document.getElementById(`textModificator_${publicationId}`)
            );
        } else {
            document.getElementById(
                `publicationText_${publicationId}`
            ).innerHTML = text.replace(/(?:\r\n|\r|\n)/g, '<br>');
        }
    }, [editMode]);

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

    async function likePublication(e, likeValue) {
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
                if (likeValue === 1) {
                    setLikeCount(likeCount + 1);
                    if (userLike === -1) setDislikeCount(dislikeCount - 1);
                } else if (likeValue === -1) {
                    setDislikeCount(dislikeCount + 1);
                    if (userLike === 1) setLikeCount(likeCount - 1);
                } else {
                    userLike === 1
                        ? setLikeCount(likeCount - 1)
                        : setDislikeCount(dislikeCount - 1);
                }
                setUserLike(likeValue);
            } else {
                localStorage.removeItem('user');
                window.location = '/login';
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function modifyPublication(e) {
        e.preventDefault();
        const formData = new FormData(),
            text = e.target['textModificator'].value,
            image = picture !== '' ? e.target['imageModificator'].files[0] : '';

        formData.append('userId', userLogged.userId);
        formData.append('text', text);
        formData.append('image', image);

        try {
            const response = await fetch(
                `http://localhost:3001/api/publications/${publicationId}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: 'Bearer ' + userLogged.token,
                    },
                    body: formData,
                }
            );
            if (response.ok) {
                setEditMode(false);
                setIsEditing(false);
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

    function autoGrow(element) {
        element.style.height = element.scrollHeight + 'px';
    }

    function displayImage(element) {
        var selectedFile = element.files[0];
        var reader = new FileReader();

        reader.onload = (e) => {
            element.nextElementSibling.src = e.target.result;
        };

        reader.readAsDataURL(selectedFile);
    }

    if (editMode) {
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
                <EditForm onSubmit={(e) => modifyPublication(e)}>
                    <TextModificatorWrapper
                        id={`textModificator_${publicationId}`}
                        name="textModificator"
                        rows="1"
                        defaultValue={text}
                        onInput={(e) => autoGrow(e.target)}
                    ></TextModificatorWrapper>
                    {picture !== '' && (
                        <ImageModificatorWrapper>
                            <input
                                id="imageModificator"
                                type="file"
                                name="imageModificator"
                                accept="image/png, image/jpeg"
                                onChange={(e) => displayImage(e.target)}
                            />
                            <img src={picture} alt="publication" />
                        </ImageModificatorWrapper>
                    )}
                    <EditControlWrapper>
                        <ConfirmBtnWrapper>
                            <img alt="Valider" src={iconConfirm} />
                            <input
                                type="submit"
                                name="buttonConfirm"
                                value="buttonConfirm"
                            />
                        </ConfirmBtnWrapper>
                        <CancelBtnWrapper>
                            <img alt="Annuler" src={iconCancel} />
                            <input
                                type="button"
                                name="buttonCancel"
                                value="buttonCancel"
                                onClick={() => {
                                    setEditMode(false);
                                    setIsEditing(false);
                                }}
                            />
                        </CancelBtnWrapper>
                    </EditControlWrapper>
                </EditForm>
            </PublicationWrapper>
        );
    } else {
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
                <PublicationText
                    id={`publicationText_${publicationId}`}
                ></PublicationText>
                {picture !== '' && (
                    <PublicationImage src={picture} alt="publication" />
                )}
                <ActionsWrapper>
                    <LikeFieldWrapper>
                        <LikeBtnWrapper>
                            <span>{likeCount}</span>
                            {userLike === 1 ? (
                                <LikedBtn alt="J'aime" src={iconLike} />
                            ) : (
                                <LikeBtn alt="J'aime" src={iconLike} />
                            )}
                            <input
                                type="button"
                                name="buttonLike"
                                value="buttonLike"
                                onClick={(e) =>
                                    likePublication(e, userLike === 1 ? 0 : 1)
                                }
                            />
                        </LikeBtnWrapper>
                        <LikeBtnWrapper>
                            <span>{dislikeCount}</span>
                            {userLike === -1 ? (
                                <DislikedBtn
                                    alt="Je n'aime pas"
                                    src={iconDislike}
                                />
                            ) : (
                                <DislikeBtn
                                    alt="Je n'aime pas"
                                    src={iconDislike}
                                />
                            )}
                            <input
                                type="button"
                                name="buttonDislike"
                                value="buttonDislike"
                                onClick={(e) =>
                                    likePublication(e, userLike === -1 ? 0 : -1)
                                }
                            />
                        </LikeBtnWrapper>
                    </LikeFieldWrapper>
                    {userLogged.userId === userId && !isEditing && (
                        <ControlFieldWrapper>
                            <EditBtnWrapper>
                                <img alt="Modifier" src={iconEdit} />
                                <input
                                    type="button"
                                    name="buttonEdit"
                                    value="buttonEdit"
                                    onClick={() => {
                                        setEditMode(true);
                                        setIsEditing(true);
                                    }}
                                />
                            </EditBtnWrapper>
                            <DeleteBtnWrapper>
                                <img alt="Supprimer" src={iconDelete} />
                                <input
                                    type="button"
                                    name="buttonDelete"
                                    value="buttonDelete"
                                    onClick={(e) => deletePublication(e)}
                                />
                            </DeleteBtnWrapper>
                        </ControlFieldWrapper>
                    )}
                </ActionsWrapper>
            </PublicationWrapper>
        );
    }
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
