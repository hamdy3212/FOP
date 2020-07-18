
const done = document.getElementById('done');
const pending = document.getElementById('pending');
document.getElementById("givenTasksButton").classList.add("active");
let i = 0;
const res = fetch("givenTasks/data", {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
    .then(response => response.json())
    .then(tasks => {
        for (const task of tasks) {
            const card = document.createElement('div'),
                cardHeader = document.createElement('button'),
                cardBody = document.createElement('div'),
                cardTitle = document.createElement('h5'),
                cardText = document.createElement('p'),
                cardFooter = document.createElement('div'),
                cardCollapse = document.createElement('div');
            cardCollapse.classList.add("collapse");
            cardCollapse.setAttribute("id", `cardContent${i}`);
            cardHeader.setAttribute("data-toggle", "collapse");
            cardHeader.setAttribute("data-target", `#cardContent${i}`);
            cardHeader.setAttribute("aria-expanded", "false");
            cardHeader.setAttribute("aria-controls", `cardContent${i}`);
            cardHeader.setAttribute("type", "button");
            card.classList.add("card", "shadow", "pending", "mb-2")
            cardText.classList.add("card-text");
            cardBody.classList.add("card-body");
            cardFooter.classList.add("card-footer");
            cardText.textContent = task.description;
            cardHeader.textContent = task.title
            cardTitle.textContent = "Task to " + task.assignee;
            cardFooter.textContent = task.deadline;
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            cardCollapse.append(cardBody);
            cardCollapse.append(cardFooter);
            card.append(cardHeader);
            card.append(cardCollapse);
            if (task.status == "pending"){
                cardHeader.classList.add("btn", "btn-warning");
                pending.append(card);
            }else{
                cardHeader.classList.add("btn", "btn-success");
                done.append(card);
            }
            i++;
        }
    });