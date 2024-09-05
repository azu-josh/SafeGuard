const AdBlockList = require('../models/AdBlock'); // Your Mongoose model

class AdBlockerController {
    static async addUrlToBlockList(req, res) {
        try {
            const { url } = req.body;
            await AdBlockList.create({ url });
            res.status(201).send({ message: 'URL added to blocklist' });
        } catch (error) {
            res.status(500).send({ message: 'Failed to add URL' });
        }
    }

    static async removeUrlFromBlockList(req, res) {
        try {
            const { url } = req.body;
            await AdBlockList.deleteOne({ url });
            res.status(200).send({ message: 'URL removed from blocklist' });
        } catch (error) {
            res.status(500).send({ message: 'Failed to remove URL' });
        }
    }

    static async getBlockList(req, res) {
        try {
            const urls = await AdBlockList.find({});
            res.status(200).send(urls);
        } catch (error) {
            res.status(500).send({ message: 'Failed to fetch blocklist' });
        }
    }
}

module.exports = AdBlockerController;
