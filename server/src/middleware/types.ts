export const Roles = {
    FleetManager: "fleet_manager",
    Dispatcher: "dispatcher",
    SafetyOfficer: "safety_officer",
    FinancialAnalyst: "financial_analyst",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];