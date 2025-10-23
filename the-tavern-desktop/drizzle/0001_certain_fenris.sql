CREATE TABLE `chatrooms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`imgref` text
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`chatroom_id` integer NOT NULL,
	`message` text NOT NULL,
	`datesendt` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`chatroom_id`) REFERENCES `chatrooms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_chatrooms` (
	`user_id` integer NOT NULL,
	`chatroom_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `chatroom_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`chatroom_id`) REFERENCES `chatrooms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP INDEX `users_email_unique`;--> statement-breakpoint
ALTER TABLE `users` ADD `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `joined_at` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `role` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `token` text;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `email`;