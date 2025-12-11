export class UserPackage {
  constructor(
    public id: string | null,
    public ownerId: string,
    public origin: string,
    public destination: string,
    public package_status_id: string,
  ) {}
}
