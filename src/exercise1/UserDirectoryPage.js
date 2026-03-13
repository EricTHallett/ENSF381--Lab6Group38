import Controls from './Controls';
import sampleUsers from './sampleUsers';
import UserList from './UserList';
import { useState, useEffect } from 'react';

function UserDirectoryPage() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [viewMode, setViewMode] = useState('grid');
  // TODO: fetch the initial users with useEffect.
  useEffect(() => {
      fetch("https://69a1e1612e82ee536fa2755d.mockapi.io/users_api")
      .then((response) =>{
        return response.json();
      })
      .then((data) =>{
        setUsers(data);
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      })
  }, []);

  function handleDeleteClick(userId) {
    fetch(`https://69a1e1612e82ee536fa2755d.mockapi.io/users_api/${userId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error('Delete error: ', error);
      });
  }

  function handleSortByGroupClick() {
    const sortedUsers = [...users]
    sortedUsers.sort((a, b) =>a.user_group - b.user_group)
    setUsers(sortedUsers)
  }

  function handleSortByIdClick() {
    const sortedUsers = [...users]
    sortedUsers.sort((a, b) =>a.id - b.id)
    setUsers(sortedUsers);
    
    
  }

  function handleViewToggleClick() {
    viewMode === "user-grid" ? setViewMode("user-list") : setViewMode("user-grid");
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls 
        onDeleteClick={handleDeleteClick}
        onSortByGroupClick={handleSortByGroupClick}
        onSortByIdClick={handleSortByIdClick}
        onViewToggleClick={handleViewToggleClick}/>
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;
