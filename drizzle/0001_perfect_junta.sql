CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`serviceType` varchar(100) NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientPhone` varchar(20) NOT NULL,
	`clientEmail` varchar(320),
	`location` varchar(255),
	`description` text,
	`preferredDate` varchar(50),
	`preferredTime` varchar(50),
	`status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contactInquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','read','responded') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contactInquiries_id` PRIMARY KEY(`id`)
);
