const form = document.getElementById('quoteForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value,
        service: form.service.value,
        propertyType: form.propertyType.value,
        squareFootage: form.squareFootage.value,
        preferredDate: form.preferredDate.value,
        preferredTime: form.preferredTime.value,
        additionalInfo: form.additionalInfo.value,
    }
    
    fetch('/api/submitForm', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        const toastElement = document.getElementById('toastElement');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.innerHTML = data.message;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
        
        if (data.success) {
            form.reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const toastElement = document.getElementById('toastElement');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.innerHTML = 'Failed to submit form. Please try again.';
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    });
});
