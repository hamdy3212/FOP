
const done = document.getElementById('done');
const pending = document.getElementById('pending');
document.getElementById("takenTasksButton").classList.add("active");
let i = 0;

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
                cardHeader = document.createElement('button'),
                cardBody = document.createElement('div'),
                cardTitle = document.createElement('h5'),
                cardText = document.createElement('p'),
                cardButton = document.createElement('a'),
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
            cardTitle.textContent = "Task from " + task.author.username;
            cardFooter.textContent = task.deadline.split("T", 1);
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
            cardCollapse.append(cardBody);
            cardCollapse.append(cardFooter);
            card.append(cardHeader);
            card.append(cardCollapse);
            if (task.status == "pending") {
                cardButton.classList.add("card-button", "btn", "btn-success");
                cardHeader.classList.add("btn", "btn-warning");
                cardButton.textContent = "Done";
                pending.append(card);
            } else {
                cardButton.classList.add("card-button", "btn", "btn-danger");
                cardHeader.classList.add("btn", "btn-success");

                cardButton.textContent = "Undone";
                done.append(card);
            }
            i++;

        }
    });