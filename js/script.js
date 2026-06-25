const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const subjectField = document.getElementById("subject");
  const bookImageGroup = document.getElementById("bookImageGroup");
  const bookImage = document.getElementById("bookImage");
  const bookImageError = document.getElementById("bookImageError");

  function toggleBookImageField() {
    const shouldShowBookImage = subjectField.value === "Related to Book Purchase";

    if (shouldShowBookImage) {
      bookImageGroup.classList.remove("d-none");
      bookImage.required = true;
    } else {
      bookImageGroup.classList.add("d-none");
      bookImage.required = false;
      bookImage.value = "";
      bookImageError.textContent = "";
    }
  }

  subjectField.addEventListener("change", toggleBookImageField);
  toggleBookImageField();

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const emailAddress = document.getElementById("emailAddress").value.trim();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value.trim();
    const bookImageFile = bookImage.files[0];

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");
    const formSuccess = document.getElementById("formSuccess");

    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";
    bookImageError.textContent = "";
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

    if (subject === "Related to Book Purchase" && !bookImageFile) {
      bookImageError.textContent = "Please upload an image for your book purchase inquiry.";
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
      toggleBookImageField();
    }
  });
}

const bookSearch = document.getElementById("bookSearch");
const categoryFilter = document.getElementById("categoryFilter");
const bookItems = document.querySelectorAll(".book-item");
const noResults = document.getElementById("noResults");
const bookCount = document.getElementById("bookCount");

if (bookSearch && categoryFilter && noResults && bookCount) {
  function filterBooks() {
    const searchValue = bookSearch.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    let visibleBooks = 0;

    bookItems.forEach(function (book) {
      const title = book.getAttribute("data-title");
      const author = book.getAttribute("data-author");
      const category = book.getAttribute("data-category");

      const matchesSearch =
        title.includes(searchValue) ||
        author.includes(searchValue) ||
        category.includes(searchValue);

      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;

      if (matchesSearch && matchesCategory) {
        book.classList.remove("d-none");
        visibleBooks++;
      } else {
        book.classList.add("d-none");
      }
    });

    if (visibleBooks === 0) {
      noResults.classList.remove("d-none");
      bookCount.textContent = "No books match your search.";
    } else {
      noResults.classList.add("d-none");

      if (visibleBooks === bookItems.length) {
        bookCount.textContent = "Showing all available books.";
      } else {
        bookCount.textContent = `Showing ${visibleBooks} matching book(s).`;
      }
    }
  }

  bookSearch.addEventListener("input", filterBooks);
  categoryFilter.addEventListener("change", filterBooks);
}

// FAQ Page Search & Filter Interactivity
const faqSearch = document.getElementById("faqSearch");
const faqItems = document.querySelectorAll(".faq-item");
const noFaqResults = document.getElementById("noFaqResults");
const faqCount = document.getElementById("faqCount");

if (faqSearch && faqItems && noFaqResults && faqCount) {
  function filterFAQs() {
    const searchValue = faqSearch.value.toLowerCase().trim();
    let visibleFAQs = 0;

    faqItems.forEach(function (item) {
      const question = item.getAttribute("data-question").toLowerCase();
      const answer = item.getAttribute("data-answer").toLowerCase();

      const matches = question.includes(searchValue) || answer.includes(searchValue);

      if (matches) {
        item.classList.remove("d-none");
        visibleFAQs++;
      } else {
        item.classList.add("d-none");
      }
    });

    if (visibleFAQs === 0) {
      noFaqResults.classList.remove("d-none");
      faqCount.textContent = "No questions match your search.";
    } else {
      noFaqResults.classList.add("d-none");
      if (visibleFAQs === faqItems.length) {
        faqCount.textContent = "Showing all questions.";
      } else {
        faqCount.textContent = `Showing ${visibleFAQs} matching question(s).`;
      }
    }
  }

  faqSearch.addEventListener("input", filterFAQs);
}

// Reviews Form Submission & Dynamic Card Insertion
const reviewForm = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");
const reviewsListCount = document.getElementById("reviewsListCount");

if (reviewForm && reviewsList && reviewsListCount) {
  let reviewsCount = 3;

  reviewForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("reviewerName").value.trim();
    const rating = document.getElementById("reviewRating").value;
    const title = document.getElementById("reviewTitle").value.trim();
    const text = document.getElementById("reviewText").value.trim();

    const nameError = document.getElementById("reviewerNameError");
    const ratingError = document.getElementById("reviewRatingError");
    const titleError = document.getElementById("reviewTitleError");
    const textError = document.getElementById("reviewTextError");
    const formSuccess = document.getElementById("reviewFormSuccess");

    nameError.textContent = "";
    ratingError.textContent = "";
    titleError.textContent = "";
    textError.textContent = "";
    formSuccess.textContent = "";

    let isValid = true;

    if (name === "") {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    } else if (name.length < 3) {
      nameError.textContent = "Name must be at least 3 characters.";
      isValid = false;
    }

    if (rating === "") {
      ratingError.textContent = "Please select a rating.";
      isValid = false;
    }

    if (title === "") {
      titleError.textContent = "Please enter a review title.";
      isValid = false;
    } else if (title.length < 4) {
      titleError.textContent = "Title must be at least 4 characters.";
      isValid = false;
    }

    if (text === "") {
      textError.textContent = "Please write your review.";
      isValid = false;
    } else if (text.length < 10) {
      textError.textContent = "Review must be at least 10 characters.";
      isValid = false;
    }

    if (isValid) {
      const newCard = document.createElement("div");
      newCard.className = "card shadow-sm border-0 mb-3 review-card";

      let stars = "";
      const ratingValue = parseInt(rating);
      for (let i = 1; i <= 5; i++) {
        stars += i <= ratingValue ? "★" : "☆";
      }

      newCard.innerHTML = `
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-start flex-wrap g-2">
            <div>
              <h3 class="h6 fw-bold mb-1">${escapeHtml(title)}</h3>
              <p class="text-muted small mb-2">Submitted by <strong>${escapeHtml(name)}</strong> on June 25, 2026</p>
            </div>
            <div class="star-rating">${stars}</div>
          </div>
          <p class="mb-0 text-secondary">${escapeHtml(text)}</p>
        </div>
      `;

      reviewsList.insertBefore(newCard, reviewsList.firstChild);

      reviewsCount++;
      reviewsListCount.textContent = `${reviewsCount} Reviews`;

      formSuccess.textContent = "Your review has been submitted successfully!";
      reviewForm.reset();
    }
  });

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Events Page Filtering Interactivity
const btnFilterAll = document.getElementById("btnFilterAll");
const btnFilterUpcoming = document.getElementById("btnFilterUpcoming");
const btnFilterPast = document.getElementById("btnFilterPast");
const eventItems = document.querySelectorAll(".event-item");
const noEventsResults = document.getElementById("noEventsResults");
const eventsCount = document.getElementById("eventsCount");

if (btnFilterAll && btnFilterUpcoming && btnFilterPast && eventItems && noEventsResults && eventsCount) {
  function filterEvents(timelineFilter) {
    let visibleEvents = 0;

    eventItems.forEach(function (card) {
      const cardTimeline = card.getAttribute("data-timeline");

      if (timelineFilter === "all" || cardTimeline === timelineFilter) {
        card.classList.remove("d-none");
        visibleEvents++;
      } else {
        card.classList.add("d-none");
      }
    });

    // Update active button classes
    [btnFilterAll, btnFilterUpcoming, btnFilterPast].forEach(function (btn) {
      btn.classList.remove("active", "btn-warning");
      btn.classList.add("btn-outline-dark");
    });

    if (timelineFilter === "all") {
      btnFilterAll.classList.add("active", "btn-warning");
      btnFilterAll.classList.remove("btn-outline-dark");
      eventsCount.textContent = `Showing all ${visibleEvents} events.`;
    } else if (timelineFilter === "upcoming") {
      btnFilterUpcoming.classList.add("active", "btn-warning");
      btnFilterUpcoming.classList.remove("btn-outline-dark");
      eventsCount.textContent = `Showing ${visibleEvents} upcoming event(s).`;
    } else if (timelineFilter === "past") {
      btnFilterPast.classList.add("active", "btn-warning");
      btnFilterPast.classList.remove("btn-outline-dark");
      eventsCount.textContent = `Showing ${visibleEvents} past event(s).`;
    }

    if (visibleEvents === 0) {
      noEventsResults.classList.remove("d-none");
    } else {
      noEventsResults.classList.add("d-none");
    }
  }

  btnFilterAll.addEventListener("click", function () { filterEvents("all"); });
  btnFilterUpcoming.addEventListener("click", function () { filterEvents("upcoming"); });
  btnFilterPast.addEventListener("click", function () { filterEvents("past"); });
}

