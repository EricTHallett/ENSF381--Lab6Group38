import Controls from './Controls';
import sampleUsers from './sampleUsers';
import UserList from './UserList';
import { useState, useEffect } from 'react';

function UserDirectoryPage() {
    // TODO: add users, sortBy, and viewMode state in this component.
    const [users, setUsers] = useState([]);
    const [sortBy, setSortBy] = useState('id');
    const [viewMode, setViewMode] = useState('grid');
    // TODO: fetch the initial users with useEffect.
    useEffect (() => {
        fetch("https://69b4442bbe587338e7134ab3.mockapi.io/users_api")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setUsers(data);
        })
        .catch((error) => {
            console.error("Fetch error: ", error);
        })
    }, []);

  function handleDeleteClick(userId) {
    fetch(`https://69b4442bbe587338e7134ab3.mockapi.io/users_api/${userId}`, {
        method: 'DELETE',
    })
    .then(() => {
        setUsers(users.filter(user => user.id !== userId));
    })
    .catch((error) => {
        console.error("Fetch error: ", error);
    })
    
    
    setUsers(users.filter(user => user.id !== userId));
  }

  function handleSortByGroupClick() {
    const sortedUsers = [...users];
    sortedUsers.sort((a,b) => a.user_group - b.user_group)
    setUsers(sortedUsers);
  }

  function handleSortByIdClick() {
    const sortedUsers = [...users];
    sortedUsers.sort((a,b) => a.id - b.id)
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
          onViewToggleClick={handleViewToggleClick}
        />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;
