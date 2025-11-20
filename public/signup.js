
function newSignUp() {
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
        if (!username || !password) {
        alert("Username and Password required");
        return;
    }
    alert('User signed up successfully!');
}

document.getElementById('signup').addEventListener('submit', () => {
    newSignUp();    
})
