// --------------------
// Part 1: Event Handling
// --------------------
// Hover effect on fields
document.querySelectorAll("input, textarea, select").forEach(field => {
  field.addEventListener("mouseenter", () => field.classList.add("tooltip-hover"));
  field.addEventListener("mouseleave", () => field.classList.remove("tooltip-hover"));
});

// Click-to-Reveal Instructions
document.getElementById("passwordHelp").addEventListener("click", () => {
  const help = document.getElementById("passwordInstructions");
  help.style.display = (help.style.display === "none") ? "block" : "none";
});

// Show/Hide content (Password)
document.getElementById("togglePassword").addEventListener("click", () => {
  const passwordField = document.getElementById("password");
  passwordField.type = (passwordField.type === "password") ? "text" : "password";
});

// Keyboard Input Feedback + Progress Bar
const essay = document.getElementById("essay");
const wordCount = document.getElementById("wordCount");
const progressBarFill = document.getElementById("progressBarFill");

essay.addEventListener("input", () => {
  const words = essay.value.trim().split(/\s+/).filter(w => w.length > 0);
  const count = words.length;
  wordCount.textContent = `${count}/200 words`;

  let percentage = 100 - Math.min((count / 200) * 100, 100);
  progressBarFill.style.width = percentage + "%";

  if (count > 200) {
    essay.value = words.slice(0, 200).join(" ");
  }
});

// --------------------
// Part 2: Interactive Elements
// --------------------
// Light/Dark Mode Toggle
document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// FAQ Toggle
document.querySelectorAll(".faq-question").forEach(q => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;
    answer.style.display = (answer.style.display === "block") ? "none" : "block";
  });
});

// Tabs
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// --------------------
// Part 3: Form Validation
// --------------------
document.getElementById("applicationForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  // Email validation
  const email = document.getElementById("email").value;
  const emailError = document.getElementById("emailError");
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = "Invalid email format.";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  // Password validation
  const password = document.getElementById("password").value;
  const passwordError = document.getElementById("passwordError");
  const passwordRegex = /^(?=.*[!@#\$%\^&\*]).{6,}$/;
  if (!passwordRegex.test(password)) {
    passwordError.textContent = "Password must be at least 6 chars and include a special symbol.";
    valid = false;
  } else {
    passwordError.textContent = "";
  }

  // Phone number validation
  const phone = document.getElementById("phone").value;
  if (!phone.startsWith("07") || phone.length !== 10) {
    alert("Phone number must start with 07 and be 10 digits long.");
    valid = false;
  }

  // Required fields
  const requiredFields = ["firstName", "secondName", "university"];
  for (let field of requiredFields) {
    if (!document.getElementById(field).value.trim()) {
      alert("Please fill out all required fields.");
      valid = false;
      break;
    }
  }

  if (valid) {
    alert("Application submitted successfully!");
    document.getElementById("status").innerHTML = "<p>Application submitted successfully. Await email confirmation.</p>";
  }
});
