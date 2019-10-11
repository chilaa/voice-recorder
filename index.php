<?php

if ($_SERVER['REQUEST_URI'] == '/save') {
    // print_r($_POST['audio']);
    $blob = $_POST['audio'].type;
    print_r($_POST['audio']->value);

}
