import HttpRequest from '../transport/abstractions/request'
import HttpResponse from '../transport/abstractions/response'

type AppController = (httpRequest: HttpRequest) => Promise<HttpResponse>

export default AppController
