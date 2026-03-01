/*main.js*/

/*this means wait until the HTML has fully loaded before running this Javascript, 
in other words wait for the event of all DOM content to load before loading the rest of the javascript
(like as a function)*/
document.addEventListener("DOMContentLoaded", () => {

  /*breathing effect of the images is created here*/
  /*this function selects all the img elements inside elements with class .lesson_imgs,
  storing it within a constant like an array. And then it loops through each image and it adds the animation class
  defined in the CSS for breathe. then after 2.5 seconds it removes the class so that it resets.*/
  function triggerBreathing() {
    const images = document.querySelectorAll(".lesson_imgs img");
    images.forEach(img => {
      img.classList.add("breathe");
      setTimeout(() => img.classList.remove("breathe"), 2500);
    });
  }
  /*this calls the function to run infinetly*/
  triggerBreathing();
  /*this ensures the function is only called every 5 seconds*/
  setInterval(triggerBreathing, 5000);


  /*link click counter is created here*/
  /*creating a variable to count link clicks. storing the elements for the link and the counter inside of constants.
  doing a safety check to see if both elements exist, adding a click listener so once the link is clicked the variable is incremented
  and the content of the counter display is updated to the new value of the click counter variable*/
  let clickCount = 0;
  const w3Link = document.getElementById("w3link");
  const counterDisplay = document.getElementById("w3counter");

  if (w3Link && counterDisplay) {
    w3Link.addEventListener("click", () => {
      clickCount++;
      counterDisplay.textContent = `Link clicked: ${clickCount} times`;
    });
  }


  /*subscribe modal*/
  /*making each variable store a reference to the respective HTML elements.*/
  const subscribeModal = document.getElementById("subscribeModal");
  const closeSubscribeBtn = document.getElementById("closeModalBtn");
  const subscribeForm = document.getElementById("subscribeForm");
  const subscribeEmail = document.getElementById("subscribeEmail");
  const subscribeMsg = document.getElementById("subscribeMsg");

  /*function for closing/hiding the modal by removing the show class. removing the text content
  and resetting the form*/
  function closeSubscribe() {
    subscribeModal.classList.remove("show");
    subscribeModal.setAttribute("aria-hidden", "true");
    subscribeMsg.textContent = "";
    subscribeForm.reset();
  }

  /*checking if the modal exists then setting a timer to show the modal after 5 seconds by adding the show class to the modal
  which is linked to the properties in the CSS file. and also automatically putting the cursor in the input field.*/
  if (subscribeModal) {
    setTimeout(() => {
      subscribeModal.classList.add("show");
      subscribeModal.setAttribute("aria-hidden", "false");
      subscribeEmail.focus();
    }, 5000);

    /*when the user clicks "not now" button the close modal function is run*/
    closeSubscribeBtn.addEventListener("click", closeSubscribe);

    /*when the user clicks outside the model content , rather in the dark background which is
    covered by the whole modal container, the modal closes*/
    subscribeModal.addEventListener("click", (e) => {
      if (e.target === subscribeModal) closeSubscribe();
    });

    /*when the user clicks to submit the form, e.preventDefault() ensures page is not reloaded.
    the value stored in the text box is stored in a constant without any spaces.
    then it is updated in the subscribe message element and then the modal closes after 1.2 seconds*/
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = subscribeEmail.value.trim();
      subscribeMsg.textContent = `Thanks! Subscription saved for: ${email}`;
      setTimeout(closeSubscribe, 1200);
    });
  }


  /*Contact Modal*/
  /*making each variable store a reference to the respective HTML elements.*/
  const contactBtn = document.getElementById("contactBtn");
  const contactModal = document.getElementById("contactModal");
  const closeContactBtn = document.getElementById("closeContact");
  const contactForm = document.getElementById("contactForm");

  /*creating a function to open the contact modal , adding the class of show to the element*/
  function openContact() {
    contactModal.classList.add("show");
    contactModal.setAttribute("aria-hidden", "false");
  }
  /*creating a function to close the contact modal , removing the class of show to the element and resetting
  the details in the form to be used later*/
  function closeContactModal() {
    contactModal.classList.remove("show");
    contactModal.setAttribute("aria-hidden", "true");
    contactForm.reset();
  }

  /*again, checking if both contact button and contact modal exist for safety, then checking to see if the contact button
  has been clicked and opening the modal if so. then checking to see if the close button has been clicked and closing if so.
  then checked if the outside of the modal has been clicked and closing the modal if so. Then checking if the form has been
  submitted and again preventing the reloading of the page (the default behaviour). Getting the values inside of the text fields
  as constants and removing any spaces or empty space at the end. Then creating a new constant for the subject and the body.
  Using the encodeURIComponent to make the text safe for URLs. Then opening the default email application with the pre-filled
  subject and body. then closes the contact modal afterwards.*/
  if (contactBtn && contactModal) {
    contactBtn.addEventListener("click", openContact);

    closeContactBtn.addEventListener("click", closeContactModal);

    contactModal.addEventListener("click", (e) => {
      if (e.target === contactModal) closeContactModal();
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("studentName").value.trim();
      const email = document.getElementById("studentEmail").value.trim();
      const message = document.getElementById("studentMessage").value.trim();

      const subject = encodeURIComponent(`Message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

      window.location.href = `mailto:wcarr@agsb.co.uk?subject=${subject}&body=${body}`;

      closeContactModal();
    });
  }


  /*if the key pressed is not escape , return nothing from the function.
  However if it is escape, check and see if the contact modal's or the subscibe modal's class list contains show, if so
  call the close modal functions for the respective modals */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (contactModal?.classList.contains("show")) closeContactModal();
    if (subscribeModal?.classList.contains("show")) closeSubscribe();
  });

  /*theme switcher*/

  /*creating constants for getting the references to the html elements, selecting all radio buttons
  with the name theme*/
  const themeLink = document.getElementById("themeStylesheet");
  const themeRadios = document.querySelectorAll('input[name="theme"]');

  /*creating a map(like a dictionary) with all 3 themes acting like variables to be referenced later*/
  const themeMap = {
    professional: "Professional.css",
    accessible: "Accessible.css",
    neon: "FreeChoice.css"
  };

  /*function for setting either of the 3 themes, taking the themeName as a parameter
  ,safety check to see if the themelink doesnt exist then dont continue
  with the rest of the function. The storing the file name by referencing the dicitonary with the respective themeName.
  then changing the href attribute of the link tag to the new style sheet file. Then using local storage we set
  the theme to their choice of style sheet by storing it in the browsers storage even when refreshed.*/
  function setTheme(themeName) {
    if (!themeLink) return;
    const file = themeMap[themeName];
    themeLink.setAttribute("href", file);
    localStorage.setItem("theme", themeName);
  }

  /*then here we get the saved theme here before and store it in a variable, if there is no "theme" then stored as "neon".
  Then the setTheme function is called to set the theme.*/
  const savedTheme = localStorage.getItem("theme") || "neon";
  setTheme(savedTheme);

  /*find the radio button element with the value that matches the saved theme and sets its at*/
  const radioToCheck = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
  if (radioToCheck) radioToCheck.checked = true;

  /*each radio button has its own event listener added when there is a change it runs the setTheme function passing the value
  of the particular radio button to the function and changing the theme.*/
  themeRadios.forEach(radio => {
    radio.addEventListener("change", () => setTheme(radio.value));
  });

});