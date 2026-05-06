const API_URL = "http://universities.hipolabs.com/search?country=Romania";
const status = document.getElementById("status");
const tbody = document.getElementById("tbody");
const qInput = document.getElementById("q");
let all = [];

function setStatus(text) {
    status.textContent = text;
}

function render(data) {
    tbody.innerHTML = data.map(u => {
        const site = u.web_pages?.[0] 
            ? `<a href="${u.web_pages[0]}" target="_blank">${u.web_pages[0]}</a>` 
            : "";
        return `
        <tr>
            <td>${u.name || ""}</td>
            <td>${u.country || ""}</td>
            <td>${site}</td>
        </tr>
        `;
    }).join("");
}

function exportCSV(data) {
    if (!data.length) return alert("No data to export.");

    const header = ["Name", "Country", "Website"];
    const rows = data.map(u => [
        u.name || "",
        u.country || "",
        (u.web_pages && u.web_pages[0]) || ""
    ]);

    const csvContent = [header, ...rows]
        .map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "universities.csv";
    a.click();
    URL.revokeObjectURL(url);
}

async function loadUniversities() {
    setStatus("Loading...");
    tbody.innerHTML = "";
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        all = data;
        render(all);
        setStatus(`Loaded (${all.length} results).`);
    } catch {
        setStatus("Loading error. Please try again.");
    }
}


qInput.addEventListener("input", () => {
    const q = qInput.value.trim().toLowerCase();
    const filtered = q 
        ? all.filter(u => (u.name || "").toLowerCase().includes(q)) 
        : all;
    
    render(filtered);
    setStatus(`Filtered: ${filtered.length} of ${all.length}.`);
});

document.getElementById("exportCsv").addEventListener("click", () => {
    const q = qInput.value.trim().toLowerCase();
    
    const currentData = q 
        ? all.filter(u => (u.name || "").toLowerCase().includes(q))
        : all;
        
    exportCSV(currentData);
});

loadUniversities();