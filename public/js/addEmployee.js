let formBtn = document.querySelector('.submit-btn');

formBtn.addEventListener('click', () => {
    let fullname = document.querySelector('#name');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let number = document.querySelector('#number');
    let department = document.querySelector('#department');
    let position = document.querySelector('#position');
    let address = document.querySelector('#address');
    let gender = document.querySelector('#gender');
    let userType = document.querySelector('#userType');

    if(fullname != null){// singup page
        if(fullname.value.length < 3){
            showFormError('name must be 3 letters long');
        } else if(!email.value.length){
            showFormError('enter your email');
        } else if(password.value.length < 8){
            showFormError('password must be 8 letters long');
        } else if(Number(number) || number.value.length < 10){
            showFormError('invalid number, please enter valid one');
        } else{
            // submit form
            sendData('/addEmployee', {
                name: fullname.value,
                email: email.value,
                password: password.value,
                number: number.value,
                department: department.value,
                position: position.value,
                address: address.value,
                gender: gender.value,
                userType: userType.value
            })
            location.replace('/index');
        }
    } else{
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
    }
    
})