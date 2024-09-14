import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get(
    'https://my-json-server.typicode.com/typicode/demo/posts',
    () => {
      return HttpResponse.json([
        { id: 1, title: 'Post 1', body: 'Body of post 1' },
        { id: 2, title: 'Post 2', body: 'Body of post 2' },
      ])
    }
  ),
]