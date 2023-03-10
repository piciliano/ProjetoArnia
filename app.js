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
function changeTitleTask () {
    document.getElementById('adcTask').innerHTML = 'Adicionar nova Tarefa'
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
    changeTitleTask ()
}

// 3-
const getTask = async() => {
    const apiResponse = await fetch('https://projeto-arnia.herokuapp.com/posts')
    const questions = await apiResponse.json()
    questionsRendering.innerHTML = ''
    questions.forEach(question => {
    const dataFormatada = alterarData(question.date)
        
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
function alterarData(data){
    let dataTarefa = new Date(data.split('-').join('/'));
    return dataTarefa.toLocaleDateString('pt-BR');
}

// 3-

// 4-
const getQuestion = async (id) => {
    const apiResponse = await fetch(`https://projeto-arnia.herokuapp.com/posts/${id}`)
    const question = await apiResponse.json()
    return question
    
}
// 4-



// 2-
const createTask = async (question) => {
    await fetch('https://projeto-arnia.herokuapp.com/posts', {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    })   
}
// 2-

const updateTask = async (id, question) => {
    await fetch(`https://projeto-arnia.herokuapp.com/posts/${id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)   
    })
}

// 3-
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
// 3-
const deleteTask = async () => {
    await fetch(`https://projeto-arnia.herokuapp.com/posts/${valueTemp}`, {
    method: 'DELETE'
    })
    getTask()
    modalDelet.style.display = "none"
    valueTemp = true
}

// 5-
const editTask = async (id) => {
    currentQuestion = await getQuestion(id)
    document.getElementById('number').value = currentQuestion.number
    document.getElementById('text').value = currentQuestion.text
    document.getElementById('date').value = currentQuestion.date
    document.getElementById('status').value = currentQuestion.stats
    openModal()
    changeTitle ()
}
// 5-

// 1- 
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
// 1-
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
