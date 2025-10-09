const form = document.getElementById('quoteForm');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Add Bootstrap validation classes
        form.classList.add('was-validated');
        
        // Check if form is valid
        if (!form.checkValidity()) {
            return;
        }
        
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

        console.log('Form data:', formData);
        
        fetch('/api/submitForm', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response received:', data);
            const toastElement = document.getElementById('toastElement');
            const toastMessage = document.getElementById('toastMessage');
            
            if (toastElement && toastMessage) {
                toastMessage.innerHTML = data.message || 'Response received';
                const toast = new bootstrap.Toast(toastElement);
                toast.show();
                
                if (data.success) {
                    form.reset();
                    form.classList.remove('was-validated');
                }
            } else {
                console.error('Toast elements not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const toastElement = document.getElementById('toastElement');
            const toastMessage = document.getElementById('toastMessage');
            
            if (toastElement && toastMessage) {
                toastMessage.innerHTML = 'Failed to submit form. Please try again.';
                const toast = new bootstrap.Toast(toastElement);
                toast.show();
            } else {
                console.error('Toast elements not found');
                alert('Failed to submit form. Please try again.');
            }
        });
    });
}
