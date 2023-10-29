// get the trems of the loan to calculagte and validate them
function getValues() {
    let principal  = document.getElementById('loanAmount').value;
    let term = document.getElementById('loanTerm').value;
    let interest = document.getElementById('interestRate').value;

    principal = parseInt(principal);
    term = parseInt(term);
    interest = parseFloat(interest);

    if (isNaN(principal) || isNaN(term) || isNaN(interest) || principal <= 0 || term <= 0 || interest <= 0){
        Swal.fire({
            icon:'error',
            backdrop: false,
            title: 'Oops',
            text: 'Please enter valid numbers for your loan'
        })
    } else {

        let totals = calculateTotals(principal, term, interest);
        displayTotals(totals);

        let payments = calculatePayments(principal, term, interest, totals.monthlyPayment);
        displayPayments(payments);
      
    }

}

// calculate the totals for the loan
function calculateTotals (principal, term, rate){

    let monthlyPayment = (principal * (rate/1200)) / (1 - Math.pow(1 + rate/1200, -term));
    let totalCost = monthlyPayment * term;
    let totalInterest = totalCost - principal;

    // return an object with all the totals
    let loanTotals = {
        monthlyPayment: monthlyPayment,
        totalCost: totalCost,
        totalInterest: totalInterest, 
        totalPrincipal: principal       
    }

    return loanTotals;

}


// calculate each month of the loan
function calculatePayments(principal, term, rate, monthlyPayment){
    let balance = principal;
    let totalInterest = 0;
    let paymentsArray = [];
    

// for lopp to go through all of the months
for (let month = 1; month <= term; month += 1){

    let interestPayment = balance * (rate / 1200);
    let principalPayment = monthlyPayment - interestPayment;
    balance = balance - principalPayment;
    totalInterest = totalInterest + interestPayment;

//   put the calculations of each monht into an object
    let paymentObj = {
        month: month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        totalInterest: totalInterest,
        balance: balance
    };

//   put that object into an array

    paymentsArray.push(paymentObj);
}

// return an array of objects

return paymentsArray;

}

// display the totals for the loan
function displayTotals(totals){
    let format = {
        style: 'currency',
        currency: 'USD'
    }

    document.getElementById('monthly-payment').textContent = totals.monthlyPayment.toLocaleString('en-US', format);
    document.getElementById('total-principal').textContent = totals.totalPrincipal.toLocaleString('en-US', format);
    document.getElementById('total-interest').textContent = totals.totalInterest.toLocaleString('en-US',  format);
    document.getElementById('total-cost').textContent = totals.totalCost.toLocaleString('en-US', format);
}   



function displayPayments(paymentsArr){
    let format = {
        style: 'currency',
        currency: 'USD'
    }

    // accept array from 
    const tableRowTemplate = document.getElementById('monthlyPaymentTemplate');
    const paymentsTable = document.getElementById('paymentsTable');


    for (let i = 0; i < paymentsArr.length; i++){
        let payment = paymentsArr[i];

        let tableRow = tableRowTemplate.content.cloneNode(true);

        let tableCells = tableRow.querySelectorAll('td');

        // tableCells[0].textContent = payment.month;
        tableCells[1].textContent = payment.monthlyPayment;
        // tableCells[2].textContent = payment.principal;
        // tableCells[3].textContent = payment.interest;
        // tableCells[4].textContent = payment.totalInterest;
        // tableCells[5].textContent = payment.balace;

        paymentsTable.appendChild(tableRow);

    }


}



// display the month in a table
