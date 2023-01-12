const userName = document.querySelector('#userNameC')
const password = document.querySelector('#passwordC')
const confirmPassword = document.querySelector('#passwordB')
const alertP = document.querySelector('#alertP')
const alertS = document.querySelector('#alertS')
const teste = document.querySelector('#testando')
const invalid = document.querySelector('#invalid2')


function register (){
    registration ()
}
function logar(){
    login ()
}

function registration () {
    let users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push(
        {
            name: userName.value,
            password: password.value,
        }
    )
    localStorage.setItem('users', JSON.stringify(users))
    setTimeout (() => {
        window.location.href = 'login.html'
    }, 2000)
}

function login () {
    let userNameL = document.querySelector('#userName')
    let passwordL = document.querySelector('#password')
    let listaUser = []
    listaUser = JSON.parse(localStorage.getItem('users'))
        listaUser.forEach((item) => {
        if(userNameL.value == item.name && passwordL.value == item.password){
            alertP.style.visibility = 'hidden'
            alertS.style.display = 'block'
            setTimeout (() => {
                window.location.href = 'index.html'
            }, 2000)
        }
        else{
            alertP.style.display = 'block' 

        }

    })
}

function ValidCamps (){
    let novoParagrafo = document.createElement("p")
    novoParagrafo.setAttribute('class', 'validCamps')
    let texto = document.createTextNode("Cadastrado com sucesso!");
    novoParagrafo.appendChild(texto)
    let teste = document.querySelector("#testando")
    teste.appendChild(novoParagrafo)
}
function notCorrect (){
    let novoParagrafo = document.createElement("p")
    novoParagrafo.setAttribute('class', 'invalid2')
    let texto = document.createTextNode("Usuário ou senha incorretos!");
    novoParagrafo.appendChild(texto)
    let teste = document.querySelector("#testando2")
    teste.appendChild(novoParagrafo)
    }
    

function validate () {
        if (userName.value.length > 1 && password.value === confirmPassword.value && password.value > 0){
            register ()
            ValidCamps ()
            invalid.style.display = "none"
            userName.style.border = '1px solid green'
        password.style.border = '1px solid green'
        confirmPassword.style.border = '1px solid green'
    }
    else {
        invalid.style.display = "block"
        userName.style.border = '1px solid red'
        password.style.border = '1px solid red'
        confirmPassword.style.border = '1px solid red'
    }
}