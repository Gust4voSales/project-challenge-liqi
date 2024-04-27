import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUserService {
  async execute(request: any) {
    // in here we can do anything we want
    // example: call a repository to save the user on a database

    // But, as requested by the challenge, let's just return whatever was sent to by the request
    return request
  }

}