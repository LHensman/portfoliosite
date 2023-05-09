window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const pageTop = window.pageYOffset || document.documentElement.scrollTop;
    const isNearTop = pageTop < 100;
    header.classList.toggle('sticky', isNearTop && header.dataset.mouseOver === 'true');
});

document.addEventListener('mouseover', function (e) {
    const header = document.querySelector('header');
    const isNearTop = e.clientY < 200;
    header.dataset.mouseOver = isNearTop;
    header.classList.toggle('sticky', isNearTop && window.pageYOffset > 0);
});

document.addEventListener('mouseout', function (e) {
    const header = document.querySelector('header');
    const isNearTop = e.clientY < 200;
    header.dataset.mouseOver = isNearTop;
    header.classList.toggle('sticky', isNearTop && window.pageYOffset > 0);
});



window.addEventListener('scroll', function () {
    const parallax = document.querySelector('.about-img');
    let scrollPosition = window.pageYOffset;

    if (scrollPosition < 1000) {
        parallax.style.transform = 'translateY(' + scrollPosition * -.3 + 'px)';
    }
});

window.addEventListener('scroll', function () {
    const parallax = document.querySelector('.details-img');
    let scrollPosition = window.pageYOffset;

    if (scrollPosition < 1000) {
        parallax.style.transform = 'translateY(' + scrollPosition * .25 + 'px)';
    }
});




function showImage(imageSrc) {
    // Get the modal element and modal image element
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById('modalImg');
    var captionText = document.getElementById('caption');

    modal.style.display = 'block';
    modalImg.src = imageSrc;
    captionText.innerHTML = 'Image Caption Goes Here';
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

function submitForm(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const submitButton = document.getElementById('submit-btn');

    fetch('/submit_form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ name, email, message }),
    })
        .then((response) => {
            if (response.status === 200) {
                // Clear the form after a successful submission
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                // Change the submit button text to "Submitted"
                submitButton.value = 'Submitted';
                submitButton.disabled = true;
            } else {
                throw new Error('Error sending email');
            }
        })
        .catch((error) => {
            console.error(error);
            alert('Error sending email');
        });
}