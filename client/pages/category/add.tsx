import { useReducer } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import { ADD_CATEGORY_MUTATION } from 'graphql/mutations';
import theme from 'utilities/theme';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  error: {
    color: 'red',
  },
});

const initialState = {
  title: '',
};

const AddCategory = (): React.ReactElement => {
  const classes = useStyles();
  const [state, dispatch] = useReducer((state, { field, value }) => ({ ...state, [field]: value }), initialState);
  const [createPost, { error }] = useMutation(ADD_CATEGORY_MUTATION, {
    onCompleted(data) {
      Object.keys(initialState).map(field => dispatch({ field, value: initialState[field] }));
    },
    onError(error) {
      console.log(error.graphQLErrors);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();

    createPost({
      variables: { category: state },
    });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          required
          id="title"
          name="title"
          label="Category Title"
          onChange={handleChange}
          value={state.title}
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Add Category
        </Button>
        {error &&
          error.graphQLErrors.map(({ message }, i) => (
            <span className={classes.error} key={i}>
              {message}
            </span>
          ))}
      </form>
    </Container>
  );
};

export default AddCategory;
