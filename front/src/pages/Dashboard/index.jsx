import { useEffect, useState } from 'react';
import Publication from '../../components/Publication';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { Loader } from '../../utils/style/Common';
import { LoggedContext } from '../../utils/context';
import { EditContext } from '../../utils/context';
import { useContext } from 'react';
import { useFetch } from '../../utils/hooks';
import iconPhoto from '../../assets/icon-photo.svg';
import iconSend from '../../assets/icon-send.svg';

const DashboardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2em;
`;
const PublicationCreator = styled.div`
    width: 100%;
    max-width: 70em;
    margin: 1.5em 0 1em;
    text-align: center;
`;
const FormWrapper = styled.form`
    width: 100%;
    margin-top: 1em;
    display: flex;
`;
const TextAreaWrapper = styled.textarea`
    width: 100%;
    font-size: 1.5em;
    resize: none;
    border: 1px solid ${colors.grayLight};
    padding: 1em;
    border-radius: 1.5em 0 0 1.5em;
    transition: background-color ease-in-out 150ms;
    &:focus {
        background-color: #f7f7f7;
    }
`;
const CreatorMenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${colors.grayLight};
    border-left: none;
    border-radius: 0 2em 2em 0;
    overflow: hidden;
`;
const ImgFieldWrapper = styled.label`
    width: 100%;
    flex: 0 0 50%;
    cursor: pointer;
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & input {
        display: none;
    }
    & img {
        width: 2.3em;
        transition: transform ease-in-out 100ms;
    }
    &:hover img {
        transform: scale(1.1);
    }
`;
const PublishBtnWrapper = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em 1.2em;
    font-size: 1.3em;
    color: black;
    border: none;
    cursor: pointer;
    flex: 0 0 50%;
    transition: background-color ease-in-out 100ms;
    & input {
        display: none;
    }
    & img {
        width: 2em;
        transition: transform ease-in-out 100ms;
    }
    &:hover img {
        transform: scale(1.1);
    }
`;
const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
const PublicationsContainer = styled.div`
    width: 100%;
    max-width: 70em;
`;

function Dashboard() {
    const [reloadPublications, setReloadPublications] = useState(false);
    const { userLogged, setUserLogged } = useContext(LoggedContext);
    const { isEditing, setIsEditing } = useContext(EditContext);

    const { isDataLoading, data, error } = useFetch(
        `http://localhost:3001/api/publications/`,
        [reloadPublications]
    );

    data.sort((a, b) => {
        return parseInt(a.date) < parseInt(b.date) ? 1 : -1;
    });

    async function createPublication(e) {
        e.preventDefault();
        const formData = new FormData(),
            text = e.target['textCreator'].value,
            image = e.target['imageCreator'].files[0];

        formData.append('userId', userLogged.userId);
        formData.append('text', text);
        formData.append('image', image);

        try {
            const response = await fetch(
                `http://localhost:3001/api/publications/`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + userLogged.token,
                    },
                    body: formData,
                }
            );
            if (response.ok) {
                setReloadPublications(
                    reloadPublications === true ? false : true
                );
                setIsEditing(false);
                e.target['textCreator'].value = '';
                e.target['imageCreator'].value = '';
            } else {
                localStorage.removeItem('user');
                window.location = '/login';
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (error) {
        return <span>Oups il y a eu un problème</span>;
    }

    return (
        <DashboardWrapper>
            <PublicationCreator>
                <h1>Créer une publication</h1>
                <FormWrapper onSubmit={createPublication}>
                    <TextAreaWrapper
                        required
                        id="textCreator"
                        name="textCreator"
                        rows="5"
                    ></TextAreaWrapper>
                    <CreatorMenuWrapper>
                        <ImgFieldWrapper htmlFor="imageCreator">
                            <img src={iconPhoto} alt="Ajouter"></img>
                            <input
                                type="file"
                                id="imageCreator"
                                name="imageCreator"
                                accept="image/png, image/jpeg"
                            />
                        </ImgFieldWrapper>
                        <PublishBtnWrapper htmlFor="submit">
                            <img src={iconSend} alt="Publier"></img>
                            <input
                                type="submit"
                                name="submit"
                                id="submit"
                                value="Publier"
                            />
                        </PublishBtnWrapper>
                    </CreatorMenuWrapper>
                </FormWrapper>
            </PublicationCreator>
            {isDataLoading ? (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            ) : (
                <PublicationsContainer>
                    {data.map((publication, index) => (
                        <Publication
                            key={`${publication._id}-${index}`}
                            publicationId={publication._id}
                            likes={publication.likes}
                            dislikes={publication.dislikes}
                            usersLiked={publication.usersLiked}
                            usersDisliked={publication.usersDisliked}
                            text={publication.text}
                            picture={publication.imageUrl}
                            userId={publication.userId}
                            date={publication.date}
                            setReloadPublications={setReloadPublications}
                            reloadPublications={reloadPublications}
                        />
                    ))}
                </PublicationsContainer>
            )}
        </DashboardWrapper>
    );
}

export default Dashboard;
