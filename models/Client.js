const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  visitTime: {
      type: Date,
      default: Date.now
  },
  // Add any other fields you might need for each visit
  // For example, browser details, location changes, etc.
}, { _id: false });

const clientSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: [true, "IP is required."]
  },
  visits: [visitSchema],
  visitCount: {
    type: Number,
    default: 0
  },
  continent_code: {
    type: String
  },
  continent_name: {
    type: String
  },
  country_code2: {
    type: String
  },
  country_code3: {
    type: String
  },
  country_name: {
    type: String
  },
  country_name_official: {
    type: String
  },
  country_capital: {
    type: String
  },
  state_prov: {
    type: String
  },
  state_code: {
    type: String
  },
  district: {
    type: String,
    default: ""
  },
  city: {
    type: String
  },
  zipcode: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  is_eu: {
    type: Boolean
  },
  calling_code: {
    type: String
  },
  country_tld: {
    type: String
  },
  languages: {
    type: String
  },
  country_flag: {
    type: String
  },
  geoname_id: {
    type: String
  },
  isp: {
    type: String
  },
  connection_type: {
    type: String,
    default: ""
  },
  organization: {
    type: String
  },
  currency: {
    code: {
      type: String
    },
    name: {
      type: String
    },
    symbol: {
      type: String
    }
  },
  time_zone: {
    name: {
      type: String
    },
    offset: {
      type: Number
    },
    offset_with_dst: {
      type: Number
    },
    current_time: {
      type: String
    },
    current_time_unix: {
      type: Number
    },
    is_dst: {
      type: Boolean
    },
    dst_savings: {
      type: Number
    }
  }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

clientSchema.methods.recordVisit = function (visitDetails) {
  this.visitCount += 1;
  this.visits.push(visitDetails);
  return this.save();
};

module.exports = mongoose.model('Client', clientSchema);


