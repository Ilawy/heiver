CREATE TABLE `days` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`owner` integer NOT NULL,
	`added_at` integer NOT NULL,
	`note` text NOT NULL,
	FOREIGN KEY (`owner`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
