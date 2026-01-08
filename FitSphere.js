let activities = JSON.parse(localStorage.getItem("activities")) || [];
let editIndex = null;

const activityBody = document.getElementById("activityBody");

const totalActivities = document.getElementById("totalActivities");
const completedActivities = document.getElementById("completedActivities");
const totalSteps = document.getElementById("totalSteps");
const totalMinutes = document.getElementById("totalMinutes");

document.getElementById("addActivityBtn").addEventListener("click", addActivity);

function addActivity() {
    const name = document.getElementById("activityName").value;
    const type = document.getElementById("activityType").value;
    const value = Number(document.getElementById("activityValue").value);
    const date = document.getElementById("activityDate").value;

    if (!name || !value || !date) {
        alert("Please fill all fields");
        return;
    }

    const activity = {
        name,
        type,
        value,
        date,
        completed: false
    };

    if (editIndex !== null) {
        activities[editIndex] = activity;
        editIndex = null;
    } else {
        activities.push(activity);
    }

    localStorage.setItem("activities", JSON.stringify(activities));
    clearForm();
    displayActivities();
}

function clearForm() {
    document.getElementById("activityName").value = "";
    document.getElementById("activityValue").value = "";
    document.getElementById("activityDate").value = "";
}

function displayActivities() {
    activityBody.innerHTML = "";

    let completedCount = 0;
    let steps = 0;
    let minutes = 0;

    activities.forEach((act, index) => {
        if (act.completed) completedCount++;
        if (act.type === "Steps") steps += act.value;
        if (act.type !== "Steps") minutes += act.value;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${act.name}</td>
            <td>${act.type}</td>
            <td>${act.value}</td>
            <td>${act.date}</td>
            <td class="${act.completed ? 'completed' : ''}">
                ${act.completed ? "Completed" : "Pending"}
            </td>
            <td>
                <button class="action-btn complete-btn" onclick="toggleComplete(${index})">
                    ✔
                </button>
                <button class="action-btn delete-btn" onclick="deleteActivity(${index})">
                    ✖
                </button>
            </td>
        `;

        activityBody.appendChild(row);
    });

    totalActivities.textContent = activities.length;
    completedActivities.textContent = completedCount;
    totalSteps.textContent = steps;
    totalMinutes.textContent = minutes;
}

function toggleComplete(index) {
    activities[index].completed = !activities[index].completed;
    localStorage.setItem("activities", JSON.stringify(activities));
    displayActivities();
}

function deleteActivity(index) {
    if (confirm("Delete this activity?")) {
        activities.splice(index, 1);
        localStorage.setItem("activities", JSON.stringify(activities));
        displayActivities();
    }
}

displayActivities();
