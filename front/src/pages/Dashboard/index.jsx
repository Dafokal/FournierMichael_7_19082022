import { useEffect, useState } from 'react';
import Publication from '../../components/Publication';
import { Loader } from '../../utils/style/Common';
import { LoggedContext } from '../../utils/context';
import { EditContext } from '../../utils/context';
import { useContext } from 'react';
import { useFetch } from '../../utils/hooks';
import iconPhoto from '../../assets/icon-photo.svg';
import iconSend from '../../assets/icon-send.svg';
import {
    DashboardWrapper,
    PublicationCreator,
    FormWrapper,
    CreatorAreaWrapper,
    TextAreaWrapper,
    CreatorMenuWrapper,
    ImgFieldWrapper,
    PublishBtnWrapper,
    LoaderWrapper,
    PublicationsContainer,
} from './style.jsx';

function Dashboard() {
    const [reloadPublications, setReloadPublications] = useState(false),
        { userLogged, setUserLogged } = useContext(LoggedContext),
        { isEditing, setIsEditing } = useContext(EditContext),
        { isDataLoading, data, error } = useFetch(
            `http://localhost:3001/api/publications/`,
            [reloadPublications]
        );

    // Sends request with data to creat a publication
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
                document
                    .getElementById(`imageCreatorDisplay`)
                    .classList.remove('withImg');
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
        element.style.height = '7em';
        element.style.height = element.scrollHeight + 'px';
    }

    // Display the image file contained in the input
    function displayImage(element) {
        var selectedFile = element.files[0];
        var targetImg = document.getElementById(`imageCreatorDisplay`);
        var reader = new FileReader();

        reader.onload = (e) => {
            targetImg.src = e.target.result;
            targetImg.classList.add('withImg');
        };

        reader.readAsDataURL(selectedFile);
    }

    if (error) {
        return <span>Oups il y a eu un problème</span>;
    }

    return (
        <DashboardWrapper>
            <PublicationCreator>
                <h1>Créer une publication</h1>
                <FormWrapper onSubmit={createPublication}>
                    <CreatorAreaWrapper>
                        <TextAreaWrapper
                            required
                            id="textCreator"
                            name="textCreator"
                            onInput={(e) => autoGrow(e.target)}
                        ></TextAreaWrapper>
                        <img
                            id="imageCreatorDisplay"
                            src=""
                            alt="publication"
                        />
                    </CreatorAreaWrapper>
                    <CreatorMenuWrapper>
                        <ImgFieldWrapper htmlFor="imageCreator">
                            <img src={iconPhoto} alt="Ajouter"></img>
                            <input
                                type="file"
                                id="imageCreator"
                                name="imageCreator"
                                accept="image/png, image/jpeg"
                                onChange={(e) => displayImage(e.target)}
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
                    {data
                        .sort((a, b) => {
                            return parseInt(a.date) < parseInt(b.date) ? 1 : -1;
                        })
                        .map((publication, index) => (
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
