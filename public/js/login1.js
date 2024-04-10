let loginBtn = document.querySelector('.loginBtn');

loginBtn.addEventListener('click', () => {
    let userType = document.querySelector('#userType');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    if(!email.value.length || !password.value.length){
        showFormError('fill all the inputs')
    } else{
        // submit form
        sendData('/login', {
            email: email.value,
            password: password.value,
            userType: userType.value
        })
    }

})