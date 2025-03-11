import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
        return res.status(200).json({ role: decoded.role });
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}
