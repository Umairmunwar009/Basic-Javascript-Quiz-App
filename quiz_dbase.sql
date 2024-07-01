-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2024 at 02:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz_dbase`
--

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `option_id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `option_text` text DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`option_id`, `question_id`, `option_text`, `is_correct`) VALUES
(1, 1, '14', 0),
(2, 1, '20', 1),
(3, 1, 'Error', 0),
(4, 1, '23', 0),
(5, 2, '_abc', 0),
(6, 2, '123', 1),
(7, 2, 'abc123', 0),
(8, 2, 'None of the above', 0),
(9, 3, 'Hello Hello Hello', 1),
(10, 3, 'Hello Hello', 0),
(11, 3, 'HelloHelloHello', 0),
(12, 4, '{}', 1),
(13, 4, 'dict()', 1),
(14, 4, 'None', 0),
(15, 4, '0', 0),
(16, 5, 'Combining two or more sequences into a single sequence of tuples', 1),
(17, 5, 'Sorting a sequence', 0),
(18, 5, 'Filtering a sequence', 0),
(19, 5, 'None of the above', 0),
(20, 6, '1', 1),
(21, 6, '3', 0),
(22, 6, '0', 0),
(23, 6, 'Error', 0),
(24, 7, 'Removes all occurrences of a character from the string', 0),
(25, 7, 'Removes leading and trailing whitespace', 1),
(26, 7, 'Removes leading whitespace', 0),
(27, 7, 'Removes trailing whitespace', 0),
(28, 8, '2', 1),
(29, 8, '1', 0),
(30, 8, '0', 0),
(31, 8, '-1', 0),
(32, 9, '<>', 0),
(33, 9, '==', 1),
(34, 9, '<=', 0),
(35, 9, '>=', 0),
(36, 10, 'A list of tuples containing indices and items', 1),
(37, 10, 'A list containing only the indices', 0),
(38, 10, 'A list containing only the items', 0),
(39, 10, 'None of the above', 0),
(40, 11, '2', 1),
(41, 11, '4', 0),
(42, 11, '1', 0),
(43, 11, '3', 0),
(44, 12, '[1, 2, 3, 4]', 1),
(45, 12, '[1]', 0),
(46, 12, '[1, 2]', 0),
(47, 12, 'None of the above', 0);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  `question_text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `quiz_id`, `question_text`) VALUES
(1, 1, 'What is the output of print(2 + 3 * 4)?'),
(2, 1, 'Which of the following is an invalid variable name in Python?'),
(3, 1, 'What will be the output of the following Python code snippet?\nprint(\"Hello \" * 3)'),
(4, 1, 'How do you create an empty dictionary in Python?'),
(5, 1, 'What is the main use of Python’s `zip()` function?'),
(6, 1, 'What is the output of the following Python code snippet?\nprint(len([1, 2, 3][::-1]))'),
(7, 1, 'Which of the following statements is true about Python’s string `strip()` method?'),
(8, 1, 'What will be the output of the following Python code snippet?\nprint(\"Hello\".find(\"e\"))'),
(9, 1, 'Which of the following is not a valid comparison operator in Python?'),
(10, 1, 'What does the `enumerate()` function in Python return?'),
(11, 1, 'What is the output of the following Python code snippet?\nprint(min([1, 2, 3, 4], key=lambda x: x % 2))'),
(12, 1, 'Which of the following is true about Python’s `list()` constructor?');

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `quiz_id` int(11) NOT NULL,
  `quiz_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`quiz_id`, `quiz_name`, `description`) VALUES
(1, 'Python Quiz', 'A quiz to test your knowledge of Python programming.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`quiz_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `quiz_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`quiz_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
