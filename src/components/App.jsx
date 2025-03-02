import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import { useEffect, useState } from "react";
import initContactsList from "./../assets/contacts.json";
import { v4 as uuidv4 } from "uuid";
import SearchBox from "./SearchBox/SearchBox";

export default function App() {
    const [contactsList, setContactsList] = useState(
        JSON.parse(window.localStorage.getItem("saved-contactsList")) ||
            initContactsList
    );

    useEffect(() => {
        window.localStorage.setItem(
            "saved-contactsList",
            JSON.stringify(contactsList)
        );
    }, [contactsList]);

    const [filteredContactsList, setFilteredContactsList] =
        useState(contactsList);
    const [filterMaska, setFilterMaska] = useState("");

    useEffect(() => {
        const filtered = contactsList.filter((contact) =>
            contact.name.toLowerCase().startsWith(filterMaska.toLowerCase())
        );
        setFilteredContactsList(filtered);
    }, [contactsList, filterMaska]);

    const AdderContact = (data) => {
        const newContact = {
            id: uuidv4(),
            name: data.name,
            number: data.number,
        };
        setContactsList((prev) => [...prev, newContact]);
    };

    const Filter = (maska) => {
        setFilterMaska(maska);
    };

    const deleteContact = (id) => {
        setContactsList((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <main>
            <ContactForm adder={AdderContact} />
            <SearchBox filter={Filter} />
            <ContactList
                contacts={filteredContactsList}
                remover={deleteContact}
            />
        </main>
    );
}
