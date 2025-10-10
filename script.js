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
                toastElement.classList.remove('bg-danger', 'text-white');
                toastElement.classList.add('bg-success', 'text-white');
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
                toastElement.classList.remove('bg-success', 'text-white');
                toastElement.classList.add('bg-danger', 'text-white');
                const toast = new bootstrap.Toast(toastElement);
                toast.show();
            } else {
                console.error('Toast elements not found');
                alert('Failed to submit form. Please try again.');
            }
        });
    });
}

// Review Form Submission

const reviewForm = document.getElementById('reviewForm');

if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Add Bootstrap validation classes
        reviewForm.classList.add('was-validated');
        
        if (!reviewForm.checkValidity()) {
            return;
        }

        const reviewData = {
            name: reviewForm.name.value,
            email: reviewForm.email.value,
            rating: reviewForm.rating.value,
            review: reviewForm.review.value,
        }

        console.log('Review data:', reviewData);

        fetch('/api/submitReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response received:', data);
            const reviewToast = document.getElementById('reviewToast');
            const reviewToastMessage = document.getElementById('reviewToastMessage');

            if (reviewToast && reviewToastMessage) {
                reviewToastMessage.innerHTML = data.message || 'Response received';
                reviewToast.classList.remove('bg-danger', 'text-white');
                reviewToast.classList.add('bg-success', 'text-white');
                const toast = new bootstrap.Toast(reviewToast);
                toast.show();

                if (data.success) {
                    reviewForm.reset();
                    reviewForm.classList.remove('was-validated');
                }
            } else {
                console.error('Review toast elements not found');
                alert('Failed to submit review. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const reviewToast = document.getElementById('reviewToast');
            const reviewToastMessage = document.getElementById('reviewToastMessage');

            if (reviewToast && reviewToastMessage) {
                reviewToastMessage.innerHTML = 'Failed to submit review. Please try again.';
                reviewToast.classList.remove('bg-success', 'text-white');
                reviewToast.classList.add('bg-danger', 'text-white');
                const toast = new bootstrap.Toast(reviewToast);
                toast.show();
            } else {
                console.error('Review toast elements not found');
                alert('Failed to submit review. Please try again.');
            }
        });
    });
}

