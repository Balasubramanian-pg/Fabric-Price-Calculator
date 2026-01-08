const PRICES = {
    payg: { F2: 0.36, F4: 0.72, F8: 1.44, F16: 2.88, F32: 5.76 },
    reserved: { F2: 0.21, F4: 0.42, F8: 0.84, F16: 1.68, F32: 3.36 }
};

const USD_TO_INR = 83;

let lastUSD = 0;
let currentCurrency = "USD";

const hoursSlider = document.getElementById("hours");
const hoursLabel = document.getElementById("hoursLabel");

hoursSlider.oninput = () => {
    hoursLabel.textContent = `${hoursSlider.value} hrs`;
};

function calculate() {
    const sku = document.getElementById("sku").value;
    const model = document.getElementById("model").value;
    const hours = Number(hoursSlider.value);

    lastUSD = PRICES[model][sku] * hours;
    currentCurrency = "USD";

    updatePrice(lastUSD, "$", "USD / month");
    activateValueCards(Number(sku.replace("F", "")));
    updatePitch(sku);
}

function toggleCurrency() {
    if (!lastUSD) return;

    if (currentCurrency === "USD") {
        updatePrice(lastUSD * USD_TO_INR, "₹", "INR / month");
        currentCurrency = "INR";
    } else {
        updatePrice(lastUSD, "$", "USD / month");
        currentCurrency = "USD";
    }
}

function updatePrice(value, symbol, label) {
    document.getElementById("price").textContent = `${symbol}${value.toFixed(2)}`;
    document.getElementById("currency").textContent = label;
}

function activateValueCards(cu) {
    document.querySelectorAll(".value-card").forEach(card => {
        const min = Number(card.dataset.min);
        card.classList.toggle("active", cu >= min);
    });
}

function updatePitch(sku) {
    const copy = {
        F2: "Designed for controlled departmental BI with minimal operational overhead.",
        F4: "Supports shared team analytics, semantic models, and scheduled refresh cycles.",
        F8: "A full business-unit analytics platform combining warehouse and lakehouse capabilities.",
        F16: "An enterprise-grade BI foundation enabling cross-domain reporting and governance.",
        F32: "Built for scale, concurrency, and high-frequency analytics workloads."
    };
    document.getElementById("pitch").textContent = copy[sku];
}
