import { useState, useEffect } from 'react';
import { Form } from './Form/Form';
import { ListContact } from './ListContact/ListContact';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import style from './App.module.css';


const App = () => {

  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem('contacts')) ?? [],
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const handleInputChange = (e) => {
    setFilter(e.currentTarget.value);
    onVisibleContact();
  };

  const onAddContact = (data) => {
    const { name, phone } = data;
    if (checkDoubleContact(data)) {
      alert(`${name} is already in your contacts!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      phone,
    };
    setContacts([newContact, ...contacts]);
  };

  const checkDoubleContact = (inputData) => {
    return contacts.find(contact => contact.name.toLowerCase() === inputData.name.toLowerCase());
  };

  const onVisibleContact = () => {
    const normalized = filter.toLowerCase();
    return (contacts.filter((contact) => contact.name.toLowerCase().includes(normalized)));
  };

  const onDeleteContact = (id) => {
    setContacts(contacts.filter(elem => elem.id !== id));
  };


  const visibleContacts = onVisibleContact();
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Phonebook</h1>
      <Form onSubmit={onAddContact} />
      <h2 className={style.subtitle}>Contacts</h2>
      <Filter value={filter} onFilter={handleInputChange} />
      <ListContact contacts={visibleContacts} onDeleteContact={onDeleteContact} />
    </div>
  );
};

export { App };

