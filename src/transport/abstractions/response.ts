interface HttpResponse {
    success: boolean
    message: string
    statusCode: number
    data?: Record<string, any>
}

export default HttpResponse
