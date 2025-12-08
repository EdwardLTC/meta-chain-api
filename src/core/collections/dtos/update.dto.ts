import { PickType } from '@nestjs/swagger';
import { CreateCollectionDto } from './create.dto';

export class UpdateDto extends PickType(CreateCollectionDto, ['royaltyFeeBps']) {}
