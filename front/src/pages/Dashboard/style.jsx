import styled from 'styled-components';
import colors from '../../utils/style/colors';
import iconChangePhoto from '../../assets/icon-changePhoto.svg';

export const DashboardWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 2em;
    `,
    PublicationCreator = styled.div`
        width: 100%;
        max-width: 70em;
        margin: 1.5em 0 1em;
        text-align: center;
    `,
    FormWrapper = styled.form`
        width: 100%;
        margin-top: 1em;
        display: flex;
    `,
    CreatorAreaWrapper = styled.div`
        width: 100%;
        border: 1px solid ${colors.grayLight};
        overflow: hidden;
        border-radius: 1.5em 0 0 1.5em;
        & img {
            width: 100%;
            display: none;
            &.withImg {
                display: block;
            }
        }
    `,
    TextAreaWrapper = styled.textarea`
        width: 100%;
        font-size: 1.5em;
        resize: none;
        overflow: hidden;
        min-height: 7.5em;
        padding: 1em;
        border: none;
        transition: background-color ease-in-out 150ms;
        &:focus {
            background-color: #f7f7f7;
        }
    `,
    CreatorMenuWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid ${colors.grayLight};
        border-left: none;
        border-radius: 0 2em 2em 0;
        overflow: hidden;
    `,
    ImgFieldWrapper = styled.label`
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
    `,
    PublishBtnWrapper = styled.label`
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
    `,
    LoaderWrapper = styled.div`
        display: flex;
        justify-content: center;
    `,
    PublicationsContainer = styled.div`
        width: 100%;
        max-width: 70em;
    `;
