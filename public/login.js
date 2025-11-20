function checkLogin(username, password) {
    if (username === users.username || password === users.password) {
        alert("login hat gefunzt!")
    }
}

document.getElementById('loginform').addEventListener('submit', () => {

    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    if (!username || !password) {
        alert("Username and Password required");
        return;
    }
    checkLogin(username, password);
})
