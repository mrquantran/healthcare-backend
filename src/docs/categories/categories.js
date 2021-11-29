const categories = {
    get: {
        tags: ['Categories'],
        description: 'Get categories options',
        security: [
            { bearerAuth: [] },
        ],
        operationId: 'getCategories',
        responses: {
            200: {
                description: 'Categories were obtained',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Category',
                        },
                    },
                },
            },
        },
    },
    post: {
        tags: ['Categories'],
        description: 'Create new category',
        security: [
            { bearerAuth: [] },
        ],
        operationId: 'createCategory',
        responses: {
            200: {
                description: 'Bookings were obtained',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Category',
                        },
                    },
                },
            },
        },
    },
}

export default categories;