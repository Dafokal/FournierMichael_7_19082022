import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../utils/style/colors';
import { useState } from 'react';

const LoginWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        & h1 {
            margin-top: 0.75em;
        }
    `,
    FormWrapper = styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 1em;
        margin-top: 2em;
    `,
    FieldWrapper = styled.div`
        width: 100%;
        font-size: 1.4em;
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
        margin-top: 1em;
        font-size: 1.5em;
        padding: 0.1em 0.5em;
        background: ${colors.primary};
        color: white;
        border: none;
        padding: 0.3em 1em;
        border-radius: 1em;
        cursor: pointer;
        &:hover {
            background: #ef330e;
        }
    `,
    RedirectInputWrapper = styled.input`
        margin-top: 1em;
        text-decoration: underline;
        background: none;
        border: none;
        cursor: pointer;
        &:hover {
            color: ${colors.primary};
        }
    `;

function Login() {
    const [signupDisplay, setSignupDisplay] = useState(false);

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

    async function fetchSignup(e) {
        e.preventDefault();
        const email = e.target['mail'].value,
            password = e.target['password'].value,
            name = e.target['name'].value,
            surname = e.target['surname'].value;
        try {
            const response = await fetch(
                `http://localhost:3001/api/auth/signup`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        name: name,
                        surname: surname,
                    }),
                }
            );
            if (response.ok) {
                try {
                    const response = await fetch(
                        `http://localhost:3001/api/auth/login`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-type':
                                    'application/json; charset=UTF-8',
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
            } else {
                alert('Identifiant ou mot de passe incorrect');
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (signupDisplay) {
        return (
            <LoginWrapper>
                <h1>Créer un compte</h1>
                <FormWrapper onSubmit={fetchSignup}>
                    <FieldWrapper>
                        <label htmlFor="mail">Email :</label>
                        <input type="mail" name="mail" id="mail" />
                    </FieldWrapper>
                    <FieldWrapper>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="password" id="password" />
                    </FieldWrapper>
                    <FieldWrapper>
                        <label htmlFor="name">Prénom :</label>
                        <input type="text" name="name" id="name" />
                    </FieldWrapper>
                    <FieldWrapper>
                        <label htmlFor="surname">Nom :</label>
                        <input type="text" name="surname" id="surname" />
                    </FieldWrapper>
                    <SubmitWrapper
                        type="submit"
                        name="submit"
                        id="submit"
                        value="Créer"
                    />
                </FormWrapper>
                <RedirectInputWrapper
                    type="button"
                    value="Se connecter"
                    onClick={() => setSignupDisplay(false)}
                />
            </LoginWrapper>
        );
    } else {
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
                <RedirectInputWrapper
                    type="button"
                    value="Créer un compte"
                    onClick={() => setSignupDisplay(true)}
                />
            </LoginWrapper>
        );
    }
}

export default Login;
