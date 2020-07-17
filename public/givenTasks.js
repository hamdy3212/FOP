
const done = document.getElementById('done');
const pending = document.getElementById('pending');
document.getElementById("givenTasksButton").classList.add("active");

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
                cardHeader = document.createElement('div'),
                cardBody = document.createElement('div'),
                cardTitle = document.createElement('h5'),
                cardText = document.createElement('p'),
                cardFooter = document.createElement('div');
            card.classList.add("card", "shadow", "pending")
            cardHeader.classList.add("card-header");
            cardText.classList.add("card-text");
            cardBody.classList.add("card-body");
            cardFooter.classList.add("card-footer");
            cardText.textContent = task.description;
            cardHeader.textContent = "Task to " + task.assignee;
            cardTitle.textContent = task.title;
            cardFooter.textContent = task.deadline;
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            card.append(cardHeader);
            card.append(cardBody);
            card.append(cardFooter);
            if (task.status == "pending") pending.append(card);
            if (task.status == "done") done.append(card);
        }
    });