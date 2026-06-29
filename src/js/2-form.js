const STORAGE_KEY = "feedback-form-state";

const formData = {
  email: "",
  message: "",
};

const form = document.querySelector(".feedback-form");

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

const handleInput = (event) => {
  const name = event.target.name;
  const value = event.target.value;

  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log({ ...formData });

  localStorage.removeItem(STORAGE_KEY);
  formData.email = "";
  formData.message = "";
  form.reset();
};

populateForm();

form.addEventListener("input", handleInput);
form.addEventListener("submit", handleSubmit);
