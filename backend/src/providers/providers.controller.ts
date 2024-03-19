import { Controller, Post } from '@nestjs/common';
import { ProvidersService } from './providers.service';

@Controller()
export class ProvidersController {
  constructor(private providersService: ProvidersService) {}
    @Post('add')
    add(){
        return 'product added'
    }
    @Post('delete')
    delete(){
        return 'product deleted'
    }
}
