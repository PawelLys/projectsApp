export const StyledButton = btnStyle => {
  const check = btnStyle === 'admin';

  return {
    fontWeight: '400',
    transition: 'all .2s',
    padding: { base: '1rem .2rem', sm: '1rem .8rem' },
    height: '100%',
    borderRadius: '0',
    position: 'relative',
    color: '#f5f2f2',

    _hover: {
      color: '#fafafa',
      backgroundColor: check ? '#720303' : '#0a6f81',
    },
    _focus: {
      outline: 'none',
    },
    _active: {
      color: '#fff',
      backgroundColor: check ? '#550303' : '#084e5a',
    },
  };
};

export const StyledLink = {
  margin: '0 0.5rem',
  transition: 'color .2s',
  padding: '.5rem 0',
  color: 'rgb(202, 202, 202)',

  _hover: {
    color: 'rgb(215, 215, 215)',
    textDecoration: 'underline',
  },
};
