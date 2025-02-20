// const API_BASE = "http://localhost:5000/api/players";
const submitButton = document.getElementById("submitBtn");

// Add or Update Player
document.getElementById("playerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const playerId = document.getElementById("playerId").value.trim();
    const playerData = {
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        photoUrl: document.getElementById("photoUrl").value,
        birthplace: document.getElementById("birthplace").value,
        careerInfo: document.getElementById("careerInfo").value,
        matches: document.getElementById("matches").value,
        score: document.getElementById("score").value,
        fitness: document.getElementById("fitness").value,
        centuries: document.getElementById("centuries").value,
        wickets: document.getElementById("wickets").value,
        average: document.getElementById("average").value
    };

    try {
        if (playerId) {
            // Update existing player
            await axios.put(`/api/players/update/${playerId}`, playerData);
            alert("Player updated successfully!");
        } else {
            // Add new player
            await axios.post(`/api/players/add`, playerData);
            alert("Player added successfully!");
        }
    } catch (error) {
        console.error("Error saving player:", error);
        alert("Error saving player!");
    } finally {
        document.getElementById("playerId").value = "";
        document.getElementById("playerForm").reset();
        submitButton.textContent = "Submit";
    }
});

// Search Player by Name
async function searchPlayer() {
    const searchName = document.getElementById("searchName").value;
    if (!searchName) return alert("Please enter a player name");

    try {
        const response = await axios.get(`/api/players/search?name=${searchName}`);
        displayPopup(response.data);
    } catch (error) {
        console.error("Error searching player:", error);
        alert("Player not found!");
    } finally {
        document.getElementById("searchName").value = "";
    }
}

// Display Player Details in Popup
function displayPopup(player) {

    document.getElementById("bio").innerHTML = `
        <div class="bio-content">
            
            <div class="bio-text">
                <img src="${player.photoUrl}" alt="Player Photo" class="player-photo">
                <p><strong>Name:</strong> ${player.name}</p>
                <p><strong>DOB:</strong> ${player.dob}</p>
                <p><strong>Birthplace:</strong> ${player.birthplace}</p>
                <p><strong>Fitness:</strong> ${player.fitness}</p>
                <p><strong>Matches:</strong> ${player.matches}</p>
                <p><strong>Score:</strong> ${player.score}</p>
                <p><strong>Centuries:</strong> ${player.centuries}</p>
                <p><strong>Wickets:</strong> ${player.wickets}</p>
                <p><strong>Average:</strong> ${player.average}</p>
            </div>
        </div>
    `;

    document.getElementById("career").innerHTML = `
        <p><strong>Career Info:</strong> ${player.careerInfo}</p>
    `;

    document.getElementById("playerPopup").style.display = "block";
    document.getElementById("playerId").value = player.id;

}

//  Close Popup
function closePopup() {
    document.getElementById("playerPopup").style.display = "none";
}

// Edit Player (Populate Form with Existing Data)
async function editPlayer() {
    const playerId = document.getElementById("playerId").value;
    console.log(playerId);
    if (!playerId) {
        alert("No player selected for editing.");
        return;
    }

    try {
        const response = await axios.get(`/api/players/search/${playerId}`);
        const player = response.data;

        document.getElementById("name").value = player.name;
        document.getElementById("dob").value = player.dob;
        document.getElementById("photoUrl").value = player.photoUrl;
        document.getElementById("birthplace").value = player.birthplace;
        document.getElementById("careerInfo").value = player.careerInfo;
        document.getElementById("matches").value = player.matches;
        document.getElementById("score").value = player.score;
        document.getElementById("fitness").value = player.fitness;
        document.getElementById("centuries").value = player.centuries;
        document.getElementById("wickets").value = player.wickets;
        document.getElementById("average").value = player.average;

        submitButton.textContent = "Update";
        closePopup();
    } catch (error) {
        console.error("Error fetching player:", error);
        alert("Error fetching player for editing.");
    }
}
