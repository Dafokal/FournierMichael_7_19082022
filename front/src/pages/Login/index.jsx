import styled from 'styled-components';
import { LoggedContext } from '../../utils/context';
import { useContext } from 'react';

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function Login() {
    const { logged, setLogged, user, setUser } = useContext(LoggedContext);
    async function fetchLogin(e) {
        e.preventDefault();
        const email = e.target['mail'].value,
            password = e.target['password'].value;
        try {
            const response = await fetch(
                `http://localhost:3001/api/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                setLogged(true);
                setUser(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <LoginWrapper>
            <h1>Login</h1>
            <form onSubmit={fetchLogin}>
                <div>
                    <label htmlFor="mail">Email :</label>
                    <input type="mail" name="mail" id="mail" />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" name="password" id="password" />
                </div>
                <input type="submit" name="submit" id="submit" value="Submit" />
            </form>
        </LoginWrapper>
    );
}

export default Login;
