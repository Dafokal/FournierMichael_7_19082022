import PropTypes from 'prop-types';
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
import iconChangePhoto from '../../assets/icon-changePhoto.svg';
import iconAddPhoto from '../../assets/icon-photo.svg';
import {
    PublicationWrapper,
    PublicationInfo,
    PublicationAuthor,
    PublicationDate,
    PublicationText,
    PublicationImage,
    ActionsWrapper,
    LikeFieldWrapper,
    LikeBtnWrapper,
    LikeBtn,
    LikedBtn,
    DislikeBtn,
    DislikedBtn,
    ControlFieldWrapper,
    EditBtnWrapper,
    DeleteBtnWrapper,
    EditForm,
    EditControlWrapper,
    TextModificatorWrapper,
    ImageModificatorWrapper,
    AddImageWrapper,
    ConfirmBtnWrapper,
    CancelBtnWrapper,
} from './style.jsx';

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
    const { userLogged, setUserLogged } = useContext(LoggedContext),
        { isEditing, setIsEditing } = useContext(EditContext),
        [editMode, setEditMode] = useState(false),
        [pictureDisplayed, setpictureDisplayed] = useState(false),
        [userLike, setUserLike] = useState(0),
        [likeCount, setLikeCount] = useState(likes),
        [dislikeCount, setDislikeCount] = useState(dislikes),
        dateString = new Date(parseInt(date)).toLocaleDateString('fr-FR'),
        timeString = new Date(parseInt(date))
            .toLocaleTimeString('fr-FR')
            .slice(0, -3)
            .replace(':', 'h'),
        { isDataLoading, data, error } = useFetch(
            `http://localhost:3001/api/auth/${userId}`,
            []
        );

    // Sets state for userLike
    useEffect(() => {
        if (usersLiked.includes(userLogged.userId)) {
            setUserLike(1);
        } else if (usersDisliked.includes(userLogged.userId)) {
            setUserLike(-1);
        }
    }, []);

    // Allows the display of line breaks in publication
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

    // Send a request to delete a publication
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

    // Send the request with like/dislike value
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

    // Send a request with data to modify a publication
    async function modifyPublication(e) {
        e.preventDefault();
        const formData = new FormData(),
            text = e.target['textModificator'].value,
            image =
                pictureDisplayed || picture !== ''
                    ? e.target['imageModificator'].files[0]
                    : '';

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

    // Adapt the height of a textArea from content
    function autoGrow(element) {
        element.style.height = '0';
        element.style.height = element.scrollHeight + 'px';
    }

    // Display the image file contained in the input
    function displayImage(element) {
        var selectedFile = element.files[0];
        var reader = new FileReader();

        reader.onload = (e) => {
            document.getElementById(`imageDisplay_${publicationId}`).src =
                e.target.result;
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
                        defaultValue={text}
                        onInput={(e) => autoGrow(e.target)}
                    ></TextModificatorWrapper>
                    <ImageModificatorWrapper
                        className={
                            picture === '' && pictureDisplayed === false
                                ? 'textOnly'
                                : 'withImage'
                        }
                    >
                        <input
                            id="imageModificator"
                            type="file"
                            name="imageModificator"
                            accept="image/png, image/jpeg"
                            onChange={(e) => {
                                displayImage(e.target);
                                setpictureDisplayed(true);
                            }}
                        />
                        <img
                            id={`imageDisplay_${publicationId}`}
                            className="imageDisplay"
                            src={picture}
                            alt="publication"
                        />
                        <img
                            className="imageAdder"
                            src={iconAddPhoto}
                            alt="publication"
                        />
                    </ImageModificatorWrapper>
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
                                    setpictureDisplayed(false);
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
                    {(userLogged.userId === userId ||
                        userLogged.userId === '6349131bdcc3cb4e5cb24a46') &&
                        !isEditing && (
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
