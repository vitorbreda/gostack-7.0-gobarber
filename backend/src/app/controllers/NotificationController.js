import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationControler {
    async index(req, res) {
        const checkIfProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        /**
         * Check if provider_id is a provider
         */
        if (!checkIfProvider) {
            return res.status(400).json({
                error: 'Only provider can load notifications',
            });
        }

        const notifications = await Notification.find({
            user: req.userId,
        })
            .sort({ createdAt: 'desc' })
            .limit(20);

        return res.json(notifications);
    }

    async update(req, res) {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        return res.json(notification);
    }
}

export default new NotificationControler();
