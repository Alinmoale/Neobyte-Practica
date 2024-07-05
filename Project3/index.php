<?php
require_once 'db_config.php';

$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Retrieve data from the database
$offset = isset($_GET['offset'])? (int) $_GET['offset'] : 0;
$limit = isset($_GET['limit'])? (int) $_GET['limit'] : 10;

$stmt = $conn->prepare("SELECT m.id, m.title, c.name AS category FROM movies m JOIN categories c ON m.category_id = c.id ORDER BY m.id LIMIT :limit OFFSET :offset");
$stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Output data in JSON format
header('Content-Type: application/json');
echo json_encode($data);

