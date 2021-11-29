const feedbacks = {
    post: {
        tags: ['Booking feedback'],
        description: 'Create new feedback',
        security: [
            { bearerAuth: [] },
        ],
        parameters: [
            // expected params.
            {
                name: 'id', // name of the param
                in: 'path', // location of the param
                schema: {
                    $ref: '#/components/schemas/id', // data model of the param
                },
                required: true, // Mandatory param
                description: 'A single course id', // param desc.
            },
        ],
        operationId: 'createFeedback',
        responses: {
            200: {
                description: 'Bookings were obtained',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Feedback',
                        },
                    },
                },
            },
        },
    },
}

export default feedbacks;