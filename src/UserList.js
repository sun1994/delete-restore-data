import React, { useEffect, useState } from "react";

function UserList() {
  const [listss, setListss] = useState([]);
  const [restoreList, setRestoreList] = useState([]);
  const userData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setListss(data);
      });
  };
  useEffect(() => {
    userData();
  }, []);
  const deleteUser = (data, currentId) => {
    if (
      window.confirm(`Are you sure you want to delete row number: ${currentId} ?`)
    ) {
      setListss(listss.filter((val) => val.id !== data.id));
      setRestoreList([...restoreList, data]);
    }
    return;
  };
  const restoreUser = (restoreData, currentId) => {
    if (
      window.confirm(`Are you sure you want to restore row number: ${currentId} ?`)
    ) {
      setRestoreList(restoreList.filter((val) => val.id !== restoreData.id));
      setListss([...listss, restoreData]);
    }
    return;
  };
  return (
    <>
      {listss && listss.length > 0 ? (
        <div className="UserList">
          <h3>User List</h3>
          <table className="userTable">
            <thead className="userTHead">
              <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Email</td>
                <td>Website</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="userTBody">
              {listss &&
                listss.map((val, j) => {
                  return (
                    <tr key={j + 1}>
                      <td>{j + 1}</td>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.website}</td>
                      <td>
                        <button className="delete-btn" type="button" onClick={() => deleteUser(val, j+1)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>No User Data Available </h3>
      )}

      {restoreList && restoreList.length > 0 ? (
        <div className="RestoreList">
          <h3>Restore list</h3>
          <table className="restoreTable">
            <thead className="restoreTHead">
              <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Email</td>
                <td>Website</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="restoreTBody">
              {restoreList.map((val, i) => {
                return (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.website}</td>
                    <td>
                      <button type="button" className="restore-btn" onClick={() => restoreUser(val, i+1)}>
                        Restore
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>No Restored Data Available </h3>
      )}
    </>
  );
}

export default UserList;
