const refreshToken = {
    post: {
        tags: ['Account'],
        description: 'API for refresh token',
        operationId: 'accountRefreshToken',
        parameters: [],
        security: [
            { bearerAuth: [] },
        ],
        requestBody: {
            // expected request body
            content: {
                // content-type
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            accessToken: {
                                type: 'string',
                                description: 'AccessToken',
                                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJHcmFjZSIsImVtYWlsIjoiZ3JhY2VAaGV5LmNvbSJ9LCJpYXQiOjE2MzI1NDY5NzEsImV4cCI6MTYzMjU1MDU3MX0.eGrmeQmuI1nEjhOgk6bSzQ1yQFB0lbNfLd9cLbqAgxI',
                            },
                            refreshToken: {
                                type: 'string',
                                description: 'refreshToken',
                                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJHcmFjZSIsImVtYWlsIjoiZ3JhY2VAaGV5LmNvbSJ9LCJpYXQiOjE2MzI1NDY5NzEsImV4cCI6MTYzMjU1MDU3MX0.eGrmeQmuI1nEjhOgk6bSzQ1yQFB0lbNfLd9cLbqAgxI',
                            },
                        },
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Login successfully',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                accessToken: {
                                    type: 'string',
                                    description: 'access Token for user authorization',
                                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJHcmFjZSIsImVtYWlsIjoiZ3JhY2VAaGV5LmNvbSJ9LCJpYXQiOjE2MzI1NDY5NzEsImV4cCI6MTYzMjU1MDU3MX0.eGrmeQmuI1nEjhOgk6bSzQ1yQFB0lbNfLd9cLbqAgxI',
                                },
                                refreshToken: {
                                    type: 'string',
                                    description: 'refresh token for generate new access token',
                                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJHcmFjZSIsImVtYWlsIjoiZ3JhY2VAaGV5LmNvbSJ9LCJpYXQiOjE2MzI1NDY5NzEsImV4cCI6MTk0NzkwNjk3MX0.MQRfaLy2jN9PKFk3_kDsV4OfyoxgrkT19nIV1fDRiDk',
                                },
                            },
                        },
                    },
                },
            },
            404: {
                description: 'User is not found',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Error',
                        },
                    },
                },
            },
        },
    },
};

export default refreshToken;
