const uploadManager = new Bytescale.UploadManager({
    apiKey: "public_12a1z4xFtKzJe1RtrNiX19ukEhxN"
});

async function getDetails() {
    try {
        const response = await fetch(`http://localhost:3000/details`);
        const details = await response.json();
        const detailList = document.getElementById('detailslist');
        detailList.innerHTML = '';

        details.map(item => {
            const card = document.createElement('div');
            card.className = 'cardDetails';
            card.innerHTML = `
                <img src="${item.fileUrl}" alt="Image">
                <p><span>Name :</span> ${item.name}</p>
                <p><span>Email:</span> ${item.email}</p>
                <p><span>Phone:</span> ${item.phone}</p>
                <button onclick="editDetails(${item.id})">Edit</button>
                <span id='delete-button' onclick="deleteDetails(${item.id})">Delete</span>
            `;
            detailList.appendChild(card);
        });
    } catch (error) {
        console.error('Error in fetch:', error);
    }
}

async function deleteDetails(id) {
    try {
        await fetch(`http://localhost:3000/details/${id}`, { method: 'DELETE' });
        getDetails();
    } catch (error) {
        console.error('Error deleting detail:', error);
    }
}

async function editDetails(id) {
    try {
        const response = await fetch(`http://localhost:3000/details/${id}`);
        const detail = await response.json();

        document.getElementById('editname').value = detail.name;
        document.getElementById('editemail').value = detail.email;
        document.getElementById('editphone').value = detail.phone;
        document.getElementById('edit-id').value = detail.id;
        document.getElementById('editfile').dataset.currentFileUrl = detail.fileUrl
        document.getElementById('editDetails').style.display = 'block';
    } catch (error) {
        console.error('Error in edit fetch:', error);
    }
}

document.getElementById('editDetails').addEventListener('submit', async function (e) {
    e.preventDefault();
       let loader = document.getElementById('loader');
    loader.style.display = 'block'

    const id = document.getElementById('edit-id').value;
    const editImage = document.getElementById('editfile').files[0];

    let fileUrl;

    if (editImage) {
        const uploadResponse = await uploadManager.upload({ data: editImage });
        fileUrl = uploadResponse.fileUrl;
    } else {
        fileUrl = document.getElementById('editfile').dataset.currentFileUrl;
    }

    const editedData = {
        name: document.getElementById('editname').value,
        email: document.getElementById('editemail').value,
        phone: document.getElementById('editphone').value,
        fileUrl: fileUrl,
    };

    await fetch(`http://localhost:3000/details/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData),
    });
    loader.style.display = 'none'
    document.getElementById('editDetails').style.display = 'none';
    getDetails();
});

function onCancel() {
    document.getElementById('editDetails').style.display = 'none';
}

getDetails();
