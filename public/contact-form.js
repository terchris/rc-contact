function createContactForm() {
    // Create the form HTML
    const formHTML = `
      <div class="form-container">
        <form id="contact-form">
          <div class="form-group">
            <label for="name">Navn</label>
            <input type="text" id="name" name="name" required>
            <div class="error" id="name-error"></div>
          </div>
          
          <div class="form-group">
            <label for="lastName">Etternavn</label>
            <input type="text" id="lastName" name="lastName" required>
            <div class="error" id="lastName-error"></div>
          </div>
          
          <div class="form-group">
            <label for="phone">Telefonnummer</label>
            <div class="phone-input">
              <input type="text" id="countryCode" value="+47">
              <input type="text" id="phoneNumber" name="phoneNumber" placeholder="12345678" required>
            </div>
            <div class="error" id="phone-error"></div>
          </div>
          
          <div class="form-group">
            <label for="request">Melding</label>
            <textarea id="request" name="request" rows="4" required></textarea>
            <div class="error" id="request-error"></div>
          </div>
          
          <div class="form-group">
            <label for="city">By</label>
            <select id="city" name="city" required>
              <option value="">Velg by</option>
              <option value="Oslo">Oslo</option>
              <option value="Bergen">Bergen</option>
              <option value="Trondheim">Trondheim</option>
              <option value="Stavanger">Stavanger</option>
              <option value="Tromsø">Tromsø</option>
              <option value="Kristiansand">Kristiansand</option>
              <option value="Ålesund">Ålesund</option>
              <option value="Drammen">Drammen</option>
              <option value="Fredrikstad">Fredrikstad</option>
              <option value="Bodø">Bodø</option>
            </select>
            <div class="error" id="city-error"></div>
          </div>
          
          <div class="form-group">
            <label>Kjønn</label>
            <div class="radio-group">
              <label>
                <input type="radio" name="sex" value="male" required>
                Mann
              </label>
              <label>
                <input type="radio" name="sex" value="female" required>
                Kvinne
              </label>
            </div>
            <div class="error" id="sex-error"></div>
          </div>
          
          <button type="submit" id="submit-button">Send</button>
        </form>
      </div>
    `;
  
    // Add form to the page
    const container = document.querySelector('#contact-form-container');
    if (container) {
      container.innerHTML = formHTML;
    }
  
    // Form validation
    function validateForm() {
      let isValid = true;
      const errors = {};
  
      // Name validation
      const name = document.querySelector('#name').value.trim();
      if (!name) {
        errors.name = 'Navn er påkrevd';
        isValid = false;
      }
  
      // Last name validation
      const lastName = document.querySelector('#lastName').value.trim();
      if (!lastName) {
        errors.lastName = 'Etternavn er påkrevd';
        isValid = false;
      }
  
      // Phone validation
      const phoneNumber = document.querySelector('#phoneNumber').value.trim();
      if (!phoneNumber) {
        errors.phone = 'Telefonnummer er påkrevd';
        isValid = false;
      } else if (!/^\d{8}$/.test(phoneNumber)) {
        errors.phone = 'Vennligst skriv inn et gyldig 8-sifret telefonnummer';
        isValid = false;
      }
  
      // Request validation
      const request = document.querySelector('#request').value.trim();
      if (!request) {
        errors.request = 'Melding er påkrevd';
        isValid = false;
      }
  
      // City validation
      const city = document.querySelector('#city').value;
      if (!city) {
        errors.city = 'By er påkrevd';
        isValid = false;
      }
  
      // Sex validation
      const sex = document.querySelector('input[name="sex"]:checked');
      if (!sex) {
        errors.sex = 'Kjønn er påkrevd';
        isValid = false;
      }
  
      // Display errors
      Object.keys(errors).forEach(key => {
        const errorElement = document.querySelector(`#${key}-error`);
        if (errorElement) {
          errorElement.textContent = errors[key];
        }
      });
  
      return isValid;
    }
  
    // Add event listener for form submission
    document.querySelector('#contact-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Clear previous errors
      document.querySelectorAll('.error').forEach(el => el.textContent = '');
      
      if (!validateForm()) {
        return;
      }
  
      const submitButton = document.querySelector('#submit-button');
      submitButton.disabled = true;
      submitButton.textContent = 'Sender...';
      
      const formData = {
        name: document.querySelector('#name').value.trim(),
        lastName: document.querySelector('#lastName').value.trim(),
        phoneNumber: document.querySelector('#countryCode').value + document.querySelector('#phoneNumber').value.trim(),
        request: document.querySelector('#request').value.trim(),
        city: document.querySelector('#city').value,
        sex: document.querySelector('input[name="sex"]:checked').value
      };
  
      try {
        const response = await fetch('https://api-dev.redcross.no/forms/contact-form/v1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error('Submission failed');
        }
  
        alert('Skjema sendt inn vellykket!');
        document.querySelector('#contact-form').reset();
        document.querySelector('#countryCode').value = '+47';
      } catch (error) {
        alert('Kunne ikke sende skjema. Vennligst prøv igjen.');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send';
      }
    });
  }
  
  // Initialize form when DOM is loaded
  document.addEventListener('DOMContentLoaded', createContactForm);