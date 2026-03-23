export default function AllTodos(props) {
  return (
    <div>
      <h2>Todo Lists</h2>
      <div className="border mx-5 my-3 py-3">
        <h3 className="text-info">Monday</h3>
        {props.lists1.map((list1) => {
          return <div>{list1.text}</div>;
        })}
      </div>
      <div className="border mx-5 my-3 py-3">
        <h3 className="text-info">Tuesday</h3>
        {props.lists2.map((list2) => {
          return <div>{list2.text}</div>;
        })}
      </div>
    </div>
  );
}
