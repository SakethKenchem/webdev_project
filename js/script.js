const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const emailAddress = document.getElementById("emailAddress").value.trim();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value.trim();

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");
    const formSuccess = document.getElementById("formSuccess");

    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    let isValid = true;

    if (fullName === "") {
      nameError.textContent = "Please enter your full name.";
      isValid = false;
    } else if (fullName.length < 5) {
      nameError.textContent = "Full name must be at least 5 characters.";
      isValid = false;
    }

    if (emailAddress === "") {
      emailError.textContent = "Please enter your email address.";
      isValid = false;
    } else if (!emailAddress.includes("@") || !emailAddress.includes(".")) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (subject === "") {
      subjectError.textContent = "Please choose a subject.";
      isValid = false;
    }

    if (message === "") {
      messageError.textContent = "Please enter your message.";
      isValid = false;
    } else if (message.length < 10) {
      messageError.textContent = "Message should be at least 10 characters.";
      isValid = false;
    }

    if (isValid) {
      formSuccess.textContent = "Your message has been submitted successfully.";
      formSuccess.className = "mt-3 mb-0 fw-semibold text-success";
      contactForm.reset();
    }
  });
}