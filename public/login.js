

document.getElementById('loginform').addEventListener('submit', () => {

    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    if (!username || !password) {
        alert("Username and Password required");
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    alert('User logged in successfully!');
})
