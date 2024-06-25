document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/register", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const popup = document.getElementById("popup");
        const popupMessage = document.getElementById("popupMessage");

        if (xhr.status === 200) {
          popupMessage.textContent = "User registered successfully.";
          popup.classList.add("show");
          setTimeout(() => {
            popup.classList.remove("show");
          }, 3000);
        } else {
          popupMessage.textContent = "Error registering user.";
          popup.classList.add("show");
          setTimeout(() => {
            popup.classList.remove("show");
          }, 3000);
        }
      }
    };

    const data = `username=${encodeURIComponent(
      username
    )}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(
      password
    )}`;
    xhr.send(data);
  });
