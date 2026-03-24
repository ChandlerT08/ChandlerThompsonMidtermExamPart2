
document.getElementById("calcButton").addEventListener("click", calculateAmortization);

function calculateAmortization(){
    const initialLoanAmount = Number(document.getElementById("initialLoanAmount").value);
    const downPayment = Number(document.getElementById("downPayment").value)/100;
    const loanTerm = Number(document.getElementById("loanTerm").value);

    console.log(initialLoanAmount, downPayment, loanTerm);
    
    if(loanTerm != 15 && loanTerm != 30){
        window.alert("You entered an invalid loan term, please enter either 15 or 30 years");
        return;
    }

    // Initial calculations
    let principalLoanAmount = initialLoanAmount - (downPayment * initialLoanAmount);
    let fixedAnnualInterestRate = 0.0575;
    let monthlyInterestRate = fixedAnnualInterestRate/12;
    let totalMonths = loanTerm * 12;
    let monthlyPayment = ((monthlyInterestRate * principalLoanAmount) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths))).toFixed(2);
    let totalInterestPaid = (monthlyPayment * totalMonths) - principalLoanAmount;
    let totalLoanCost = principalLoanAmount + totalInterestPaid;


    // Display Results
    const resultDisplay = document.getElementById("resultDisplay");

    let loanTermParagraph = document.createElement("p");
    resultDisplay.appendChild(loanTermParagraph);
    loanTermParagraph.innerHTML = "Loan Term: " + loanTerm + " Years";

    let annualInterestParagraph = document.createElement("p");
    resultDisplay.appendChild(annualInterestParagraph);
    annualInterestParagraph.innerHTML = "Interest Rate: 5.75%";

    let monthlyInterestParagraph = document.createElement("p");
    resultDisplay.appendChild(monthlyInterestParagraph);
    monthlyInterestParagraph.innerHTML = "Monthly Interest Rate: " + monthlyInterestRate + "%";

    let principalAmountParagraph = document.createElement("p");
    resultDisplay.appendChild(principalAmountParagraph);
    principalAmountParagraph.innerHTML = "Principal Amount: $" + principalLoanAmount.toFixed(2);

    let totalInterestParagraph = document.createElement("p");
    resultDisplay.appendChild(totalInterestParagraph);
    totalInterestParagraph.innerHTML = "Total Interest Paid: $" + totalInterestPaid.toFixed(2);

    let totalLoanParagraph = document.createElement("p");
    resultDisplay.appendChild(totalLoanParagraph);
    totalLoanParagraph.innerHTML = "Total Loan Cost: $" + totalLoanCost.toFixed(2);

    let monthlyPaymentParagraph = document.createElement("p");
    resultDisplay.appendChild(monthlyPaymentParagraph);
    monthlyPaymentParagraph.innerHTML = "Monthly Payment: $" + monthlyPayment;

    // The actual schedule
    let amortizationSchedule = document.createElement("div");
    resultDisplay.appendChild(amortizationSchedule);
    amortizationSchedule.id = "amortizationSchedule";

    let remainingLoanBalance = principalLoanAmount;
    for(let i = 1; i < totalMonths + 1; i++){
        let interestPaid = (remainingLoanBalance * monthlyInterestRate).toFixed(2);
        let principalPaid = (monthlyPayment - interestPaid).toFixed(2);
        remainingLoanBalance = (remainingLoanBalance - principalPaid).toFixed(2);

        
        if(remainingLoanBalance < 0){
            remainingLoanBalance = (0).toFixed(2);
        }

        let monthInformation = document.createElement("p");
        amortizationSchedule.appendChild(monthInformation);
        monthInformation.innerHTML = "Payment: $" + monthlyPayment + ", Interest: $" + interestPaid + ", Principal: $" + principalPaid + ", Remaining Balance: $" + remainingLoanBalance;
    }

    let endParagraph = document.createElement("p");
    resultDisplay.appendChild(endParagraph);
    endParagraph.innerHTML = "This ends the Amortization Calculator...";
}