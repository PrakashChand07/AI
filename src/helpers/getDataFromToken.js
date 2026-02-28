import jwt from 'jsonwebtoken';

export const getDataFromToken = (request) => {
    try {
        let token = '';

        // Extract token from Authorization header usually sent by Axios
        const authHeader = request.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        // Fallback to cookie
        if (!token) {
            token = request.cookies.get('token')?.value || '';
        }

        if (!token) {
            return null;
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET || process.env.JWT_ACCESS_SECRET);
        return decodedToken.id || decodedToken.userId;
    } catch (error) {
        throw new Error(error.message);
    }
}
