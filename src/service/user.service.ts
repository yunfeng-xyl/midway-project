import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../interface';
import UserEntity from '../entity/user.entity';
import { Repository } from 'typeorm';


@Provide()
export class UserService {

  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  async getUserByUsernameAndPassword({ username, password }: User) {
    const user = await this.userModel.findOne({ where: { username, password } });

    return user;
  }

  async saveUser({ username, password }: User) {
    let user = new UserEntity();
    user.username = username;
    user.password = password;

    const result = await this.userModel.save(user);

    return result;
  }
}
