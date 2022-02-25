import styled from 'styled-components';

interface StyleProps {
  buttonColor?: string;
}

export const BackDrop = styled.div({
  position: 'fixed',
  right: 0,
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const CardBox = styled.div({
  backgroundColor: 'var(--neutral-white)',
  width: '23rem',
  height: '15rem',
  borderRadius: 8,
  padding: '0 1.5rem .5rem',
  boxSizing: 'border-box',
  color: 'var(--neutral-gray-blue)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  justifyContent: 'center',
  '& > p': {
    lineHeight: 1.4,
  },
});

export const ActionDiv = styled.div({
  display: 'flex',
  gap: '1rem',
});

export const StyledButton = styled.button<StyleProps>((props) => ({
  textTransform: 'uppercase',
  color: 'var(--neutral-white)',
  fontWeight: 600,
  width: '100%',
  padding: '.8rem',
  cursor: 'pointer',
  backgroundColor: `var(${props.buttonColor})`,
  border: 'none',
  borderRadius: 8,
}));
