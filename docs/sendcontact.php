<?php 
    try {
        $userPhone = $_POST["userPhone"];
        $userName = $_POST["userName"];
        $websiteURL = $_POST["orderWebsiteURL"];
    } catch (\Throwable $th) {
        $userPhone = "ERROR IN MESSAGE";
        $userName = "ERROR IN MESSAGE";
        $websiteURL = "ERROR IN MESSAGE";
    }
    $token = "7798336221:AAGJeMUYFzLFrJjKtX9y6ETnehWcg1qQr20"; // api телеграм бота
    $chat_id = "-1002433912580";

    // $token = "6502486274:AAFqSGBvtvutHB8be-wTlsK3ETbssmLSEWo"; // api телеграм бота
    // $chat_id = "1066741091";

    $userPhone = urlencode("$userPhone");
    $userName = urlencode("$userName");
    

    $urlQuery = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" .
        "<b>Заявка з сайту: $websiteURL</b>%0A%0A" .
        "***<b>Форма співпраці</b>***%0A" . "%0A" .
        "Ім'я замовника: <b>$userName</b>%0A" . "%0A" .
        "Телефон: <b>$userPhone</b>%0A" . "%0A" .

    $urlQuery .= "&parse_mode=HTML";

    $result = file_get_contents($urlQuery);

    header("Location: index.html");
    exit();

?>