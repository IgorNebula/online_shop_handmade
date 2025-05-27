import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export class UsersModule {
  controller: UsersController;
  service: UsersService;

  constructor(usersService: UsersService) {
    this.service = usersService;
    this.controller = new UsersController(usersService);
  }
}
