 const objectForm = document.getElementById('objectForm');


objectForm.addEventListener('submit', evt =>{
    evt.preventDefault();
    const formData = new FormData(objectForm);
    fetch('/api/product',{
        method:"POST",
        body:formData
    }).then(result=>result.json()).then(json=>console.log(json));
}) 