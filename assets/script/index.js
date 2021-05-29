const btn = document.querySelector('button')
let username = document.querySelector('.username-input input')




btn.addEventListener('click', () => {  
    if(username.value === 'areel007') {
        window.location.href = "/github-profile.html"
    } else {
        alert('Incorrect username')
    }
})