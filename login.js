const userName = document.querySelector('#userNameC')
const password = document.querySelector('#passwordC')
const confirmPassword = document.querySelector('#passwordB')
const alertP = document.querySelector('#alertP')
const alertS = document.querySelector('#alertS')
const invalid1 = document.querySelector('#invalid1')
const invalid2 = document.querySelector('#invalid2')
const invalid3 = document.querySelector('#invalid3')
const invalid4 = document.querySelector('#invalid4')
const valid = document.querySelector('#valid')


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
        window.location.href = 'index.html'
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
                window.location.href = 'tasks.html'
            }, 2000)
        }
        else{
            alertP.style.display = 'block' 
        }

    })
}

function validate () {
        if (userName.value.length >= 3 && password.value === confirmPassword.value && password.value.length >= 6){
            register () 
            valid.style.display = 'block'       
        }
        else {
            invalid4.style.display = 'block'
            userValidate ()
            passwordValidate()
            compareValue ()
            invalid2.style.display = 'none'
        }               
}

function userValidate (){
    if (userName.value.length <3){
        userName.style.border ='1px solid red'
        invalid1.style.display = 'block'
    }
    else {
        userName.style.border = '1px solid green'
        invalid1.style.display = 'none'

    }
}


function passwordValidate(){
    if (password.value.length < 6){
        invalid3.style.display = 'block'
        password.style.border = '1px solid red'
    }
    else{
        invalid3.style.display = 'none'
        password.style.border = '1px solid green'
        invalid4.style.display = 'none'
    }
}

function compareValue (){
    if (password.value != confirmPassword.value | password.value.length <6 ){
        password.style.border = '1px solid red'
        confirmPassword.style.border = '1px solid red'
        invalid2.style.display = 'block'
    }
    else{
        password.style.border = '1px solid green'
        confirmPassword.style.border = '1px solid green'
        invalid2.style.display = 'none'
        invalid3.style.display = 'none'
        invalid4.style.display = 'none'
    }
}