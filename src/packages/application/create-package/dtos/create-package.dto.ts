export class CreatePackageDto {
  ownerId: string;
  origin: string;
  destination: string;
  package_status_id?: string;
}

export class CreatePackageResponseDto {
  id: string;
  ownerId: string;
  origin: string;
  destination: string;
  package_status_id?: string;
  created_at?: Date;
}
