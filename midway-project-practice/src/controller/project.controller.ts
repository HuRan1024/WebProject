import { Body, Controller, Post} from '@midwayjs/core';
import { Project } from '../service/project.service';

export class ProjectDto {
    name: string;
    discription: string;
    members: string;   // 不同成员之间需要以','为分割
    password: string;
}

@Controller('/project')
export class projectController {

    @Post('/create')
    async createANewProject(@Body() form: ProjectDto) {
        let newProject = new Project(0, form.name, form.discription, form.members.split(','), [], form.password)
        if (newProject.storeAProject()) {
            return {
                status: 'success',
                message: '创建成功'
            };
        } else {
            return {
                status: 'failed',
                message: '创建失败'
            };
        }
    }

}