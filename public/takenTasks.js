
const done = document.getElementById('done');
const pending = document.getElementById('pending');
document.getElementById("takenTasksButton").classList.add("active");


const res = fetch("takenTasks/data", {
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
                cardButton = document.createElement('a'),
                cardFooter = document.createElement('div');
            card.classList.add("card", "shadow", "pending")
            cardHeader.classList.add("card-header");
            cardText.classList.add("card-text");
            cardBody.classList.add("card-body");
            cardButton.classList.add("card-button", "btn", "btn-success");
            cardFooter.classList.add("card-footer");
            cardText.textContent = task.description;
            cardHeader.textContent = "Task from " + task.author.username;
            cardTitle.textContent = task.title;
            cardButton.textContent = "Done";
            cardFooter.textContent = task.deadline;
            cardButton.setAttribute("href", "/tasks/takenTasks");
            cardButton.addEventListener("click", async () => {
                await fetch("editstatus", {
                    method: 'PUT',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'manual',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(task)
                })
            });
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            cardBody.append(cardButton);
            card.append(cardHeader);
            card.append(cardBody);
            card.append(cardFooter);
            if (task.status == "pending") pending.append(card);
            if (task.status == "done") done.append(card);
        }
    });