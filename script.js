var cl = new cloudinary.Cloudinary({ cloud_name: "dskkzdqls", secure: true });

document.getElementById('main-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  let loader = document.getElementById('loader');
  loader.style.display = 'block';

  const fileInput = document.getElementById('fileInput').files[0];

  if (fileInput) {
    try {
      const formData = new FormData();
      formData.append('file', fileInput);
      formData.append('upload_preset', 'lgrvaj0m');

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cl.config().cloud_name}/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      const fileUrl = data.secure_url;

      const formDetails = {
        id: generateRandomId(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        fileUrl: fileUrl,
      };

      await submitData(formDetails);

    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  } else {
    console.log('No file selected');
  }

  loader.style.display = 'none';
});

function generateRandomId() {
  const min = 1000;
  const max = 5000;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

async function submitData(formDetails) {
  try {
    const response = await fetch('https://j-server-2tu7.onrender.com/details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDetails)
    });

    if (response.ok) {
      console.log('Success:', await response.json());
      window.location.href = '/cards.html'; 
    } else {
      console.error('Error submitting data:', response.statusText);
    }
  } catch (error) {
    console.error('Error in submitData:', error.message);
  }
}
