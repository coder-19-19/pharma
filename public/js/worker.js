window.addEventListener('load', () => {
    const editForm = $('#editForm')
    const editId = $('#editId')
    const editName = $('#editName')
    const editSurname = $('#editSurname')
    const editAddress = $('#editAddress')
    const editPhone = $('#editPhone')
    const editSalary = $('#editSalary')
    const deleteBtn = $('#deleteBtn')
    const addForm = $('#addForm')

    editForm.on('submit', (e) => {
        if(!editName.val()){
            Swal.fire({
                icon: 'error',
                title: 'İşçi adı boş ola bilməz!',
              })
            e.preventDefault()
        }
        else if(!editSurname.val()){
            Swal.fire({
                icon: 'error',
                title: 'İşçi soyadı boş ola bilməz!'
              })
              e.preventDefault()
        }
        else if(!editAddress.val()){
            Swal.fire({
                icon: 'error',
                title: 'İşçi addressi boş ola bilməz!'
              })
              e.preventDefault()
        }
        else if(!editPhone.val()){
          Swal.fire({
              icon: 'error',
              title: 'İşçi nömrəsi boş ola bilməz!'
            })
            e.preventDefault()
      }
        else if(!editSalary.val()){
            Swal.fire({
                icon: 'error',
                title: 'İşçi maaşı boş ola bilməz!'
              })
              e.preventDefault()
        }
    })
    deleteBtn.on('click', () => {
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
              window.location.href = `/workers/delete?workerId=${editId.val()}`
            }
          })
    })
    addForm.on('submit', (e) => {
        if(!editName.val()){
            Swal.fire({
                icon: 'error',
                title: 'İşçi adı boş ola bilməz!',
              })
            e.preventDefault()
        }
        else if(!editSurname.val()){
            Swal.fire({
                icon: 'error',
                title: 'İşçi soyadı boş ola bilməz!'
              })
              e.preventDefault()
        }
        else if(!editAddress.val()){
            Swal.fire({
                icon: 'error',
                title: 'İşçi addressi boş ola bilməz!'
              })
              e.preventDefault()
        }
        else if(!editSalary.val()){
            Swal.fire({
                icon: 'error',
                title: 'İşçi maaşı boş ola bilməz!'
              })
              e.preventDefault()
        }
    })

    const searchWorker = $('#searchWorker')
    const searchSelect = $('#searchSelect')
    const searchBtn = $('#searchBtn')

    searchBtn.on('click', () => {
      window.location.href = `/workers?search${searchSelect.val()}=${searchWorker.val()}`
    })
  
})

