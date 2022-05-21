import styled from "styled-components";

const StyledTextWithGradient = styled.span`
    background: ${({ theme }) => theme.colors.gradient.toRight};
    ${() => '-webkit-background-clip: text;'}
    -webkit-text-fill-color: transparent;
`;

export default StyledTextWithGradient;