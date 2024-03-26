export class CreateServicesDTO {
  //dışa aktarımda hata alırsak export interface CreateServicesDTO şeklinde yazcaz
  service_id:string
  name: string;
  description: string;
  category: string;
}
