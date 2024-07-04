<?php
$host = "127.0.0.1"; 
$username = "root";
$password = "pass";
$dbname = "Movies";

$default_limit = 10; // default limit
$default_offset = 0; // default offset

$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Retrieve data from the database
$offset = isset($_GET['offset'])? (int) $_GET['offset'] : $default_offset;
$limit = isset($_GET['limit'])? (int) $_GET['limit'] : $default_limit;

$stmt = $conn->prepare("SELECT m.id, m.title, c.name AS category FROM movies m JOIN categories c ON m.category_id = c.id ORDER BY m.id LIMIT :limit OFFSET :offset");
$stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Output data in JSON format
header('Content-Type: application/json');
echo json_encode($data);

