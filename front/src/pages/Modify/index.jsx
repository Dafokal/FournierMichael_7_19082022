import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Loader } from '../../utils/style/Common';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoggedContext } from '../../utils/context';
import { useContext } from 'react';
import { useFetchPublications } from '../../utils/hooks';

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const TextAreaWrapper = styled.textarea`
    resize: none;
`;

const InputImgWrapper = styled.input``;

function Modify() {
    const publicationId = useParams().id;
    const { userLogged, setUserLogged } = useContext(LoggedContext);

    const { isDataLoading, publications, error } = useFetchPublications(
        `http://localhost:3001/api/publications/${publicationId}`,
        []
    );

    async function modifyPublication(e) {
        e.preventDefault();
        const formData = new FormData(),
            text = e.target['textCreator'].value,
            image = e.target['imageCreator'].files[0];

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
                window.location = '/';
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
        <div>
            {isDataLoading ? (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            ) : (
                <form onSubmit={modifyPublication}>
                    <TextAreaWrapper
                        id="textCreator"
                        name="textCreator"
                        cols="50"
                        rows="5"
                        defaultValue={publications.text}
                    ></TextAreaWrapper>
                    <img src={publications.imageUrl} alt="publication" />
                    <div>
                        <label htmlFor="imageCreator">Modifier l'image :</label>
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
                        value="Modifier"
                    />
                </form>
            )}
        </div>
    );
}

export default Modify;
