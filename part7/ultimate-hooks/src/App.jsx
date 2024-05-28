import "./App.css";
import { useField, useResource } from './hooks';

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    noteService.create({ content: content.input.value })

    const response = await noteService.create({ content: content.input.value })
    noteService.setResources(notes.concat(response));

    content.reset();
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    const response = await personService.create({ name: name.input.value, number: number.input.value})
    personService.setResources(persons.concat(response));

    name.reset();
    number.reset();
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.input} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.input} /> <br/>
        number <input {...number.input} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App