CREATE TABLE `brands` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`image` blob
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text
);
--> statement-breakpoint
CREATE TABLE `games` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`thumbnail` blob,
	`companyId` text NOT NULL,
	`trailerId` text,
	FOREIGN KEY (`trailerId`) REFERENCES `brands`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `games_categories` (
	`game_id` text NOT NULL,
	`category_id` text NOT NULL,
	PRIMARY KEY(`game_id`, `category_id`),
	FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `trailers` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL
);
