import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { verify } from 'jsonwebtoken';

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const bearerHeader = request.headers.authorization;
        const accessToken = bearerHeader && bearerHeader.split(' ')[1];
        const user: any = verify(
            accessToken,
            'topSecret'
        );
        return user._id
    }
)