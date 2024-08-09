const CLOUDINARY_URL=cloudinary:924866264556587:tum5zUqRd2_lReyaIKt_BscPTUI@dskkzdqls
const CLOUDINARY_PRESET = lti3yae9;







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
      const reader = new FileReader();

      reader.onload = function (event) {
        const fileContent = event.target.result;

        const formData = {
          id: randomId,
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          file: fileContent,
        };

        submitData(formData);
      };

      reader.onerror = function () {
        console.error('Error reading file');
      };

      reader.readAsDataURL(fileInput); 
    } 


    async function submitData(formData) {

      await fetch('http://localhost:3000/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      getDetails();
      alert('Success');


    }
          window.location.href = '/Cards.html'
  });
