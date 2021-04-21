window.addEventListener("load", (e) => {
  const header = document.createElement("header");
  header.classList.add("header")
  document.body.appendChild(header);

  // Logo
  const logo = document.createElement("div");
  logo.classList.add("logo");
  const logo_a = document.createElement("a");
  logo_a.href = "main.html";
  logo_a.innerHTML = '<svg viewBox="0 0 157.17 29.04" class="logoImg"><path d="M103.14,38.73h-4V14.66l-4,2.48V13l4-2.69h4Z" transform="translate(-3.37 -9.98)"/><path d="M111.64,36.89A8.2,8.2,0,0,1,109.58,31V18a8.17,8.17,0,0,1,2.07-5.95,8.09,8.09,0,0,1,6-2.11q4,0,6,2.1a8.16,8.16,0,0,1,2.06,6V31a8.16,8.16,0,0,1-2.07,5.95,9.65,9.65,0,0,1-12.08,0Zm9.16-2.76a4.53,4.53,0,0,0,1-3.18V18a4.53,4.53,0,0,0-1-3.17,5,5,0,0,0-6.25,0,4.58,4.58,0,0,0-1,3.17V31a4.58,4.58,0,0,0,1,3.18,5,5,0,0,0,6.23,0Z" transform="translate(-3.37 -9.98)"/><path d="M138.51,38.73h-4V14.66l-4.05,2.48V13l4.05-2.69h4Z" transform="translate(-3.37 -9.98)"/><path d="M144.53,35.27l9.9-13.2a10,10,0,0,0,1.34-2.36,6.4,6.4,0,0,0,.47-2.27v0a3.46,3.46,0,0,0-1-2.64,4,4,0,0,0-2.83-.94,4,4,0,0,0-2.82,1,4.7,4.7,0,0,0-1.31,2.9v0h-4.12v0a10.72,10.72,0,0,1,1.44-4.17,7.38,7.38,0,0,1,2.8-2.64,8.45,8.45,0,0,1,4-.91,9.86,9.86,0,0,1,4.33.87,6.17,6.17,0,0,1,2.74,2.53,8.09,8.09,0,0,1,.93,4v0a8.71,8.71,0,0,1-.62,3.14A13.66,13.66,0,0,1,158,23.76L149.8,34.94h10.74v3.79h-16Z" transform="translate(-3.37 -9.98)"/><path d="M90,35v3.78H73.73V35Z" transform="translate(-3.37 -9.98)"/><path d="M6.46,38.1a7.94,7.94,0,0,1-3.09-2.58l3.26-2.34a3.71,3.71,0,0,0,1.58,1.48,5.25,5.25,0,0,0,2.41.53,4.56,4.56,0,0,0,3.6-1.44,6,6,0,0,0,1.28-4.07V10.33h4V29.7a11.24,11.24,0,0,1-1,5,7.12,7.12,0,0,1-3,3.18,9.84,9.84,0,0,1-4.8,1.1A9.43,9.43,0,0,1,6.46,38.1Z" transform="translate(-3.37 -9.98)"/><path d="M30.5,38.73h-4V10.33h4Z" transform="translate(-3.37 -9.98)"/><path d="M50.36,10.33H53.1l5.82,22.26,5-22.26h4.14l-6.94,28.4H57.08L51.85,18.88,46.38,38.73H42.32l-6.94-28.4h4.14l5,22.26Z" transform="translate(-3.37 -9.98)"/></svg>'

  const path = logo_a.getElementsByTagName("path");
  if (document.body.classList.contains("darkmode")) {
    for (let i = 0; i < 8; i++) {
      path[i].setAttribute("fill", "white");
    }
  } else {
    for (let i = 0; i < 8; i++) {
      path[i].setAttribute("fill", "rgba(30, 50, 39, 1)");
    }
  }
  logo.appendChild(logo_a);
  header.appendChild(logo);

  // List
  const main_menu = document.createElement("ul");
  main_menu.classList.add("main_menu");

  const main_menu_list_info = [["About me", "aboutMe.html"], ["Interactive works", "interactiveWork.html"], ["Pages", "page.html"], ["Design tools", "designTool.html"]];
  for (let i =0; i < 4; i++){
    let main_menu_list = document.createElement("li");
    let main_menu_list_a = document.createElement("a");
    main_menu_list_a.innerText = main_menu_list_info[i][0];
    main_menu_list_a.href = main_menu_list_info[i][1];
    main_menu_list.classList.add("main_menu_list")
    main_menu_list.appendChild(main_menu_list_a);
    main_menu.appendChild(main_menu_list);
  }
  header.appendChild(main_menu);


  if (document.getElementsByClassName("main_menu_list")[0].classList.contains("active")){
    document.styleSheets[3].cssRules[0].style.setProperty("left", "-377.5px");
  } else if (document.getElementsByClassName("main_menu_list")[1].classList.contains("active")){
    document.styleSheets[3].cssRules[0].style.setProperty("left", "-227.5px");
  } else if (document.getElementsByClassName("main_menu_list")[2].classList.contains("active")){
    document.styleSheets[3].cssRules[0].style.setProperty("left", "-77.5px");
  } else if (document.getElementsByClassName("main_menu_list")[3].classList.contains("active")){
    document.styleSheets[3].cssRules[0].style.setProperty("left", "72.5px");
  } else {
    document.styleSheets[3].cssRules[0].style.setProperty("left", "-377.5px");
  }

  // Menu button
  const menu_btn_wrap = document.createElement("div");
  const menu_btn = document.createElement("button");
  menu_btn_wrap.classList.add("menu_btn");
  for (let i = 0; i < 3; i++){
    let line = document.createElement("span");
    line.classList.add("menu_btn_line");
    line.classList.add(`menu_btn_line${i+1}`);
    menu_btn.appendChild(line);
  }
  menu_btn_wrap.appendChild(menu_btn);
  header.appendChild(menu_btn_wrap);

})
