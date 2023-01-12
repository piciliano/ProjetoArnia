const questionsRendering = document.getElementById('rendering')
const modal = document.getElementById('modal')
const form = document.getElementById('subscribe')
let numberValue = document.getElementById('number')
let textValue = document.getElementById('text')
let dateValue = document.getElementById('date')
let selectValue = document.getElementById('status')
let button = document.getElementById('save')
let currentQuestion = null
let valueTemp = true

function changeTitle () {
    document.getElementById('adcTask').innerHTML = 'Editar tarefa'
}

const openModalDelet = (id) => {
    modalDelet.style.display = "block"   
    valueTemp = id
}
const closeModalDelet = () => {
    modalDelet.style.display = "none"
}
const openModal = () => {
    modal.style.display = "block"   
}
const closeModal = () => {
    modal.style.display = "none"
    document.getElementById("number").value= ''
    document.getElementById("text").value= ''
    document.getElementById("date").value=''
    document.getElementById("status").value='' 
    button.disabled = true
    button.classList.remove("btn-danger")
}
const getTask = async() => {
    const apiResponse = await fetch('http://localhost:3000/posts')
    const questions = await apiResponse.json()
    questionsRendering.innerHTML = ''
    questions.forEach(question => {
    let date = new Date(question.date)
    let dataFormatada = date.getDate() + 1 + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        
        questionsRendering.innerHTML = questionsRendering.innerHTML + `
        <tr>
            <td class="tableFormatColor" scope="row">${question.number}</th>
            <td class="tableFormatColor" >${question.text}</td>
            <td class="tableFormatColor" >${dataFormatada}</td>
            <td class="${question.stats.replace(" ", "-")}">${question.stats}</td>
            <td><button class="btenmodal" onclick="editTask(${question.id})">
            <img class="m-1" src="logo/lapis.svg">
            </button><button onclick="openModalDelet(${question.id})" class="btenmodal" ><img src="logo/lixeira.svg"></button></td>
        </tr>
        ` 
    })

}
const getQuestion = async (id) => {
    const apiResponse = await fetch(`http://localhost:3000/posts/${id}`)
    const question = await apiResponse.json()
    return question
    
}

const createTask = async (question) => {
    await fetch('http://localhost:3000/posts', {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    })   
}
const updateTask = async (id, question) => {
    await fetch(`http://localhost:3000/posts/${id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)   
    })
}
const saveTask = async (question) => {
    if(currentQuestion === null) {
        await createTask(question)
    }
    else {
        await updateTask(currentQuestion.id, question)
        currentQuestion = null
    }
    closeModal()
    getTask()
}
const deleteTask = async () => {
    await fetch(`http://localhost:3000/posts/${valueTemp}`, {
    method: 'DELETE'
    })
    getTask()
    modalDelet.style.display = "none"
    valueTemp = true
}
const editTask = async (id) => {
    currentQuestion = await getQuestion(id)
    document.getElementById('number').value = currentQuestion.number
    document.getElementById('text').value = currentQuestion.text
    document.getElementById('date').value = currentQuestion.date
    document.getElementById('status').value = currentQuestion.stats
    openModal()
    changeTitle ()
}
form.addEventListener('submit', (e) => {
    
    e.preventDefault()
    
    const number = form.elements['number'].value
    const text = form.elements['text'].value
    const date = form.elements['date'].value
    const stats = form.elements['stats'].value
    
    const question = {
        number,
        text,
        date,
        stats,
    }

    saveTask(question)
})
const checkValue = () => {
    if (numberValue.value === ""){
        button.disabled = true  
        button.classList.remove("btn-danger")                
    }
    else if (textValue.value ===""){
        button.disabled = true   
        button.classList.remove("btn-danger")            
    }
    else if (dateValue.value ===""){
        button.disabled = true  
        button.classList.remove("btn-danger")                 
    }
    else if (selectValue.value ===""){
        button.disabled = true   
        button.classList.remove("btn-danger")        
    }
    else {
        button.disabled = false
        button.classList.add("btn-danger")
        button.classList.remove("btnfixed")        
    }   
}

// Dark mode --------------------------------------

const html = document.querySelector('html')
const changeBtn = document.querySelector('#change-theme')

function toggleDark(){
    html.classList.toggle("dark-mode")
}
function loadTheme(){
    const darkMode = localStorage.getItem("dark-mode")

    if(darkMode){
        toggleDark()
        changeBtn.checked = true
    }
}
loadTheme()

changeBtn.addEventListener("change", function(){
    toggleDark()

    localStorage.removeItem("dark-mode")

    if(html.classList.contains("dark-mode")){
        localStorage.setItem("dark-mode",1);
    }
}) 

// BUSCA 

const busca = document.getElementById('search')
const buscar = document.getElementById('rendering')

busca.addEventListener('keyup',() =>{
    let key = busca.value.toLowerCase()
    let lines = buscar.getElementsByTagName('tr')
    

    for (let posicao in lines) {
        if (true === isNaN (posicao)){
            continue
        } 

        let conteudoLine = lines[posicao].innerHTML.toLowerCase();

        if (true === conteudoLine.includes(key)) {
            lines[posicao].style.display = ''
        }
        else {
            lines[posicao].style.display = 'none'
        }
    }
})


function busquei () {
    busca.style.visibility = 'visible'

}