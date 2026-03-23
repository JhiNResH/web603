import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateList from "./UpdateList";
import DeleteList from "./DeleteList";

function Lists(props) {
  const listrows = [];

  props.alldata.forEach((item) => {
    listrows.push(
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.author}</td>
        <td>
          <UpdateList
            id={item.id}
            singledata={props.singledata}
            handleChange={props.handleChange}
            getSingleList={props.getSingleList}
            updateList={props.updateList}
          />
        </td>
        <td>
          <DeleteList
            id={item.id}
            singledata={props.singledata}
            getSingleList={props.getSingleList}
            deleteList={props.deleteList}
          />
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{listrows}</tbody>
    </table>
  );
}

export default Lists;
