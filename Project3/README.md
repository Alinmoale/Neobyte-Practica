# README

## Scripts Overview

This repository contains two PHP scripts:

### `index.php`

Retrieves data from a MySQL database and outputs it in JSON format.

#### Parameters

* `offset`: The offset of the data to retrieve (default: 0)
* `limit`: The limit of the data to retrieve (default: 10)



### `uploadcsv.php`

Uploads data from a CSV file to a MySQL database.

#### Requirements

* The CSV file must be located in the same directory as the script and named `netflix_titles.csv`.

## Configuration

Update the following configuration variables in both scripts:

* `$host`: The hostname or IP address of your MySQL server
* `$username`: The username to use for the MySQL connection
* `$password`: The password to use for the MySQL connection
* `$dbname`: The name of the MySQL database to use

## Requirements

* PHP 7.0 or later
* MySQL 5.6 or later
* PDO extension enabled


```sql
 CREATE DATABASE Movies;
 use Movies;

CREATE TABLE categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NULL,
  PRIMARY KEY (id)
);


CREATE TABLE movies (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  category_id INT NULL,
  PRIMARY KEY (id),
  KEY category_id (category_id)
);