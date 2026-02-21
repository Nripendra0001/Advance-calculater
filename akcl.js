let currentInput = '0';
let isGramMode = false; 

function updateDisplay() {
    const display = document.getElementById('main-display');
    display.innerText = currentInput;
}

function updateRateDisplay() {
    let rate = document.getElementById('item-price').value;
    document.getElementById('sub-display').innerText = rate ? `Rate: ₹${rate}/kg` : "Rate Set Karein...";
}

function toggleMode() {
    isGramMode = !isGramMode;
    const btn = document.getElementById('mode-text');
    btn.innerText = isGramMode ? "Mode: Gram se ₹ Nikalein" : "Mode: ₹ se Gram Nikalein";
    btn.style.backgroundColor = isGramMode ? "#ff9f43" : "#00d1b2";
}

function appendNumber(num) {
    if (currentInput === '0') currentInput = num;
    else currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    const lastChar = currentInput.slice(-1);
    if (['+','-','*','/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}

function calculate() {
    let rate = parseFloat(document.getElementById('item-price').value);
    let rawValue;

    try {
        rawValue = eval(currentInput); // Pehle calculation solve karega (e.g. 10+20 = 30)
    } catch (e) {
        currentInput = "Error";
        updateDisplay();
        return;
    }

    if (rate > 0) {
        if (!isGramMode) {
            // ₹ se Gram Calculation
            let grams = (rawValue / rate) * 1000;
            currentInput = grams.toFixed(1) + " g";
        } else {
            // Gram se ₹ Calculation
            let price = (rawValue / 1000) * rate;
            currentInput = "₹" + price.toFixed(2);
        }
    } else {
        // Normal Calculator
        currentInput = rawValue.toString();
    }

    updateDisplay();
    // Agli bar typing shuru karte hi purana result hat jaye
    setTimeout(() => { currentInput = '0'; }, 3000); 
}