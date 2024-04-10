const sendData = (path, data) => {
    console.log(data);
    fetch(path, {
        method: 'post',
        headers: new Headers({'Content-Type' : 'application/json'}),
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => processData(data));
}

const processData = (data) => {
    console.log(data);
    
    // if(data.userType.value == admin){
    //     let user = JSON.parse(sessionStorage.user);
    //     sessionStorage.user = JSON.stringify(user);
    //     location.replace('/index');
    // } else if(data.userType.value == employee){
    //     let user = JSON.parse(sessionStorage.user);
    //     sessionStorage.user = JSON.stringify(user);
    //     location.replace('/addEmployee');
    // } else if(data.userType.value == hr){
    //     sessionStorage.user = JSON.stringify(data);
    //     location.replace('/index');
    // }
}

const showFormError = (err) => {
    let errorEle = document.querySelector('.error');
    errorEle.innerHTML = err;
    errorEle.classList.add('show');

    setTimeout(() => {
        errorEle.classList.remove('show');
    }, 2000)
}