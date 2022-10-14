import styled from 'styled-components';
import colors from '../../utils/style/colors';
import iconChangePhoto from '../../assets/icon-changePhoto.svg';

export const PublicationWrapper = styled.div`
        position: relative;
        padding: 1.5em 0;
        margin-top: 1em;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 2em;
        width: 100%;
        transition: 200ms;
        border: 1px solid ${colors.grayLight};
        color: black;
        &:hover {
            box-shadow: 2px 4px 10px #dddddd;
        }
    `,
    PublicationInfo = styled.div`
        padding: 0 2em;
    `,
    PublicationAuthor = styled.h3`
        font-size: 1.5em;
    `,
    PublicationDate = styled.span``,
    PublicationText = styled.span`
        font-size: 1.5em;
        padding: 1.3em 1.5em 0;
    `,
    PublicationImage = styled.img`
        padding-top: 1.25em;
        width: calc(100% + 2px);
        align-self: center;
    `,
    ActionsWrapper = styled.div`
        font-size: 1.5em;
        padding: 1.4em 1.5em 0;
        display: flex;
        justify-content: space-between;
    `,
    LikeFieldWrapper = styled.div`
        display: flex;
    `,
    LikeBtnWrapper = styled.label`
        cursor: pointer;
        display: flex;
        align-items: center;
        & input {
            display: none;
        }
        & img {
            width: 1.6em;
            margin-left: 0.5em;
            transition: transform ease-in-out 75ms;
        }
        &:hover img {
            transform: scale(1.1);
        }
        & span {
            align-self: flex-start;
        }
        :nth-child(2) {
            padding-left: 1em;
        }
    `,
    LikeBtn = styled.img`
        fill: ${colors.tertiary};
    `,
    LikedBtn = styled.img`
        filter: invert(73%) sepia(68%) saturate(536%) hue-rotate(97deg)
            brightness(101%) contrast(94%);
    `,
    DislikeBtn = styled.img`
        fill: ${colors.tertiary};
    `,
    DislikedBtn = styled.img`
        filter: invert(25%) sepia(53%) saturate(5407%) hue-rotate(1deg)
            brightness(102%) contrast(105%);
    `,
    ControlFieldWrapper = styled.div`
        display: flex;
    `,
    EditBtnWrapper = styled.label`
        cursor: pointer;
        display: flex;
        align-items: center;
        & input {
            display: none;
        }
        & img {
            width: 1.6em;
            transition: transform ease-in-out 75ms;
        }
        &:hover img {
            transform: scale(1.1);
        }
    `,
    DeleteBtnWrapper = styled.label`
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-left: 1.5em;
        & input {
            display: none;
        }
        & img {
            width: 1.5em;
            transition: transform ease-in-out 75ms;
        }
        &:hover img {
            transform: scale(1.1);
        }
    `,
    EditForm = styled.form`
        padding-top: 1.25em;
        display: flex;
        flex-direction: column;
    `,
    EditControlWrapper = styled.div`
        font-size: 1.5em;
        padding: 0.9em 1.5em 0;
        display: flex;
        justify-content: flex-end;
    `,
    TextModificatorWrapper = styled.textarea`
        font-size: 1.5em;
        resize: none;
        overflow: hidden;
        background-color: ${colors.grayLighter};
        border: none;
        border-radius: 0.7em;
        padding: 0.5em;
        margin: 0 1em;
        transition: background-color ease-in-out 150ms;
        &:focus {
            outline: 1px solid ${colors.tertiary};
        }
    `,
    ImageModificatorWrapper = styled.label`
        cursor: pointer;
        display: block;
        &.textOnly {
            width: 2.8em;
            transition: transform ease-in-out 75ms;
            position: absolute;
            top: 1.5em;
            right: 2em;
            & .imageDisplay {
                display: none;
            }
            & .imageAdder {
                display: block;
            }
            &:hover {
                transform: scale(1.1);
            }
        }
        &.withImage {
            width: calc(100% + 2px);
            align-self: center;
            position: relative;
            overflow: hidden;
            margin-top: 0.5em;
            margin-bottom: 0.6em;
            &::after {
                display: block;
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(255, 255, 255, 0.5);
                background-image: url('${iconChangePhoto}');
                background-repeat: no-repeat;
                background-size: 10%;
                background-position: center;
                opacity: 0;
                transition: opacity ease-in-out 450ms 50ms;
            }
            &:hover {
                &::after {
                    opacity: 1;
                }
                & .imageDisplay {
                    transform: scale(1.1);
                }
            }
            & .imageAdder {
                display: none;
            }
            & .imageDisplay {
                width: 100%;
                transition: transform ease-in-out 500ms;
            }
        }
        & input {
            display: none;
        }
    `,
    AddImageWrapper = styled.label`
    width: 3em;
    cursor: pointer;
    position: absolute;
    top: 1.3em;
    right: 2em;
    display: block;
    & input {
        display: none;
    }
    & img {
        width: 100%;
        transition: transform ease-in-out 75ms;
    }
    &:hover {
        & img {
            transform: scale(1.1);
        }
`,
    ConfirmBtnWrapper = styled.label`
        cursor: pointer;
        display: flex;
        align-items: center;
        & input {
            display: none;
        }
        & img {
            width: 1.45em;
            transition: transform ease-in-out 75ms;
        }
        &:hover img {
            transform: scale(1.1);
        }
    `,
    CancelBtnWrapper = styled.label`
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-left: 1.5em;
        & input {
            display: none;
        }
        & img {
            width: 1.45em;
            transition: transform ease-in-out 75ms;
        }
        &:hover img {
            transform: scale(1.1);
        }
    `;
