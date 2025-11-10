PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`joined_at` text NOT NULL,
	`role` text DEFAULT 'regular' NOT NULL,
	`token` text
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "password", "joined_at", "role", "token") SELECT "id", "name", "password", "joined_at", "role", "token" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `user_friends` (
	`user_id` integer NOT NULL,
	`friend_id` integer NOT NULL,
	PRIMARY KEY(`user_id`, `friend_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`friend_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);