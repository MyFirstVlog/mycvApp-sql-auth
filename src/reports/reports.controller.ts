import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report-dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){

    }

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return this.reportsService.create(body, user);
    }
}
