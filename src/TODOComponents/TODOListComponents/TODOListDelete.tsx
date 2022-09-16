export default function TODOListDelete(props:{handleDelete: () => Promise<void>}) {
  return (
    <button
      aria-label="button-list-delete"
      data-testid="deleteSpan"
      className="cursor-pointer flex justify-center items-center hover:text-red-700 duration-300"
      onClick={props.handleDelete}
    >
      delete
    </button>
  );
}
