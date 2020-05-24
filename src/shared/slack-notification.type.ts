export interface ProductConsultNotification {
  name: string;
  phone: string;
  hopeTime: string;
  referencedId: number;
}

export interface VisitConsultNotification {
  name: string;
  phone: string;
  hopeTime: string;
  referencedId: number;
}

export interface SpaceAddedNotification {
  phone: string;
  name: string;
  address: string;
  branch: string;
  referenceId: string;
}
