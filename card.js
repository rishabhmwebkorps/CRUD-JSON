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
                       <img src="${item.fileUrl}">
                       <p> <span>Name :</span> ${item.name}</p>
                       <p> <span>Email:</span> ${item.email}</p>
                       <p> <span>Phone:</span> ${item.phone}</p>
                       <button onclick="editDetails(${item.id})">Edit</button>
                       <button id='delete-button' onclick="deleteDetails(${item.id})">Delete</button>
        `;
            detailList.appendChild(card);
        });
    } catch (error) {
        console.error(error, 'Error in fetch');
    }
}

async function deleteDetails(id) {
    console.log(id, 'delete items')
    try {
        const response = await fetch(`http://localhost:3000/details/${id}`,
            { method: 'DELETE' });

        getDetails();
    } catch (error) {
        console.error(error);
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
        document.getElementById('editfile').file = detail.file;
        document.getElementById('editDetails').style.display = 'block';
    } catch (error) {
        console.error('Error in edit fetch:', error);
    }
}

document.getElementById('editDetails').addEventListener('submit', async function (e) {
    e.preventDefault();

    const id = document.getElementById('edit-id').value;
    const editImage = document.getElementById('editfile').files[0];

    const { fileUrl } = await uploadManager.upload({ data: editImage });


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

    document.getElementById('editDetails').style.display = 'none';
    getDetails();
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
                           <img src="${item.fileUrl}">
                           <p> <span>Name :</span> ${item.name}</p>
                           <p> <span>Email:</span> ${item.email}</p>
                           <p> <span>Phone:</span> ${item.phone}</p>
                           <button onclick="editDetails(${item.id})">Edit</button>
                           <button id='delete-button' onclick="deleteDetails(${item.id})">Delete</button>
            `;
                detailList.appendChild(card);
            });
        } catch (error) {
            console.error(error, 'Error in fetch');
        }
    }

    async function deleteDetails(id) {
        console.log(id, 'delete items')
        try {
            const response = await fetch(`http://localhost:3000/details/${id}`,
                { method: 'DELETE' });

            getDetails();
        } catch (error) {
            console.error(error);
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
            document.getElementById('editfile').file = detail.file;
            document.getElementById('editDetails').style.display = 'block';
        } catch (error) {
            console.error('Error in edit fetch:', error);
        }
    }

    document.getElementById('editDetails').addEventListener('submit', async function (e) {
        e.preventDefault();

        const id = document.getElementById('edit-id').value;
        const editImage = document.getElementById('editfile').files[0];

        const { fileUrl } = await uploadManager.upload({ data: editImage });


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

        document.getElementById('editDetails').style.display = 'none';
        getDetails();
    });

    function onCancel() {
        document.getElementById('editDetails').style.display = 'none';
    }

});

getDetails();