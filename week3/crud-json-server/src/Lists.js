import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Lists(props) {
  const listrows = [];

  props.alldata.forEach((item) => {
    listrows.push(
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.author}</td>
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
        </tr>
      </thead>
      <tbody>{listrows}</tbody>
    </table>
  );
}

export default Lists;
