import { LoggedContext } from '../../utils/context';
import { useContext } from 'react';
import { useEffect, useState } from 'react';

export function useFetch(url, trigger) {
    const [isDataLoading, setDataLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const { userLogged, setUserLogged } = useContext(LoggedContext);
    useEffect(() => {
        async function fetchPublications(user) {
            setDataLoading(true);
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + user.token,
                    },
                });
                if (response.ok) {
                    const responseData = await response.json();
                    setData(responseData);
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
            fetchPublications(user);
        } else {
            window.location = '/login';
        }
    }, trigger);
    return { isDataLoading, data, error };
}
