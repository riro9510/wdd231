document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');

    if(form){
    form.addEventListener("submit", function (event) {
        event.preventDefault();  

        const formData = new FormData(form);

        const formDataObject = Object.fromEntries(formData.entries());

        sessionStorage.setItem('formData', JSON.stringify(formDataObject));

        window.location.href = './thankyou.html';
    });
}
});

  const submittedData = document.getElementById('submittedData');
  const formData = JSON.parse(sessionStorage.getItem('formData'));
  console.log("Saved info:", formData);

  if (formData) {
      const nameOfPerson = formData.first_name || 'Guest';
      const membershipLevel = formData.membership || 'default membership';
      document.querySelector('h1').textContent = `Hi ${nameOfPerson}. Thank You for Your Application to our ${membershipLevel}!`;

      const dataContainer = document.createElement('div');

      dataContainer.innerHTML = `
          <p><strong>Company:</strong> ${formData.organization || 'N/A'}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'N/A'}</p>
          <p><strong>Email:</strong> ${formData.email || 'N/A'}</p>
          <p><strong>Organization Title:</strong> ${formData.organization_title || 'N/A'}</p>
          <p><strong>Organization Description:</strong> ${formData.description || 'N/A'}</p>
      `;
      submittedData.appendChild(dataContainer);
  }