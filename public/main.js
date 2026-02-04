const monInput = document.getElementById('monInput');
const monBouton = document.getElementById('monBouton');
const monInput3 = document.getElementById('monInput3');
const vote = document.getElementById('vote');
const monBouton2 = document.getElementById('monBouton2');
const voter = document.getElementById('voter');
monBouton.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputValue: monInput.value, inputValue2: monInput3.value })
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
    vote.appendChild(inputValue);


});


monBouton2.addEventListener('click', () => {
    fetch('/info')
        .then(response => response.json())
        .then(data => alert(data.cle1));
});
window.onload = () => {
    fetch('/user')

        .then(response => response.json())
        .then(users => {
            const usersList = document.getElementById('vote');
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.text = user.login;
                usersList.appendChild(option);

            });


        });
    voteRN();
};


voter.addEventListener('click', () => {
    fetch('/Vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputValue: vote.value, inputElecteur: localStorage.getItem('userId') })
    }).then(response => response.text())
        .then(data => {
            alert(data);

        })
    console.log(vote.value);
});

function voteRN() {
    const usersList = document.getElementById('vote');
    const selectedUserId = usersList.value;
    fetch('/VoteCount', {
    })
        .then(response => response.json())
        .then(data => {
            const result = document.getElementById('resultat');
            data.forEach(Vote => {
                const tr = document.createElement("tr");
                result.appendChild(tr);
                const td = document.createElement("td");
                td.innerText = Vote.login;
                tr.appendChild(td);
                const td1 = document.createElement("td");
                td1.innerText = Vote.voteCount;
                tr.appendChild(td1);



            });
        })
}
const loginButton = document.getElementById('loginbutton');
const loginInput = document.getElementById('loginintput');
const passwordInput = document.getElementById('passwordinput');
loginButton.addEventListener('click', () => {


    fetch('/connexion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: loginInput.value, password: passwordInput.value })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            alert("ID utilisateur : " + data.user.id);
            localStorage.setItem('userId', data.user.id);
        });
});