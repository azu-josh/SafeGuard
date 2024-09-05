const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  appName: String,
  permissions: [{
    permissionName: String,
    isEnabled: Boolean
  }],
  isMonitored: Boolean
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
