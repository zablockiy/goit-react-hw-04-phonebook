import { useState } from 'react';
import initialState from './initialState';
import PropTypes from 'prop-types';
import style from './form.module.css';

const Form = ({ onSubmit }) => {

  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, phone });
    setState({ ...initialState });
  };

  const { name, phone } = state;


  return (

    <form className={style.form} onSubmit={handleSubmit}>
      <div>Name</div>
      <label>
        <input
          type='text'
          name='name'
          placeholder='Enter name'
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <div>Number</div>
      <label>
        <input
          value={phone}
          onChange={handleChange}
          type='tel'
          name='phone'
          placeholder='Enter phone number'
          pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
          title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
          required

        />
      </label>
      <button className={style.btn} type='submit'> Add contact</button>
    </form>
  );
};

export { Form };

  
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
