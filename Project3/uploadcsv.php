<?php
$host = "127.0.0.1"; // Replace with the IP address of your Docker container
$username = "root";
$password = "pass";
$dbname = "Movies";

try {
  $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully\n";

  // Load CSV file
  $csv_file = './netflix_titles.csv';
  if (!file_exists($csv_file)) {
      die("CSV file not found: $csv_file\n");
  }

  $fp = fopen($csv_file, 'r');
  if (!$fp) {
      die("Failed to open CSV file: $csv_file\n");
  }

  // Skip the header row if present
  $header = fgetcsv($fp, 1000, ",");

  $data = array();
  while (($row = fgetcsv($fp, 1000, ","))!== FALSE) {
      $data[] = $row;
  }

  fclose($fp);

  if (empty($data)) {
      die("No data found in CSV file\n");
  }

  $categories = array(); // Store unique categories
  $category_ids = array(); // Store category IDs

  $conn->beginTransaction(); // Start transaction

  // Insert categories
  foreach ($data as $row) {
      if (count($row) < 11) {
          echo "Invalid row format: ". implode(", ", $row). "\n";
          continue;
      }

      $listed_in = explode(', ', $row[10]); // Split categories by comma
      $category = trim($listed_in[0]); // Get the first category

      if (!in_array($category, $categories)) { // Check if category is not already inserted
          $categories[] = $category; // Add category to the array

          $sql = "INSERT INTO categories (name) VALUES (:name)";
          $stmt = $conn->prepare($sql);
          $stmt->bindParam(':name', $category);

          if ($stmt->execute()) {
              $category_id = $conn->lastInsertId(); // Get the last inserted ID
              $category_ids[$category] = $category_id; // Store category ID
              echo "Inserted: $category\n"; // Debug statement
          } else {
              echo "Failed to insert: $category\n";
          }
      }
  }

  // Insert movies
  foreach ($data as $row) {
      if (count($row) < 2) {
          echo "Invalid row format: ". implode(", ", $row). "\n";
          continue;
      }

      $title = $row[2]; // Assuming title is in the 3rd column
      $listed_in = explode(', ', $row[10]); // Split categories by comma
      $category = trim($listed_in[0]); // Get the first category
      $category_id = $category_ids[$category]; // Get the category ID

      $sql = "INSERT INTO movies (title, category_id) VALUES (:title, :category_id)";
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':title', $title);
      $stmt->bindParam(':category_id', $category_id);

      if ($stmt->execute()) {
          echo "Inserted: $title\n"; // Debug statement
      } else {
          echo "Failed to insert: $title\n";
      }
  }

  $conn->commit(); // Commit transaction
  echo "Data inserted successfully\n";

} catch (PDOException $e) {
  if ($conn) {
      $conn->rollBack(); // Rollback transaction on error
  }
  die("Connection failed: ". $e->getMessage());
}
