const STORAGE_KEY = "feedback-form-state";

const formData = {
  email: "",
  message: "",
};

const form = document.querySelector(".feedback-form");

// Populate form on page load
const populateForm = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email?.trim() || "";
    formData.message = parsedData.message?.trim() || "";

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (error) {
    console.error("Error parsing saved form data from localStorage:", error);
  }
};

// Handle input changes (delegate event listener on the form)
const handleInput = (event) => {
  const name = event.target.name;
  const value = event.target.value;

  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
};

// Handle form submission
const handleSubmit = (event) => {
  event.preventDefault();

  // Validate fields
  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  // Output object to console
  console.log({ ...formData });

  // Clear storage and reset state
  localStorage.removeItem(STORAGE_KEY);
  formData.email = "";
  formData.message = "";
  form.reset();
};

form.addEventListener("input", handleInput);
form.addEventListener("submit", handleSubmit);

// Initialize form populating
populateForm();
