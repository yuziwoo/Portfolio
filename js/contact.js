window.addEventListener("load", (e) => {
  if (document.body.classList.contains("mobile")) {
    window.location.href = "m_contact.html";
  }

  document.getElementsByClassName("openKakao")[0].style.opacity = 1;

})
