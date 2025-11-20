

document.getElementById('signup').addEventListener('submit', () => {

    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    if (!username || !password) {
        alert("Username and Password required");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('User signed up successfully!');
})
