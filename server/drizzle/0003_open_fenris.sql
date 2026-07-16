CREATE TYPE "public"."trip_status" AS ENUM('draft', 'dispatched', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "trips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_number" text NOT NULL,
	"source" text NOT NULL,
	"destination" text NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"driver_id" uuid NOT NULL,
	"cargo_weight" double precision NOT NULL,
	"planned_distance" double precision NOT NULL,
	"actual_distance" double precision,
	"start_odometer" integer NOT NULL,
	"end_odometer" integer,
	"status" "trip_status" DEFAULT 'draft' NOT NULL,
	"created_by" uuid NOT NULL,
	"dispatched_at" timestamp,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "trips_trip_number_unique" UNIQUE("trip_number")
);
--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_driver_id_drivers_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "trip_number_idx" ON "trips" USING btree ("trip_number");--> statement-breakpoint
CREATE INDEX "trip_vehicle_idx" ON "trips" USING btree ("vehicle_id");--> statement-breakpoint
CREATE INDEX "trip_driver_idx" ON "trips" USING btree ("driver_id");--> statement-breakpoint
CREATE INDEX "trip_status_idx" ON "trips" USING btree ("status");