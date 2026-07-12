CREATE TYPE "public"."vehicle_status" AS ENUM('available', 'on_trip', 'in_shop', 'retired');--> statement-breakpoint
CREATE TYPE "public"."vehicle_type" AS ENUM('truck', 'van', 'pickup', 'trailer', 'motorcycle', 'car', 'bus', 'other');--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"registration_number" text NOT NULL,
	"name" text NOT NULL,
	"model" text NOT NULL,
	"type" "vehicle_type" NOT NULL,
	"max_load_capacity" double precision NOT NULL,
	"odometer" integer DEFAULT 0 NOT NULL,
	"acquisition_cost" numeric(12, 2) NOT NULL,
	"region" text,
	"status" "vehicle_status" DEFAULT 'available' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vehicles_registration_number_unique" UNIQUE("registration_number")
);
--> statement-breakpoint
CREATE INDEX "vehicles_status_idx" ON "vehicles" USING btree ("status");--> statement-breakpoint
CREATE INDEX "vehicles_type_idx" ON "vehicles" USING btree ("type");--> statement-breakpoint
CREATE INDEX "vehicles_region_idx" ON "vehicles" USING btree ("region");--> statement-breakpoint
CREATE INDEX "vehicles_status_type_idx" ON "vehicles" USING btree ("status","type");