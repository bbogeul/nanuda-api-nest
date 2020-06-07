export class PRODUCT_CONSULT_NOTIFICATION {
  name: string;
  phone: string;
  hopeTime: string;
  referencedId: number;
}

export class VISIT_CONSULT_NOTIFICATION {
  name: string;
  phone: string;
  hopeTime: string;
  referencedId: number;
}

export class SPACE_ADDED_NOTIFICATION {
  phone: string;
  name: string;
  address: string;
  branch: string;
  referenceId: string;
}

export enum ConsultNotificationType {
  'visitConsult' = '방문자 상담',
  'spaceAdded' = '공간등록',
  'productConsult' = '상품 상담 신청',
}

export enum SlackUserName {
  'nanudaError' = 'NANUDA API ERROR',
  'nanudaConsult' = '공간등록/방문상담/상품상담 안내',
}
