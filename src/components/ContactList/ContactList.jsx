import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList({ contacts, remover }) {
    const listItems = contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} remover={remover} />
    ));

    return <ul className={css.contactList}>{listItems}</ul>;
}
