export interface ILaunch {
	flight_number: number;
	mission_name: string;
	mission_id: number[];
	upcoming: boolean;
	launch_year: string;
	launch_date_unix: number;
	launch_date_utc: string | Date;
	launch_date_local: string | Date;
	is_tentative: boolean;
	tentative_max_precision: string;
	tbd: boolean;
	launch_window: number;
	rocket: {
		rocket_id: string;
		rocket_name: string;
		rocket_type: string;
		first_stage: {
			cores: {
				core_serial: string;
				flight: number;
				block?: unknown;
				gridfins: boolean;
				legs: boolean;
				reused: boolean;
				land_success?: unknown;
				landing_intent: boolean;
				landing_type?: unknown;
				landing_vehicle?: unknown;
			}[];
		};
		second_stage: {
			block: number;
			payloads: {
				payload_id: string;
				norad_id: number[];
				reused: boolean;
				customers: string[];
				nationality: string;
				manufacturer: string;
				payload_type: string;
				payload_mass_kg: number;
				payload_mass_lbs: number;
				orbit: string;
				orbit_params: {
					reference_system: string;
					regime: string;
					longitude?: unknown;
					semi_major_axis_km?: unknown;
					eccentricity?: unknown;
					periapsis_km: number;
					apoapsis_km: number;
					inclination_deg: number;
					period_min?: unknown;
					lifespan_years?: unknown;
					epoch?: unknown;
					mean_motion?: unknown;
					raan?: unknown;
					arg_of_pericenter?: unknown;
					mean_anomaly?: unknown;
				};
			}[];
		};
		fairings: {
			reused: boolean;
			recovery_attempt: boolean;
			recovered: boolean;
			ship?: unknown;
		};
	};
	ships: unknown;
	telemetry: {
		flight_club?: unknown;
	};
	launch_site: {
		site_id: string;
		site_name: string;
		site_name_long: string;
	};
	launch_success: boolean;
	launch_failure_details: {
		time: number;
		altitude?: unknown;
		reason: string;
	};
	links: {
		mission_patch: string;
		mission_patch_small: string;
		reddit_campaign?: unknown;
		reddit_launch?: unknown;
		reddit_recovery?: unknown;
		reddit_media?: unknown;
		presskit?: unknown;
		article_link: string;
		wikipedia: string;
		video_link: string;
		youtube_id: string;
		flickr_images: unknown;
	};
	details: string;
	static_fire_date_utc: string | Date;
	static_fire_date_unix: number;
	timeline: {
		webcast_liftoff: number;
	};
	crew?: unknown;
}
