
<div class="spivpracia_popup"> <a class="cancel_spivpracia" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M1 15L14.7071 1M15 15L1.29291 1" stroke="#121212" stroke-width="1.5" stroke-linecap="round"/>
</svg></a>
  <h2>Введіть свої дані і ми з Вами зв'яжемося! </h2>
  <form action="sendcontact.php" method="post"> 
    <div class="name">
      <label for="name"> </label>
      <input id="name" type="text" name="userName" minlength="3" maxlength="30" placeholder="введіть ваше імʼя*" required="" oninput="this.value = this.value.replace(/[^a-zA-Zа-яА-ЯїЇєЄіІґҐs]/g, '')"/>
    </div>
    <div class="phone">
      <label for="phone"> </label>
      <input class="phoneInput inputMask" type="tel" name="userPhone" placeholder="введіть ваш телефон*" required="" maxlength="13"/><span class="error-tel"></span>
    </div>
    <input type="hidden" id="orderWebsiteURL2" name="orderWebsiteURL"/>
    <div class="wrapper tac_form_btn">
      <button class="submit-btn" type="submit">Відправити</button>
    </div>
  </form>
</div>