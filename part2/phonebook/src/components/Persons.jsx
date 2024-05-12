import Delete from "./Delete";

const Persons = ({ persons, handleDelete }) => {
  return persons.map((p) => {
    return (
      <div key={p.id}>
        <p>
          {p.name} {p.number}
        </p>
        <Delete handleDelete={handleDelete} id={p.id} name={p.name} />
      </div>
    );
  });
};

export default Persons;
