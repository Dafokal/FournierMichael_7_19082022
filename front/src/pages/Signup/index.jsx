import styled from 'styled-components';

const SignupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function Signup() {
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
            const { token } = await response.json();
            console.log(token);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SignupWrapper>
            <h1>Sign up</h1>
            <form onSubmit={fetchSignup}>
                <div>
                    <label htmlFor="mail">Email :</label>
                    <input type="mail" name="mail" id="mail" />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div>
                    <label htmlFor="name">Prénom :</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div>
                    <label htmlFor="surname">Nom :</label>
                    <input type="text" name="surname" id="surname" />
                </div>
                <input type="submit" name="submit" id="submit" value="Submit" />
            </form>
        </SignupWrapper>
    );
}

export default Signup;
