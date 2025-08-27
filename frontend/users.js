const tableBody = document.querySelector('#users-table tbody');
const selectAllCheckbox = document.getElementById('select-all-checkbox');
const deleteAllBtn = document.getElementById('delete-all-btn');
const deleteSelectedBtn = document.getElementById('delete-selected-btn');
const updateModal = document.getElementById('update-modal');
const closeModalBtn = document.querySelector('.close-btn');
const updateForm = document.getElementById('update-form');

async function getUsers() {
  try {
    const res = await fetch('http://localhost:3000/api/v1/users');
    const users = await res.json();

    tableBody.innerHTML = '';

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="checkbox" class="user-checkbox" data-id="${user._id}"></td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td><button class="update-btn" data-id="${user._id}">Update</button></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    alert('An error occurred while fetching users');
  }
}

async function deleteAllUsers() {
    try {
        const res = await fetch('http://localhost:3000/api/v1/users', {
            method: 'DELETE'
        });
        if (res.ok) {
            getUsers();
        } else {
            const data = await res.json();
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred while deleting users');
    }
}

async function deleteSelectedUsers() {
    const selectedCheckboxes = document.querySelectorAll('.user-checkbox:checked');
    const userIds = Array.from(selectedCheckboxes).map(checkbox => checkbox.dataset.id);

    if (userIds.length === 0) {
        alert('Please select users to delete');
        return;
    }

    try {
        const promises = userIds.map(id => fetch(`http://localhost:3000/api/v1/users/${id}`, {
            method: 'DELETE'
        }));
        await Promise.all(promises);
        getUsers();
    } catch (err) {
        console.error(err);
        alert('An error occurred while deleting users');
    }
}

function openUpdateModal(user) {
    document.getElementById('update-user-id').value = user._id;
    document.getElementById('update-firstName').value = user.firstName;
    document.getElementById('update-lastName').value = user.lastName;
    document.getElementById('update-email').value = user.email;
    updateModal.style.display = 'block';
}

function closeUpdateModal() {
    updateModal.style.display = 'none';
}

async function updateUser(e) {
    e.preventDefault();
    const userId = document.getElementById('update-user-id').value;
    const updatedUser = {
        firstName: document.getElementById('update-firstName').value,
        lastName: document.getElementById('update-lastName').value,
        email: document.getElementById('update-email').value
    };

    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        if (res.ok) {
            closeUpdateModal();
            getUsers();
        } else {
            const data = await res.json();
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred while updating the user');
    }
}


getUsers();

deleteAllBtn.addEventListener('click', deleteAllUsers);
deleteSelectedBtn.addEventListener('click', deleteSelectedUsers);

selectAllCheckbox.addEventListener('change', () => {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
});

tableBody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('update-btn')) {
        const userId = e.target.dataset.id;
        try {
            const res = await fetch(`http://localhost:3000/api/v1/users/${userId}`);
            const user = await res.json();
            openUpdateModal(user);
        } catch (err) {
            console.error(err);
            alert('An error occurred while fetching user data');
        }
    }
});

closeModalBtn.addEventListener('click', closeUpdateModal);
updateForm.addEventListener('submit', updateUser);
