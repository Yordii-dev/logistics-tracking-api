export enum PackageStatusEnum {
  PENDING = 'Pendiente',
  IN_TRANSIT = 'En Transito',
  DELIVERED = 'Entregado',
}

export class Package {
  constructor(
    public id: string | null,
    public ownerId: string,
    public origin: string,
    public destination: string,
    public package_status_id: string,
  ) {}
}
