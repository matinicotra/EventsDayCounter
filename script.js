let events = [];
let arr = []; //cargar info

const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const buttonAdd = document.querySelector("#btnAdd");
const eventsContainer = document.querySelector("#eventsContainer");


const json = load();

try {
    arr = JSON.parse(json);
} 
catch (error) {
    arr = [];
}
events = arr ? [...arr] : [];

renderEvents();


document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addEvent();
});

buttonAdd.addEventListener("click", (e) => {
    e.preventDefault();
    addEvent();
});

function addEvent() {
    if (eventName.value == "" || eventDate.value == "") { 
        return;
    }

    if (dateDiff(eventDate.value) < 0 ) {
        return;
    }

    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value,
    };

    events.unshift(newEvent);   // unshift agrega un elemento al inicio del arreglo

    save(JSON.stringify(events));

    eventName.value = "";

    renderEvents();
}

function dateDiff(date) {
    const targetDate = new Date(date);
    const actualDate = new Date();
    const difference = targetDate.getTime() - actualDate.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

function renderEvents() {
    const eventsHTML = events.map(event => {
        return `
            <div class="event">
                <div class="days">
                    <span class="days-number">${dateDiff(event.date)}</span>
                    <span class="days-text">Days</span>
                </div>
                <div class="event-name">${event.name}</div>
                <div class="event-name">${event.date}</div>
                <div class="actions">
                    <button class="btnDelete" data-id="${event.id}">Delete</button>
                </div>
            </div>
        `;

    });

    eventsContainer.innerHTML = eventsHTML.join("");

    document.querySelectorAll(".btnDelete").forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = button.getAttribute("data-id");
            events = events.filter((event) => event.id != id);
            save(JSON.stringify(events));
            renderEvents();
        })
    })
}

function save(data) {
    localStorage.setItem("items", data);
}

function load() {
    return localStorage.getItem("items");
}