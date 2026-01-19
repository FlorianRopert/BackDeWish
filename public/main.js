
const monInput = document.getElementById('monInput');
const monBouton = document.getElementById('monBouton');
const monInput3 = document.getElementById('monInput3');

const monBouton2 = document.getElementById('monBouton2');
monBouton.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputValue: monInput.value , inputValue2: monInput3.value })
    }).then(response => response.text())
        .then(data => {
            alert(data);
        });
});


monBouton2.addEventListener('click', () => {
    fetch('/info')
        .then(response => response.json())
        .then(data => alert(data.cle1));
});