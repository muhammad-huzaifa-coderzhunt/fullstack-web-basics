const form = document.getElementById('signin-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      window.location.href = 'users.html';
    } else {
      const data = await res.json();
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred');
  }
});