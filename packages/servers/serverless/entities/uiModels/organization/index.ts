export class OrgLicensesDetails {
  license_count: number;
  assigned_licenses_count: number;
  constructor(license_count?: number, assigned_licenses_count?: number) {
    this.license_count = license_count;
    this.assigned_licenses_count = assigned_licenses_count;
  }
}
