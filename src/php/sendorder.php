<?php
if ($_POST) {
    $cartData = $_POST["cartData"] ?? "";

    if ($cartData) {
        $cartArray = json_decode($cartData, true);
        if ($cartArray) {
            foreach ($cartArray as $item) {
                $name = $item["head"];
                $price = $item["price"];
                $size = $item["size"];
                $colorName = $item["colorName"];
            }
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
            $price = urlencode("$price");
            $name = urlencode("$name");
            $size = urlencode("$size");
            $colorName = urlencode("$colorName");
            
    
            $urlQuery = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" .
                "<b>Заявка з сайту: $websiteURL</b>%0A%0A" .
                "***<b>Форма замовлення</b>***%0A" . "%0A" .
                "Ім'я замовника: <b>$userName</b>%0A" . "%0A" .
                "Телефон: <b>$userPhone</b>%0A" . "%0A" .
                "===== Дані замовлення ===== " . "%0A%0A" .
                "Товар: <b>$name</b>%0A" .
                "Розмір: <b>$size</b>%0A" .
                "Колір: <b>$colorName</b>%0A" .
                "Ціна: <b>$price</b>%0A";
    
            $urlQuery .= "&parse_mode=HTML";
    
            $result = file_get_contents($urlQuery);
    
            header("Location: index.html");
            exit();
        } 

    } 

}

?>