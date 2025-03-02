import { HiUser } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import css from "./Contact.module.css";

export default function Contact({ contact, remover }) {
    const handleDelete = () => {
        remover(contact.id);
    };

    return (
        <li className={css.contact}>
            <ul className={css.info}>
                <li className={css.infoItem}>
                    <HiUser className="my-icon" size="24" />
                    <p>{contact.name}</p>
                </li>
                <li className={css.infoItem}>
                    <HiPhone className="my-icon" size="24" />
                    <p>{contact.number}</p>
                </li>
            </ul>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
}
