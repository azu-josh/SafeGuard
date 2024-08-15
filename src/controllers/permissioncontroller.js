const Permission = require('../models/permissions');

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updatePermission = async (req, res) => {
    try {
      const { appName, permissionName, isEnabled } = req.body;
      const permission = await Permission.findOneAndUpdate(
        { appName, "permissions.permissionName": permissionName },
        { "$set": { "permissions.$.isEnabled": isEnabled }},
        { new: true }
      );
      res.json(permission);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  exports.monitorPermissions = async (req, res) => {
    try {
      const { appName, isMonitored } = req.body;
      const updatedApp = await Permission.findOneAndUpdate(
        { appName },
        { isMonitored },
        { new: true }
      );
      res.json(updatedApp);
    } catch (error) {
      res.status(500).send(error);
    }
  };