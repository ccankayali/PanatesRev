import { Controller, Get, Post, Req } from "@nestjs/common";
import { ProvidersService } from "./providers.service";
import { request } from "http";

@Controller('providers')
export class ProvidersController{
    constructor(private readonly providerService:ProvidersService){}
    @Get()
    async getProvider(@Req() request){
        const provId = request.company.id;
        return this.providerService.getProviders(provId)
    }
    
    //services add
    //services delete
    //services update
}