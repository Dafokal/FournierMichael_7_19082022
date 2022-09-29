import { useEffect, useState } from 'react';
import Publication from '../../components/Publication';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { Loader } from '../../utils/style/Common';
import { LoggedContext } from '../../utils/context';
import { useContext } from 'react';
import { useFetchPublications } from '../../utils/hooks';

const DashboardWrapper = styled.div``;

const PublicationsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
`;

const PublicationCreatorWrapper = styled.div``;

const TextAreaWrapper = styled.textarea`
    resize: none;
`;
const InputImgWrapper = styled.input``;

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

function Dashboard() {
    const [reloadPublications, setReloadPublications] = useState(false);
    const { userLogged, setUserLogged } = useContext(LoggedContext);

    const { isDataLoading, publications, error } = useFetchPublications(
        `http://localhost:3001/api/publications/`,
        [reloadPublications]
    );

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
            <PublicationCreatorWrapper>
                <h1>Créer une publication</h1>
                <form onSubmit={createPublication}>
                    <TextAreaWrapper
                        id="textCreator"
                        name="textCreator"
                        cols="50"
                        rows="5"
                    ></TextAreaWrapper>
                    <div>
                        <label htmlFor="imageCreator">
                            Ajouter une image :
                        </label>
                        <InputImgWrapper
                            type="file"
                            id="imageCreator"
                            name="imageCreator"
                            accept="image/png, image/jpeg"
                        />
                    </div>
                    <input
                        type="submit"
                        name="submit"
                        id="submit"
                        value="Publier"
                    />
                </form>
            </PublicationCreatorWrapper>
            {isDataLoading ? (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            ) : (
                <PublicationsContainer>
                    {publications.map((publication, index) => (
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
