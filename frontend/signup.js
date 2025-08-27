const form = document.getElementById('signup-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    });

    if (res.ok) {
      window.location.href = 'signin.html';
    } else {
      const data = await res.json();
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred');
  }
});