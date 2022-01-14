interface HttpRequest {
    body: Record<string, any>
    query: Record<string, any>
    params: Record<string, any>
}

export default HttpRequest
