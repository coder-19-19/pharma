window.addEventListener('load', () => {
    const addBranch = $('#addBranch')
    const editBranch = $('#editBranch')
    const editId = $('#editId')
    const addName = $('#addName')
    const addAddress = $('#addAddress')
    const delBranch = $('#delBranch')
    addBranch.on('submit', (e) => {
        if(!addName.val()){
            Swal.fire({
                icon: 'error',
                title: 'Filial adı boş ola bilməz!',
              })
            e.preventDefault()
        }
        else if(!addAddress.val()){
            Swal.fire({
                icon: 'error',
                title: 'Filial addressi boş ola bilməz!',
              })
            e.preventDefault()
        }
    })
    editBranch.on('submit', () => {
        if(!addName.val()){
            Swal.fire({
                icon: 'error',
                title: 'Filial adı boş ola bilməz!',
              })
            e.preventDefault()
        }
        else if(!addAddress.val()){
            Swal.fire({
                icon: 'error',
                title: 'Filial addressi boş ola bilməz!',
              })
            e.preventDefault()
        }
    })

    delBranch.on('click', () => {
        Swal.fire({
            title: 'Silmək istədiyinizə əminsizniz ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sil !',
            cancelButtonText: 'Ləğv et'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/branches/delete?branchId=${editId.val()}`
            }
          })
    })
})