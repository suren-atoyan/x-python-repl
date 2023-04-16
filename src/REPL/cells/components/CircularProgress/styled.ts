import styled from '@emotion/styled';
import { keyframes } from '@emotion/css';
import { Box } from '../../../styled';

const WIDTH = 15;
const HEIGHT = WIDTH;

const circle = keyframes`
  0% {
    transform: rotate(0deg) translate(${WIDTH / 2}px) rotate(0deg);
  }

  100% {
    transform: rotate(360deg) translate(${WIDTH / 2}px) rotate(-360deg);
  }
`;

const Container = styled(Box)({
  width: WIDTH,
  height: HEIGHT,
  position: 'relative',
});

const Wrapper = styled(Box)({
  width: WIDTH,
  height: HEIGHT,
  border: '1px solid #CCC',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto',
  borderRadius: '50%',
});

const Circle = styled(Box)({
  width: WIDTH / 4,
  height: HEIGHT / 4,
  background: 'cyan',
  borderRadius: '50%',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  overflow: 'hidden',
  margin: 'auto',
  animation: `${circle} 0.7s linear infinite`,
});

export { Container, Wrapper, Circle };
