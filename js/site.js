function displayMessage() {
// get the text out of the input and assign it to a variable
    let msg = document.getElementById('message').value;


 Swal.fire(
    {
        backdrop: false,
        title: 'APP NAME',
        text: msg,  //replace this with that variable
    }
 );

}