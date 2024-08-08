document.getElementById('main-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    function detailsId() {
        const min = 1000;
        const max = 5000;
        return String(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    const randomId = detailsId();
    const fileInput = document.getElementById('fileInput').files[0];

    if (fileInput) {
        const fileImage = window.URL.createObjectURL(fileInput)
        const img = new Image();
        img.src = fileImage;
        const revoke = revokeObjectUrl(fileInput);

        console.log(revoke);

        const formData = {
            id: randomId,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            file: fileImage,
        };
        submitData(formData);
    };

    async function submitData(formData) {

        await fetch('http://localhost:3000/details', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        getDetails();
        alert('Success');
    }
    window.location.href = "/card.html";
});

