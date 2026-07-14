CREATE TYPE "public"."driver_status" AS ENUM('available', 'on_trip', 'off_duty', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."license_category" AS ENUM('motorcycle', 'light_motor_vehicle', 'heavy_goods_vehicle', 'passenger_vehicle');--> statement-breakpoint
CREATE TABLE "drivers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"license_number" text NOT NULL,
	"license_category" "license_category" NOT NULL,
	"license_expiry_date" date NOT NULL,
	"safety_score" integer DEFAULT 100 NOT NULL,
	"status" "driver_status" DEFAULT 'available' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "drivers_email_unique" UNIQUE("email"),
	CONSTRAINT "drivers_license_number_unique" UNIQUE("license_number")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "driver_license_idx" ON "drivers" USING btree ("license_number");--> statement-breakpoint
CREATE INDEX "driver_status_idx" ON "drivers" USING btree ("status");--> statement-breakpoint
CREATE INDEX "driver_license_expiry_idx" ON "drivers" USING btree ("license_expiry_date");