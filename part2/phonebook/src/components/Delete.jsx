const Delete = ({ handleDelete, id, name }) => {
    return (
      <button onClick={() => {handleDelete(id, name)}}>
        Delete
      </button>
    )
  }

export default Delete;