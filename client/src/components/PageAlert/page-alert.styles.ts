const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '250px',
    maxWidth: '500px',
    width: '100%',
    borderRadius: '10px',
    padding: '30px 20px',
    border: '3px solid',

    '&[data-status="info"]': {
      background: 'blue.50',
      borderColor: 'blue.500',
    },

    '&[data-status="warning"]': {
      background: 'yellow.50',
      borderColor: 'yellow.500',
    },

    '&[data-status="success"]': {
      background: 'green.50',
      borderColor: 'green.500',
    },

    '&[data-status="error"]': {
      background: 'red.50',
      borderColor: 'red.500',
    },

    '&[data-status="loading"]': {
      background: 'blue.50',
      borderColor: 'blue.500',
    },
  },
};

export default styles;
