import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Loader } from '../../utils/style/Common';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoggedContext } from '../../utils/context';
import { useContext } from 'react';

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

function Modify() {
    const [isDataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState(false);
    const [publication, setPublication] = useState();
    const publicationId = useParams().id;
    const { userLogged, setUserLogged } = useContext(LoggedContext);

    useEffect(() => {
        async function fetchPublication(user) {
            setDataLoading(true);
            try {
                const response = await fetch(
                    `http://localhost:3001/api/publications/${publicationId}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer ' + user.token,
                        },
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setPublication(data);
                } else {
                    localStorage.removeItem('user');
                    window.location = '/login';
                }
            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setDataLoading(false);
            }
        }
        if (localStorage.user !== undefined) {
            const user = JSON.parse(localStorage.user);
            setUserLogged(user);
            fetchPublication(user);
        } else {
            window.location = '/login';
        }
    }, []);

    return (
        <div>
            {isDataLoading ? (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            ) : (
                <form>
                    <textarea defaultValue={publication.text}></textarea>
                    <img src={publication.imageUrl} alt="publication" />
                </form>
            )}
        </div>
    );
}

export default Modify;
