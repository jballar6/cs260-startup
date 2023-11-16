async function login() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "loggedin.html";
  const response = await fetch('/api/userlogs', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(nameEl.value),
  });
}