# Chat Morze:
Додаток для відправлення та отримання повідомлень у форматі абетки-Морзе. Для відправлення повідомлення необхідно зареєструватись: зайти під своїм ім'ям та вибравши свою роль(
  User(значення по замовчуванню) | Admin | NewBy).
  Повідомлення можна написати та отримати тільки зареєстрованому користувачу. Для відправлення повідослення необхідно указати кому буде надіслане повідомлення. Його зможе отримати тільки той користувач, якому воно надіслане.
  Повідомлення відправляється тільки у форматі абетки-Морзе. 
  Тільки . чи -, також відокремлювати букви можна пробілом.

  Ролі: Користувач, який вибрав роль NewBy, може розшифровувати повідомлення. Для цього необхідно натиснути на іконку "око", яке буде доступно цьому користувачу у полі де він відпарвляє чи отримує повідомлення.

  Можливість шифрувати повідомлення паролем: Якщо вибрати чек бокс шифрування повідомлень, то зявиться поле паролю, який необхідно вказати, завдяки якому, у чаті можливо буде розшифрувати повідомлення. Користувач, який використовую шифрування, бачить напроти повідомлення іконку-ключ, якщо на нього натиснути то зявиться поле для паролю, необхідно вказати той пароль, що при логіні, і повідомлення розшифрується у звизайну морзянку. Також ніякі дані не передаються і не зберігаються на стороні сервера, згідно з посатвленою задачею. 

## Installation

1. Клонуйте репозиторій проекту на свій комп’ютер.
    <br>
    git clone https://github.com/BondarenkoDmitriy/infotechTT-chat-morze-frontEnd.git

3. Відкрийте термінал або командний рядок і перейдіть до папки проекту.
    <br>
    cd infotecht-chat-morze

4. Встановіть залежності, виконавши таку команду
    <br>
    npm i

5. Запустіть додаток, виконавши таку команду
    <br>
    npm start

## Technologies used:
  HTML | CSS (SASS, module styles) | Metodoligy BEM | React.js v18 (FC, hooks) | TypeScript | classnames | fortawesome | socket.io | Short Unique id

## Автор
  Бондаренко Дмитро

