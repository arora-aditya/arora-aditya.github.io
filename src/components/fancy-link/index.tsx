import styled from 'styled-components';

const FancyLink = styled.a`
text-decoration: none;
position: relative;
color: inherit;
position:relative;
display:inline-block;
transition: all 0.3s ease-out;
&.active {
  p {
    color: ${props => props.theme.bg === 'light' ? '#3873F9' : '#FBFDFF'};
    border-bottom: none;
  }
}
&:visited {
  color: ${props => props.theme.bg === 'light' ? 'black' : '#FBFDFF'};
}
&.highlight {
  color: ${props => props.theme.bg === 'light' ? '#3873F9' : '#AFC7FC'};
  &:after {
    content: "";
    border-bottom:solid transparent 2px;
    border-radius: 2px;
    position: absolute;
    display:block;
    left: 0;
    margin:0 auto;
    top:90%;
    background-color: ${props => props.theme.bg === 'light' ? '#3873F9' : '#AFC7FC'};
    opacity: 0.5;
    height: 1px;
    width: 0%;
    transition: width 0.3s ease;
  }
  &.active {
    &:hover {
      &:after {
        width: 100%;
      }
    }
  }
  &:hover {
    &:after {
      width: 100%;
    }
  }
}
&.nohighlight {
  color: ${props => props.theme.bg === 'light' ? '#3873F9' : '#AFC7FC'};
}
`

export default FancyLink;