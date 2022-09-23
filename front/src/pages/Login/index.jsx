import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    FormWrapper = styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 1em;
    `,
    FieldWrapper = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
        & input {
            margin-left: 1em;
        }
        & label {
            flex: 1;
            text-align: right;
        }
    `,
    SubmitWrapper = styled.input`
        margin-top: 0.5em;
        font-size: 1em;
        padding: 0.1em 0.5em;
    `,
    RedirectLinkWrapper = styled(Link)`
        margin-top: 1em;
    `;

function Login() {
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
                localStorage.user = JSON.stringify(data);
                window.location = '/';
            } else {
                alert('Identifiant ou mot de passe incorrect');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <LoginWrapper>
            <h1>Se connecter</h1>
            <FormWrapper onSubmit={fetchLogin}>
                <FieldWrapper>
                    <label htmlFor="mail">Email :</label>
                    <input type="mail" name="mail" id="mail" />
                </FieldWrapper>
                <FieldWrapper>
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" name="password" id="password" />
                </FieldWrapper>
                <SubmitWrapper
                    type="submit"
                    name="submit"
                    id="submit"
                    value="Connexion"
                />
            </FormWrapper>
            <RedirectLinkWrapper to="/signup">
                Créer un compte
            </RedirectLinkWrapper>
        </LoginWrapper>
    );
}

export default Login;
