import HttpRequest from '../../transport/abstractions/request'
import HttpResponse from '../../transport/abstractions/response'

interface AppController {
    controller(httpRequest: HttpRequest): Promise<HttpResponse>
}

export default AppController
