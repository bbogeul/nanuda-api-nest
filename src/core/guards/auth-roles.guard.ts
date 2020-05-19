// import Debug from 'debug';
// import { Injectable, UnauthorizedException, ForbiddenException, ExecutionContext, Inject } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { ADMIN_USER } from '../../shared';
// import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
// import { basename } from 'path';
// import { deleteYN } from '../../common';

// const debug = Debug(`app:${basename(__dirname)}: ${basename(__filename)}`);

// @Injectable()
// export class AuthRolesGuard extends AuthGuard('jwt') {
//     readonly roles: ADMIN_USER[];

//     constructor(...roles: ADMIN_USER[]) {
//         super();
//         this.roles = roles;
//     }

//     handleRequest(err, user, info, context: ExecutionContextHost) {
//         if (err || !user) {
//             debug(info);
//             throw err || new UnauthorizedException();
//         }

//         if (this.roles.length) {
//             debug(this.roles);
//             const hasRole = () => this.roles.some(role => );
//             if(user.)
//         }
//     }
// }