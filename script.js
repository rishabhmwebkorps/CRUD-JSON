


  const uploadManager = new Bytescale.UploadManager({
    apiKey: "public_12a1z4xFtKzJe1RtrNiX19ukEhxN" // Your API key.
  });

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
      try {
        const { fileUrl } = await uploadManager.upload({ data: fileInput });

        const formData = {
          id: randomId,
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          fileUrl: fileUrl, 
        };

        await submitData(formData);
        console.log('File uploaded successfully!');
        window.location.href = '/Cards.html';

      } catch (error) {
        console.error('Error uploading file:', error);
        console.log(`Error: ${error.message}`);
      }
    } 

    async function submitData(formData) {
      console.log(formData, 'Data of form in object');
      await fetch('http://localhost:3000/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    
      console.log('Success');
    }

  });

