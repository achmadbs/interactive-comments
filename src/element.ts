import styled from 'styled-components';

export const Container = styled.div({
  margin: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  overflow: 'auto',
  '@media only screen and (max-width: 375px)': {
    justifyContent: 'flex-start',
    height: '100%',
  },
});

export const Box = styled.div({
  marginBottom: '1rem',
  '@media only screen and (max-width: 375px)': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 1rem',
  },
});

export const CommentBox = styled.div({
  display: 'flex',
  gap: '1rem',
  backgroundColor: 'var(--neutral-white)',
  borderRadius: 8,
  padding: '1rem',
  width: '40rem',
  margin: '1rem 0',
  '@media only screen and (max-width: 375px)': {
    width: '20rem',
  },
});

export const ReplayWrapper = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  '& > div:nth-child(2)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
});

export const Divider = styled.div({
  display: 'flex',
  alignItems: 'center',
  borderLeft: '3px solid var(--neutral-light-grey)',
});

export const ReplyBox = styled(CommentBox)({
  width: '37rem',
  marginLeft: '1.5rem',
  marginBottom: 0,
  marginTop: 0,
  '@media only screen and (max-width: 375px)': {
    width: '18rem',
  },
});

export const CounterWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '.5rem',
  height: 'fit-content',
  borderRadius: 8,
  padding: '.8rem .5rem',
  color: 'var(--primary-blue)',
  fontWeight: 500,
  fontSize: 13,
  backgroundColor: 'var(--neutral-light-grey)',
  '& > svg': {
    cursor: 'pointer',
    '& > path:active': {
      fill: 'var(--primary-blue)',
    },
  },
});

export const MainWrapper = styled.main({
  lineHeight: 1.4,
  width: '100%',
  color: 'var(--neutral-gray-blue)',
  '& span': {
    color: 'var(--primary-blue)',
    fontWeight: '600',
  },
  '& > nav': {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    '@media only screen and (max-width: 375px)': {
      display: 'block',
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      '& > img': {
        width: 30,
        height: 30,
      },
      '& > h4': {
        color: 'var(--neutral-blue)',
      },
    },
    '& > div:last-of-type': {
      gap: '.5rem',
      cursor: 'pointer',
      color: 'var(--primary-blue)',
    },
    '& > div:last-of-type:active': {
      '& > h5': {
        color: 'var(--primary-light-blue)',
      },
      '& > svg': {
        '& > path': {
          fill: 'var(--primary-light-blue)',
        },
      },
    },
  },
});

export const Author = styled.div({
  backgroundColor: 'var(--primary-blue)',
  fontSize: 12,
  color: 'var(--neutral-white)',
  padding: '2px 6px',
  borderRadius: 4,
  fontWeight: 600,
});

export const EditAction = styled.div({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  '& > div:active': {
    opacity: 0.5,
  },
  '& > div > span': {
    fontWeight: 500,
    marginLeft: 8,
  },
  '& > div:first-child > span': {
    color: 'var(--primary-soft-red)',
  },
});

export const ReplyAct = styled.div({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  '&:active': {
    opacity: 0.5,
  },
});

export const InputComment = styled(CommentBox)({
  margin: '1rem 0',
  justifyContent: 'space-between',
  '& > img': {
    width: 30,
    height: 30,
  },
  '& > textarea': {
    width: '100%',
    height: '6rem',
    resize: 'none',
    boxSizing: 'border-box',
    padding: '1rem',
  },
  '& > button': {
    border: 'none',
    borderRadius: 8,
    height: '2.5rem',
    width: '7rem',
    cursor: 'pointer',
    textTransform: 'uppercase',
    backgroundColor: 'var(--primary-blue)',
    color: 'var(--neutral-white)',
    fontWeight: 600,
    '&:active': {
      opacity: 0.5,
    },
  },
});

export const EditComment = styled(InputComment)({
  margin: 0,
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  padding: 0,
  '& > div': {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '0.5rem',
  },
  '& > div > button': {
    border: 'none',
    borderRadius: 8,
    height: '2.5rem',
    width: '7rem',
    cursor: 'pointer',
    textTransform: 'uppercase',
    backgroundColor: 'var(--primary-blue)',
    color: 'var(--neutral-white)',
    fontWeight: 600,
    '&:active': {
      opacity: 0.5,
    },
  },
});
