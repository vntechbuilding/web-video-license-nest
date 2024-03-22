import { PublisherIdValid } from '../middleware/validator/publisher/publisher-id.valid';
import { decorate } from 'ts-mixer';

export class PublisherIdDto {
  @decorate(PublisherIdValid({ message: 'Publisher không hợp lệ' }))
  readonly publisherId: string = null;
}
