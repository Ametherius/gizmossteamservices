import { testimonials } from "./data/testimonials.js";
import { faq } from "./data/faq.js";

const navLinks = [
  {
    name: "Home",
    link: "./",
  },
  {
    name: "What We Steam",
    link: "./what-we-steam",
  },
  {
    name: "Gizmo's Steamer",
    link: "./gizmos-steamer",
  },
  {
    name: "Gallery",
    link: "./gallery",
  },
  {
    name: "Testimonials",
    link: "./testimonials",
  },
  {
    name: "FAQ's",
    link: "./faq",
  },
  {
    name: "Request a Quote",
    link: "./quote",
  },
  {
    name: "Leave a Review",
    link: "./reviews",
  },
];

const form = document.getElementById("quoteForm");
let testimonialsContainer;
let galleryItemsContainer;
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Add Bootstrap validation classes
    form.classList.add("was-validated");

    // Check if form is valid
    if (!form.checkValidity()) {
      return;
    }

    const formData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
    };

    console.log("Form data:", formData);

    fetch("/api/submitForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response received:", data);
        const toastElement = document.getElementById("toastElement");
        const toastMessage = document.getElementById("toastMessage");

        if (toastElement && toastMessage) {
          toastMessage.innerHTML = data.message || "Response received";
          toastElement.classList.remove("bg-danger", "text-white");
          toastElement.classList.add("bg-success", "text-white");
          const toast = new bootstrap.Toast(toastElement);
          toast.show();

          if (data.success) {
            form.reset();
            form.classList.remove("was-validated");
          }
        } else {
          console.error("Toast elements not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        const toastElement = document.getElementById("toastElement");
        const toastMessage = document.getElementById("toastMessage");

        if (toastElement && toastMessage) {
          toastMessage.innerHTML = "Failed to submit form. Please try again.";
          toastElement.classList.remove("bg-success", "text-white");
          toastElement.classList.add("bg-danger", "text-white");
          const toast = new bootstrap.Toast(toastElement);
          toast.show();
        } else {
          console.error("Toast elements not found");
          alert("Failed to submit form. Please try again.");
        }
      });
  });
}

// Review Form Submission

const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Add Bootstrap validation classes
    reviewForm.classList.add("was-validated");

    if (!reviewForm.checkValidity()) {
      return;
    }

    const reviewData = {
      name: reviewForm.name.value,
      email: reviewForm.email.value,
      rating: reviewForm.rating.value,
      review: reviewForm.review.value,
    };

    console.log("Review data:", reviewData);

    fetch("/api/submitReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response received:", data);
        const reviewToast = document.getElementById("reviewToast");
        const reviewToastMessage =
          document.getElementById("reviewToastMessage");

        if (reviewToast && reviewToastMessage) {
          reviewToastMessage.innerHTML = data.message || "Response received";
          reviewToast.classList.remove("bg-danger", "text-white");
          reviewToast.classList.add("bg-success", "text-white");
          const toast = new bootstrap.Toast(reviewToast);
          toast.show();

          if (data.success) {
            reviewForm.reset();
            reviewForm.classList.remove("was-validated");
          }
        } else {
          console.error("Review toast elements not found");
          alert("Failed to submit review. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        const reviewToast = document.getElementById("reviewToast");
        const reviewToastMessage =
          document.getElementById("reviewToastMessage");

        if (reviewToast && reviewToastMessage) {
          reviewToastMessage.innerHTML =
            "Failed to submit review. Please try again.";
          reviewToast.classList.remove("bg-success", "text-white");
          reviewToast.classList.add("bg-danger", "text-white");
          const toast = new bootstrap.Toast(reviewToast);
          toast.show();
        } else {
          console.error("Review toast elements not found");
          alert("Failed to submit review. Please try again.");
        }
      });
  });
}

const displayTestimonials = function (testimonials) {
  testimonialsContainer = document.querySelector(".testimonials-container");
  if (!testimonialsContainer) {
    console.error("Testimonials container not found");
    return;
  }
  testimonialsContainer.innerHTML = "";
  testimonials.forEach(function (testimonial) {
    const html = `
  <div class="card h-100 border-0 bg-white mb-3">
    <div class="card-body p-4">
        <i class="fas fa-quote-left fa-2x text-primary mb-3"></i>
        <p class="card-text text-secondary">"${testimonial.testimonial}"</p>
        <div class="d-flex align-items-center mt-3">
            <div>
                <h5 class="mb-0">${testimonial.name}</h5>
                <small class="text-muted">${testimonial.location}</small>
            </div>
        </div>
    </div>
  </div>
    `;
    testimonialsContainer.insertAdjacentHTML("afterbegin", html);
  });
};

// Wait for DOM to be ready and then display testimonials
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    displayTestimonials(testimonials);
  });
} else {
  displayTestimonials(testimonials);
}

document.addEventListener("DOMContentLoaded", function () {
  const faqAccordion = document.querySelector(".faq-accordion");

  const displayFAQ = function (faq) {
    faqAccordion.textContent = "";
    faq.forEach((faqs, i) => {
      const show = i === 0 ? "show" : "";
      const expanded = i === 0 ? "true" : "false";
      const html = `
                <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapse${i}"
                aria-expanded="true"
                aria-controls="flush-collapse${i}"
              >
                <strong>${faqs.question}</strong>
              </button>
            </h2>
            <div
              class="accordion-collapse collapse ${show}"
              id="flush-collapse${i}"
              data-bs-parent="#faq-accordion"
            >
              <div class="accordion-body">
                ${faqs.answer}
              </div>
            </div>
          </div>
        </div>
      `;
      faqAccordion.insertAdjacentHTML("beforeend", html);
    });
  };
  displayFAQ(faq);
});

document.addEventListener("DOMContentLoaded", function () {
  const navLinksList = document.querySelector(".navbar-nav");

  const displayNavLinks = function (links) {
    navLinksList.textContent = "";
    links.forEach((link) => {
      const html = `
          <li class="nav-item">
            <a class="nav-link" href="${link.link}">${link.name}</a>
          </li>
      `;
      navLinksList.insertAdjacentHTML("beforeend", html);
    });
  };
  displayNavLinks(navLinks);
});

document.addEventListener("DOMContentLoaded", function () {
  const mobileNav = document.querySelector(".mobile-nav");

  const displayMobileNav = function (links) {
    mobileNav.textContent = "";
    links.forEach((link) => {
      const html = `
          <li class="nav-item">
            <a class="nav-link" href="${link.link}">${link.name}</a>
          </li>
      `;
      mobileNav.insertAdjacentHTML("beforeend", html);
    });
  };
  displayMobileNav(navLinks);
});

document.addEventListener("DOMContentLoaded", function () {
  const quickLinks = document.querySelector(".quick-links");

  const displayQuickLinks = function (links) {
    quickLinks.textContent = "";
    links.forEach((link) => {
      const html = `<li><a href="${link.link}">${link.name}</a></li>`;
      quickLinks.insertAdjacentHTML("beforeend", html);
    });
  };
  displayQuickLinks(navLinks);
});
