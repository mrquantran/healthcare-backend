const bookings = {
    get: {
        tags: ['Bookings'],
        description: 'Get bookings',
        security: [
            { bearerAuth: [] },
        ],
        operationId: 'getBookings',
        parameters: [
            // expected params.
            {
                name: 'page', // name of the param
                in: 'path', // location of the param
                schema: {
                    page: {
                        type: 'number',
                        description: 'Pass an page',
                        example: 1,
                    }
                },
                description: 'page', // param desc.
            },
            {
                name: 'perPage', // name of the param
                in: 'path', // location of the param
                schema: {
                    page: {
                        type: 'number',
                        description: 'Pass an page',
                        example: 4,
                    }
                },
                description: 'perPage', // param desc.
            },
            {
                name: 'filter', // name of the param
                in: 'path', // location of the param
                schema: {
                    page: {
                        type: 'filter',
                        description: 'Pass an filter',
                        example: 4,
                    }
                },
                description: 'filter', // param desc.
            },
        ],
        responses: {
            200: {
                description: 'Bookings were obtained',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Bookings',
                        },
                    },
                },
            },
        },
    },
}

export default bookings;