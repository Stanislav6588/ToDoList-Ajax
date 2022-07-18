'use strict'

class Todo{
	constructor({notComplite, complite}){
		this.notComplite = document.querySelector(notComplite);
		this.complite = document.querySelector(complite);
	}

getJSON(){
	const requestUrl = 'https://jsonplaceholder.typicode.com/todos';
	const request = new XMLHttpRequest();
	request.addEventListener('readystatechange', (event) => {
		if(request.readyState === 4 && request.status === 200){
			const data = JSON.parse(request.responseText);
			let dataSort = data.filter((i) => i.userId == 1);
			this.createElement(dataSort);
		}
	})
	request.open('GET', requestUrl);
	request.setRequestHeader('Content-type', 'application/json');
	request.send();
}

createElement(dataSort){
	console.dir(dataSort);
	dataSort.forEach((i) => {
		if(i.completed){
			this.createTaskComplited(i.title);
		}
		if(!i.completed){
			this.createTaskNotComplited(i.title);
		}
	})
}

createTask(i){
	return `
	<div class="task">
	<div class="check"></div>
	<input class="input" type="text" placeholder="Додати завдання" value="${i}">
	<div class="option"></div>
</div>
	`
}

createTaskNotComplited(i){
	this.notComplite.insertAdjacentHTML('beforeend', this.createTask(i));
	const notComplite = this.notComplite.querySelector('.task');
	const option = this.notComplite.querySelectorAll('.option');
	notComplite.className = 'taskNotComplite';
	option.forEach((i) => i.className = 'option plusIcon');
}

createTaskComplited(i){
	this.complite.insertAdjacentHTML('beforeend', this.createTask(i));
	const complite = this.complite.querySelector('.task');
	const option = this.complite.querySelectorAll('.option');
	const check = this.complite.querySelectorAll('.check');
	option.forEach((i) => i.className = 'option minusIcon');
	complite.className = 'taskComplite';
	check.forEach((i) => i.className = 'check checkIcon');
}

createNewTask(){
	this.notComplite.addEventListener('click', (el) => {
		let t = el.target;
		let clone = t.parentElement.cloneNode(true);
		if(t.className == 'option plusIcon'){
			clone.children[1].value = "";
			this.notComplite.append(clone);
		}
		if(t.className == 'check' && t.parentNode.parentNode.children.length > 2){
				clone.children[0].classList.add('checkIcon');
				clone.children[1].readOnly = 'true';
				clone.children[1].style.backgroundColor = '#fafafa'
				clone.children[2].classList.remove('plusIcon');
				clone.children[2].classList.add('minusIcon');
				this.complite.append(clone);
				t.parentElement.remove();
				clone.className = 'taskComplite';
		}
	})
}

removeTask(){
	this.complite.addEventListener('click', (el) => {
		let t = el.target;
		if(t.className == 'option minusIcon'){
			t.parentElement.remove();
		}
	})
}

init(){
	this.getJSON();
	this.createNewTask();
	this.removeTask();
}
}
