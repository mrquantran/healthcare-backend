"--unhandled-rejections=strict"

import { TYPE_USER } from '../constant/ENUM.js';
import { getDecodedToken } from '../helpers/auth.helper.js';

/**
 * Middleware: Authorization user by Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

// eslint-disable-next-line consistent-return
export const isAdmin = async (req, res, next) => {
    // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
    // console.log(req)
    const tokenFromClient = req.headers.authorization.replace('Bearer ', '');

    if (tokenFromClient) {
        // Nếu tồn tại token
        try {
            const token = await getDecodedToken(req);

            if (token.type === TYPE_USER.admin) {
                // next();
                return next()
            }

            return res.status(403).json({
                message: 'No permission to perform this action'
            })

        } catch (error) {
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        // not find token
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};
