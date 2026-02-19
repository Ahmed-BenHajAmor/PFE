import { HttpService } from '@nestjs/axios';
import { All, Controller, Req, Res, UseGuards } from '@nestjs/common';
import { env } from 'process';
import { ConditionalJwtGuard } from '../auth/guard/conditional-auth.guard';
import { log } from 'console';

@Controller('management')
@UseGuards(ConditionalJwtGuard) 
export class ManagementProxyController {
    private url = env.MANAGEMENT_URL || 'http://localhost:8080';

    constructor(private readonly httpService: HttpService) {}

    @All('*')
    async manageProxy(@Req() req, @Res() res) {
        const targetUrl = `${this.url}${req.originalUrl.replace('/management', '')}`;
        const { host, 'content-length': _, ...headers } = req.headers;
        try {
            const response = await this.httpService.axiosRef({
                method: req.method,
                url: targetUrl,
                headers,      
                
                data: {
                    ...req.body,
                }, 
                validateStatus: () => true,
            });

            res.status(response.status).send(response.data);
        } catch (err) {
            console.error('Proxy error:', err.message);
            res.status(502).json({ message: 'Management service unreachable' });
        }
    }
}
