// Select DOM elements
const achievementForm = document.querySelector(".achievement-form");
const achievementInput = document.querySelector(".form-control");
const achievementList = document.querySelector(".achievement-items");

// Array to store achievements
let achievements = [];

// Load achievements from localStorage
function loadAchievements() {
    const storedAchievements = localStorage.getItem("achievements");
    if (storedAchievements) {
        achievements = JSON.parse(storedAchievements);
        renderAchievements();
    }
}

// Save achievements to localStorage
function saveAchievements() {
    localStorage.setItem("achievements", JSON.stringify(achievements));
}

// Add new achievement
function addAchievement(e) {
    e.preventDefault();

    const text = achievementInput.value.trim();
    if (text === "") return;

    const achievement = {
        id: Date.now(),
        text: text,
        completed: false,
    };

    achievements.push(achievement);
    saveAchievements();
    renderAchievements();

    achievementInput.value = "";
}

// Delete achievement
function deleteAchievement(id) {
    achievements = achievements.filter((achievement) => achievement.id !== id);
    saveAchievements();
    renderAchievements();
}

// Toggle achievement completion
function toggleAchievement(id) {
    achievements = achievements.map((achievement) => {
        if (achievement.id === id) {
            achievement.completed = !achievement.completed;
        }
        return achievement;
    });
    saveAchievements();
    renderAchievements();
}

// Render achievements list
function renderAchievements() {
    achievementList.innerHTML = "";

    achievements.forEach((achievement) => {
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";
        li.setAttribute("data-key", achievement.id);

        li.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="achievement${
                    achievement.id
                }" 
                    ${achievement.completed ? "checked" : ""}>
                <label class="form-check-label" for="achievement${
                    achievement.id
                }">
                    ${achievement.text}
                </label>
            </div>
            <button class="btn btn-danger btn-sm delete-button">
                <i class="bi bi-x"></i>
            </button>
        `;

        // Add event listeners to checkbox and delete button
        const checkbox = li.querySelector(".form-check-input");
        checkbox.addEventListener("change", () =>
            toggleAchievement(achievement.id)
        );

        const deleteButton = li.querySelector(".delete-button");
        deleteButton.addEventListener("click", () =>
            deleteAchievement(achievement.id)
        );

        achievementList.appendChild(li);
    });
}

// Event listeners
achievementForm.addEventListener("submit", addAchievement);

// Load achievements when page loads
document.addEventListener("DOMContentLoaded", loadAchievements);
