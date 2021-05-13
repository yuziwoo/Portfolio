window.addEventListener("load", (e) => {
  if (!localStorage.getItem("portfolio1012")[2]) {
    window.location.href = "m_contact.html";
  }

  document.getElementsByClassName("openKakao")[0].style.opacity = 1;

})
