export const borderBox = {
  borderBottom: '1px solid #eaeaea',
  pb: '15px',
  mb: '15px',
};

export const dataEnterColumn = {
  borderTop: '1px solid #969696',
  borderBottom: '1px solid #969696',
  paddingY: '25px',
  mt: '10px',
};

export const flexChildrenEvenlySplit = {
  flexGrow: 2,
  flexBasis: 0,
  textAlign: 'center',
  paddingX: '8px',
  overflowX: 'hidden',
  userSelect: 'none',
};

export const hideMD = {
  display: { base: 'none', md: 'initial' },
};

export const hideSM = {
  display: { base: 'none', sm: 'initial' },
};

export const displayHelperMainBox = {
  border: '1px solid #000',
  borderRadius: '10px',
  paddingY: '25px',
  justifyContent: 'center',
  mt: '10px',
  mx: '5px',
  background: '#fdfdfd',
  cursor: 'pointer',
  minH: '180px',

  _hover: {
    transition: 'background .2s',
    background: '#f5f5f5',
  },
};

/*

const reportColumn: (variant?: boolean) => BoxProps = (variant = true) => {
  return {
    borderTop: '1px solid #000',
    background: variant ? '#a8f18a' : '#ffef5d',
    paddingY: '10px',
    mt: '15px',
    cursor: 'pointer',
    flex: '2',

    _hover: {
      transition: 'background .2s',
      background: variant ? '#97d87d' : '#e9db19',
    },
  };
};

const flexChildrenEvenlySplit: BoxProps = {
  flexGrow: 2,
  flexBasis: 0,
  textAlign: 'center',
  paddingX: '8px',
  overflowX: 'hidden',
  userSelect: 'none',
};

const hideMD: BoxProps = {
  display: { base: 'none', md: 'initial' },
};

const hideSM: BoxProps = {
  display: { base: 'none', sm: 'initial' },
};

const dataEnterColumn: BoxProps = {
  borderTop: '1px solid #000',
  borderBottom: '1px solid #969696',
  paddingY: '25px',
  mt: '10px',
};





*/
