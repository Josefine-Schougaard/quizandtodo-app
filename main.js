// for navigation
const homenav = document.querySelector('#home');
const quiznav = document.querySelector('#quiz');
const todonav = document.querySelector('#todo');
const homesec = document.querySelector('.home');
const todosec = document.querySelector('.todo-section');
const quizsec = document.querySelector('.quiz-section');


homenav.addEventListener('click', e =>{
    homenav.classList.add('active');
    homesec.classList.remove('d-none');

    quiznav.classList.remove('active');
    quizsec.classList.add('d-none');

    todonav.classList.remove('active');
    todosec.classList.add('d-none')
});

quiznav.addEventListener('click', e=>{
    homenav.classList.remove('active');
    homesec.classList.add('d-none');

    quiznav.classList.add('active');
    quizsec.classList.remove('d-none');

    todonav.classList.remove('active');
    todosec.classList.add('d-none')
});

todonav.addEventListener('click', e=>{
    homenav.classList.remove('active');
    homesec.classList.add('d-none');

    quiznav.classList.remove('active');
    quizsec.classList.add('d-none');

    todonav.classList.add('active');
    todosec.classList.remove('d-none')
});

// js for quiz
const correctAnswers = ['B', 'A', 'B', 'B'];
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.result');

form.addEventListener('submit', e =>{
    e.preventDefault();

    let score = 0;
    const userAnswers = [form.q1.value,form.q2.value,form.q3.value,form.q4.value]; // form.q1.value peger på values der vælges i q1 spørgsmålet og propper valuen af svaret ind i arrayet

    //check answers
    userAnswers.forEach((answer, index) =>{
        if(answer === correctAnswers[index]){
            score += 25;
        }
    });
    
    //show result on page
    scrollTo(top);
    result.classList.remove('d-none');

    let output = 0;
    const timer = setInterval(() =>{
        result.querySelector('span').textContent = `${output}%`;
        if(output === score){
            clearInterval(timer);
        }
        else{
            output++
        }
    }, 10);
});

// js for todo
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos')
const search = document.querySelector('.search input');

//add to list
const generateTemplate = todo =>{
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="fas fa-trash-alt delete"></i>
        </li>
    `;
    list.innerHTML += html;
}

addForm.addEventListener('submit', e=>{
    e.preventDefault();
    const todo = addForm.add.value.trim();// trim() trims whitespace on strings
    
    if(todo.length){
        generateTemplate(todo);
        addForm.reset();//resets the inputfields
    };
});

//delete todos
list.addEventListener('click', e=>{
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});

//search todos
const filterTodos = (term) =>{
    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));
}

search.addEventListener('keyup',e=>{
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});