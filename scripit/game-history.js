document.addEventListener("DOMContentLoaded", async () => {
    try {

        await createHistoryTable();
        createUserProfile();
    } catch (error) {
        console.error("Initialization failed:", error);
    }
    const userId = localStorage.getItem("userId");
    console.log("User ID from localStorage:", userId);

});
function createUserProfile() {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;

    const email = localStorage.getItem("userEmail") || "user@example.com";


    sidebar.innerHTML = `
        <div class="profile-section">
            <h3 class="profile-title">User Profile</h3>
            <div class="profile-card">
                <span class="profile-label">Email</span>
                <p class="profile-email">${email}</p>
            </div>
            <button id="logoutBtn" class="logout-btn">Logout</button>
        </div>
    `;


    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("mode");
        window.location.href = "Sign-in.html";
    });
}




async function createHistoryTable() {
    function getDifficultyName(rows) {
        switch (rows) {
            case 6: return "Easy";
            case 4: return "Medium";
            case 3: return "Hard";
            default: return "-";
        }
    }
    const container = document.querySelector(".score-table");


    const table = document.createElement("table");
    table.id = "historyTable";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");


    const headers = ["Date", "Result", "Word Length", "Difficulty", "Guesses", "Time Taken"];

    headers.forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    container.appendChild(table);

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
        const response = await fetch(`http://localhost:3000/api/auth/game/history/${userId}`);
        const games = await response.json();

        games.forEach(game => {
            const row = document.createElement("tr");


            const dateCell = document.createElement("td");
            dateCell.textContent = new Date(game.playedAt).toLocaleDateString();


            const resultCell = document.createElement("td");
            resultCell.textContent = game.result || "In Progress";

            const lengthCell = document.createElement("td");
            lengthCell.textContent = game.wordLength || game.currentWord?.length || "-";


            const diffCell = document.createElement("td");

            function getDifficultyName(rows) {
                switch (rows) {
                    case 6: return "Easy";
                    case 4: return "Medium";
                    case 3: return "Hard";
                    default: return "-";
                }
            }

            diffCell.textContent = getDifficultyName(game.difficultyLevel);


            const guessesCell = document.createElement("td");
            guessesCell.textContent = `${game.guesses.length} attempts`;


            const timeCell = document.createElement("td");
            timeCell.textContent = game.timeTaken ? `${game.timeTaken}s` : "-";

            row.append(dateCell, resultCell, lengthCell, diffCell, guessesCell, timeCell);
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}


