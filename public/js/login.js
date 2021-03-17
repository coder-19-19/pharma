window.addEventListener('load', () => {
    const email = $('#email')
    const password = $('#password')
    const loginForm = $('#loginForm')

    loginForm.on('submit', (e) => {
        if(!email.val()){
            Swal.fire({
                icon: 'error',
                title: 'Emailinizi daxil edin',
              })
              e.preventDefault()
        }
        else if(!password.val()){
            Swal.fire({
                icon: 'error',
                title: 'Şifrənizi daxil edin',
              })
              e.preventDefault()
        }

    })
})