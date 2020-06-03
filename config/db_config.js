module.exports = {
  "user": "root",
  "password": "md*#aamir",
  "database": "deporter",
  "host": "localhost",
  "port": 3306,
  "tables": {
    "allowed_vehicles": {
      "accessible": true,
      "editable": true,
      "slug": "allowed_vehicles",
      "columns": {
        "id": {
          "accessible": true,
          "editable": true,
          "slug": "id",
          "type": "varchar(10)",
          "default_value": null
        },
        "brand": {
          "accessible": true,
          "editable": true,
          "slug": "brand",
          "type": "varchar(25)",
          "default_value": null
        },
        "name": {
          "accessible": true,
          "editable": true,
          "slug": "name",
          "type": "varchar(100)",
          "default_value": null
        },
        "image_path": {
          "accessible": true,
          "editable": true,
          "slug": "image_path",
          "type": "varchar(10)",
          "default_value": null
        },
        "payload_kgs": {
          "accessible": true,
          "editable": true,
          "slug": "payload_kgs",
          "type": "int",
          "default_value": "0"
        },
        "category": {
          "accessible": true,
          "editable": true,
          "slug": "category",
          "type": "varchar(25)",
          "default_value": null
        }
      },
      "key": [
        "id"
      ]
    },
    "bidding": {
      "accessible": true,
      "editable": true,
      "slug": "bidding",
      "columns": {
        "order_id": {
          "accessible": true,
          "editable": true,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "bidder_id": {
          "accessible": true,
          "editable": true,
          "slug": "bidder_id",
          "type": "int",
          "default_value": null
        },
        "amount": {
          "accessible": true,
          "editable": true,
          "slug": "amount",
          "type": "int",
          "default_value": null
        },
        "customer_id": {
          "accessible": true,
          "editable": true,
          "slug": "customer_id",
          "type": "int",
          "default_value": null
        },
        "delivery_time": {
          "accessible": true,
          "editable": true,
          "slug": "delivery_time",
          "type": "int",
          "default_value": null
        },
        "bid_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "bid_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "collapsed": {
          "accessible": true,
          "editable": true,
          "slug": "collapsed",
          "type": "tinyint(1)",
          "default_value": "0"
        }
      },
      "key": [
        "order_id",
        "bidder_id"
      ]
    },
    "customer_offline_invoice": {
      "accessible": true,
      "editable": true,
      "slug": "customer_offline_invoice",
      "columns": {
        "order_id": {
          "accessible": true,
          "editable": true,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "net_amount": {
          "accessible": true,
          "editable": true,
          "slug": "net_amount",
          "type": "int",
          "default_value": null
        },
        "description": {
          "accessible": true,
          "editable": true,
          "slug": "description",
          "type": "text",
          "default_value": null
        },
        "transaction_type": {
          "accessible": true,
          "editable": true,
          "slug": "transaction_type",
          "type": "int",
          "default_value": null
        },
        "payer_id": {
          "accessible": true,
          "editable": true,
          "slug": "payer_id",
          "type": "int",
          "default_value": null
        },
        "creation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "gst_rate": {
          "accessible": true,
          "editable": true,
          "slug": "gst_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "discount": {
          "accessible": true,
          "editable": true,
          "slug": "discount",
          "type": "double(10,2)",
          "default_value": "0.00"
        },
        "base_amount": {
          "accessible": true,
          "editable": true,
          "slug": "base_amount",
          "type": "int",
          "default_value": "0"
        }
      },
      "key": [
        "order_id"
      ]
    },
    "customer_payments": {
      "accessible": true,
      "editable": true,
      "slug": "customer_payments",
      "columns": {
        "transaction_id": {
          "accessible": true,
          "editable": true,
          "slug": "transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "paid_amount": {
          "accessible": true,
          "editable": true,
          "slug": "paid_amount",
          "type": "int",
          "default_value": null
        },
        "order_id": {
          "accessible": true,
          "editable": true,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "payment_id": {
          "accessible": true,
          "editable": true,
          "slug": "payment_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "description": {
          "accessible": true,
          "editable": true,
          "slug": "description",
          "type": "text",
          "default_value": null
        },
        "transaction_type": {
          "accessible": true,
          "editable": true,
          "slug": "transaction_type",
          "type": "int",
          "default_value": null
        },
        "payment_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "payment_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "status": {
          "accessible": true,
          "editable": true,
          "slug": "status",
          "type": "tinyint",
          "default_value": "0"
        },
        "related_transaction_id": {
          "accessible": true,
          "editable": true,
          "slug": "related_transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "remark": {
          "accessible": true,
          "editable": true,
          "slug": "remark",
          "type": "text",
          "default_value": null
        },
        "payer_id": {
          "accessible": true,
          "editable": true,
          "slug": "payer_id",
          "type": "int",
          "default_value": null
        },
        "refund_id": {
          "accessible": true,
          "editable": true,
          "slug": "refund_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "refund_amount": {
          "accessible": true,
          "editable": true,
          "slug": "refund_amount",
          "type": "int",
          "default_value": "0"
        },
        "refund_description": {
          "accessible": true,
          "editable": true,
          "slug": "refund_description",
          "type": "text",
          "default_value": null
        },
        "cancellation_charge": {
          "accessible": true,
          "editable": true,
          "slug": "cancellation_charge",
          "type": "int",
          "default_value": "0"
        },
        "cancelled_by": {
          "accessible": true,
          "editable": true,
          "slug": "cancelled_by",
          "type": "tinyint",
          "default_value": "0"
        },
        "cancellation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "cancellation_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "gst_rate": {
          "accessible": true,
          "editable": true,
          "slug": "gst_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "discount": {
          "accessible": true,
          "editable": true,
          "slug": "discount",
          "type": "double(10,2)",
          "default_value": "0.00"
        },
        "base_amount": {
          "accessible": true,
          "editable": true,
          "slug": "base_amount",
          "type": "int",
          "default_value": "0"
        }
      },
      "key": [
        "transaction_id"
      ]
    },
    "customers": {
      "accessible": true,
      "editable": true,
      "slug": "customers",
      "columns": {
        "id": {
          "accessible": true,
          "editable": true,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "name": {
          "accessible": true,
          "editable": true,
          "slug": "name",
          "type": "varchar(30)",
          "default_value": null
        },
        "mobile": {
          "accessible": true,
          "editable": true,
          "slug": "mobile",
          "type": "varchar(15)",
          "default_value": null
        },
        "email": {
          "accessible": true,
          "editable": true,
          "slug": "email",
          "type": "varchar(30)",
          "default_value": null
        },
        "company": {
          "accessible": true,
          "editable": true,
          "slug": "company",
          "type": "varchar(100)",
          "default_value": null
        },
        "location": {
          "accessible": true,
          "editable": true,
          "slug": "location",
          "type": "text",
          "default_value": null
        },
        "latitude": {
          "accessible": true,
          "editable": true,
          "slug": "latitude",
          "type": "double",
          "default_value": "0"
        },
        "longitude": {
          "accessible": true,
          "editable": true,
          "slug": "longitude",
          "type": "double",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "balance": {
          "accessible": true,
          "editable": true,
          "slug": "balance",
          "type": "int",
          "default_value": "0"
        },
        "enabled": {
          "accessible": true,
          "editable": true,
          "slug": "enabled",
          "type": "tinyint(1)",
          "default_value": "1"
        }
      },
      "key": [
        "id"
      ]
    },
    "discounts": {
      "accessible": true,
      "editable": true,
      "slug": "discounts",
      "columns": {
        "id": {
          "accessible": true,
          "editable": true,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "coupon_code": {
          "accessible": true,
          "editable": true,
          "slug": "coupon_code",
          "type": "varchar(10)",
          "default_value": null
        },
        "title": {
          "accessible": true,
          "editable": true,
          "slug": "title",
          "type": "varchar(50)",
          "default_value": null
        },
        "creation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "message": {
          "accessible": true,
          "editable": true,
          "slug": "message",
          "type": "text",
          "default_value": null
        },
        "exp_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "exp_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "discount_type": {
          "accessible": true,
          "editable": true,
          "slug": "discount_type",
          "type": "tinyint",
          "default_value": null
        },
        "discount_val": {
          "accessible": true,
          "editable": true,
          "slug": "discount_val",
          "type": "int",
          "default_value": null
        },
        "max_cap": {
          "accessible": true,
          "editable": true,
          "slug": "max_cap",
          "type": "int",
          "default_value": null
        },
        "valid": {
          "accessible": true,
          "editable": true,
          "slug": "valid",
          "type": "tinyint(1)",
          "default_value": "1"
        },
        "counter": {
          "accessible": true,
          "editable": true,
          "slug": "counter",
          "type": "int",
          "default_value": "0"
        },
        "max_counter": {
          "accessible": true,
          "editable": true,
          "slug": "max_counter",
          "type": "int",
          "default_value": null
        },
        "user_id": {
          "accessible": true,
          "editable": true,
          "slug": "user_id",
          "type": "int",
          "default_value": "0"
        },
        "group_id": {
          "accessible": true,
          "editable": true,
          "slug": "group_id",
          "type": "int",
          "default_value": "1"
        }
      },
      "key": [
        "id"
      ]
    },
    "driver_payments": {
      "accessible": true,
      "editable": true,
      "slug": "driver_payments",
      "columns": {
        "transaction_id": {
          "accessible": true,
          "editable": true,
          "slug": "transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "paid_amount": {
          "accessible": true,
          "editable": true,
          "slug": "paid_amount",
          "type": "int",
          "default_value": null
        },
        "order_id": {
          "accessible": true,
          "editable": true,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "payment_id": {
          "accessible": true,
          "editable": true,
          "slug": "payment_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "description": {
          "accessible": true,
          "editable": true,
          "slug": "description",
          "type": "text",
          "default_value": null
        },
        "transaction_type": {
          "accessible": true,
          "editable": true,
          "slug": "transaction_type",
          "type": "int",
          "default_value": null
        },
        "payment_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "payment_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "status": {
          "accessible": true,
          "editable": true,
          "slug": "status",
          "type": "tinyint",
          "default_value": "0"
        },
        "related_transaction_id": {
          "accessible": true,
          "editable": true,
          "slug": "related_transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "remark": {
          "accessible": true,
          "editable": true,
          "slug": "remark",
          "type": "text",
          "default_value": null
        },
        "payer_id": {
          "accessible": true,
          "editable": true,
          "slug": "payer_id",
          "type": "int",
          "default_value": null
        },
        "refund_id": {
          "accessible": true,
          "editable": true,
          "slug": "refund_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "refund_amount": {
          "accessible": true,
          "editable": true,
          "slug": "refund_amount",
          "type": "int",
          "default_value": "0"
        },
        "refund_description": {
          "accessible": true,
          "editable": true,
          "slug": "refund_description",
          "type": "text",
          "default_value": null
        },
        "cancellation_charge": {
          "accessible": true,
          "editable": true,
          "slug": "cancellation_charge",
          "type": "int",
          "default_value": "0"
        },
        "cancelled_by": {
          "accessible": true,
          "editable": true,
          "slug": "cancelled_by",
          "type": "tinyint",
          "default_value": "0"
        },
        "cancellation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "cancellation_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        }
      },
      "key": [
        "transaction_id"
      ]
    },
    "driver_trips": {
      "accessible": true,
      "editable": true,
      "slug": "driver_trips",
      "columns": {
        "order_id": {
          "accessible": true,
          "editable": true,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "customer_id": {
          "accessible": true,
          "editable": true,
          "slug": "customer_id",
          "type": "int",
          "default_value": null
        },
        "bidder_id": {
          "accessible": true,
          "editable": true,
          "slug": "bidder_id",
          "type": "int",
          "default_value": null
        },
        "driver_id": {
          "accessible": true,
          "editable": true,
          "slug": "driver_id",
          "type": "int",
          "default_value": null
        },
        "status": {
          "accessible": true,
          "editable": true,
          "slug": "status",
          "type": "int",
          "default_value": "0"
        },
        "start_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "start_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "load_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "load_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "onroad_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "onroad_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "unload_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "unload_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "completion_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "completion_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "latitude": {
          "accessible": true,
          "editable": true,
          "slug": "latitude",
          "type": "double",
          "default_value": "0"
        },
        "longitude": {
          "accessible": true,
          "editable": true,
          "slug": "longitude",
          "type": "double",
          "default_value": "0"
        },
        "vehicle_number": {
          "accessible": true,
          "editable": true,
          "slug": "vehicle_number",
          "type": "varchar(30)",
          "default_value": null
        },
        "assign_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "assign_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "last_update_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "last_update_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "receive_payment": {
          "accessible": true,
          "editable": true,
          "slug": "receive_payment",
          "type": "tinyint(1)",
          "default_value": null
        },
        "payment_received": {
          "accessible": true,
          "editable": true,
          "slug": "payment_received",
          "type": "int",
          "default_value": "0"
        },
        "payment_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "payment_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "payment_confirmed": {
          "accessible": true,
          "editable": true,
          "slug": "payment_confirmed",
          "type": "tinyint(1)",
          "default_value": "0"
        },
        "final_payment": {
          "accessible": true,
          "editable": true,
          "slug": "final_payment",
          "type": "int",
          "default_value": "0"
        },
        "loading_code": {
          "accessible": true,
          "editable": true,
          "slug": "loading_code",
          "type": "int",
          "default_value": null
        },
        "unloading_code": {
          "accessible": true,
          "editable": true,
          "slug": "unloading_code",
          "type": "int",
          "default_value": null
        },
        "final_payment_received": {
          "accessible": true,
          "editable": true,
          "slug": "final_payment_received",
          "type": "int",
          "default_value": "0"
        },
        "final_payment_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "final_payment_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "final_payment_confirmed": {
          "accessible": true,
          "editable": true,
          "slug": "final_payment_confirmed",
          "type": "tinyint(1)",
          "default_value": "0"
        }
      },
      "key": [
        "order_id",
        "driver_id"
      ]
    },
    "drivers": {
      "accessible": true,
      "editable": true,
      "slug": "drivers",
      "columns": {
        "id": {
          "accessible": true,
          "editable": true,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "name": {
          "accessible": true,
          "editable": true,
          "slug": "name",
          "type": "varchar(30)",
          "default_value": null
        },
        "mobile": {
          "accessible": true,
          "editable": true,
          "slug": "mobile",
          "type": "varchar(15)",
          "default_value": null
        },
        "email": {
          "accessible": true,
          "editable": true,
          "slug": "email",
          "type": "varchar(30)",
          "default_value": null
        },
        "company": {
          "accessible": true,
          "editable": true,
          "slug": "company",
          "type": "varchar(100)",
          "default_value": null
        },
        "current_trip": {
          "accessible": true,
          "editable": true,
          "slug": "current_trip",
          "type": "int",
          "default_value": "0"
        },
        "location": {
          "accessible": true,
          "editable": true,
          "slug": "location",
          "type": "text",
          "default_value": null
        },
        "latitude": {
          "accessible": true,
          "editable": true,
          "slug": "latitude",
          "type": "double",
          "default_value": "0"
        },
        "longitude": {
          "accessible": true,
          "editable": true,
          "slug": "longitude",
          "type": "double",
          "default_value": "0"
        },
        "docs_mask": {
          "accessible": true,
          "editable": true,
          "slug": "docs_mask",
          "type": "int",
          "default_value": "0"
        },
        "balance": {
          "accessible": true,
          "editable": true,
          "slug": "balance",
          "type": "int",
          "default_value": "0"
        },
        "verified": {
          "accessible": true,
          "editable": true,
          "slug": "verified",
          "type": "tinyint(1)",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "verification_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "verification_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "code": {
          "accessible": true,
          "editable": true,
          "slug": "code",
          "type": "int",
          "default_value": "0"
        },
        "code_exp_time": {
          "accessible": true,
          "editable": true,
          "slug": "code_exp_time",
          "type": "bigint",
          "default_value": "0"
        },
        "transporter_id": {
          "accessible": true,
          "editable": true,
          "slug": "transporter_id",
          "type": "int",
          "default_value": "0"
        },
        "enabled": {
          "accessible": true,
          "editable": true,
          "slug": "enabled",
          "type": "tinyint(1)",
          "default_value": "1"
        }
      },
      "key": [
        "id"
      ]
    },
    "dues_payments": {
      "accessible": true,
      "editable": true,
      "slug": "dues_payments",
      "columns": {
        "transaction_id": {
          "accessible": true,
          "editable": true,
          "slug": "transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "paid_amount": {
          "accessible": true,
          "editable": true,
          "slug": "paid_amount",
          "type": "int",
          "default_value": null
        },
        "payment_id": {
          "accessible": true,
          "editable": true,
          "slug": "payment_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "payment_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "payment_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "payer_id": {
          "accessible": true,
          "editable": true,
          "slug": "payer_id",
          "type": "int",
          "default_value": null
        },
        "paid_by": {
          "accessible": true,
          "editable": true,
          "slug": "paid_by",
          "type": "int",
          "default_value": null
        },
        "creation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        }
      },
      "key": [
        "transaction_id"
      ]
    },
    "meta": {
      "accessible": true,
      "editable": true,
      "slug": "meta",
      "columns": {
        "id": {
          "accessible": true,
          "editable": true,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "min_supported_customer_app": {
          "accessible": true,
          "editable": true,
          "slug": "min_supported_customer_app",
          "type": "double(10,2)",
          "default_value": "0.00"
        },
        "min_supported_partner_app": {
          "accessible": true,
          "editable": true,
          "slug": "min_supported_partner_app",
          "type": "double(10,2)",
          "default_value": "0.00"
        },
        "min_supported_driver_app": {
          "accessible": true,
          "editable": true,
          "slug": "min_supported_driver_app",
          "type": "double(10,2)",
          "default_value": "0.00"
        },
        "customer_cancellation_rate": {
          "accessible": true,
          "editable": true,
          "slug": "customer_cancellation_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "transporter_cancellation_rate": {
          "accessible": true,
          "editable": true,
          "slug": "transporter_cancellation_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "gst_rate": {
          "accessible": true,
          "editable": true,
          "slug": "gst_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "service_rate": {
          "accessible": true,
          "editable": true,
          "slug": "service_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "config_last_updated": {
          "accessible": true,
          "editable": true,
          "slug": "config_last_updated",
          "type": "bigint",
          "default_value": null
        }
      },
      "key": [
        "id"
      ]
    },
    "mob_mapping": {
      "accessible": true,
      "editable": true,
      "slug": "mob_mapping",
      "columns": {
        "source_number": {
          "accessible": true,
          "editable": true,
          "slug": "source_number",
          "type": "varchar(15)",
          "default_value": null
        },
        "target_number": {
          "accessible": true,
          "editable": true,
          "slug": "target_number",
          "type": "varchar(15)",
          "default_value": null
        }
      },
      "key": [
        "source_number"
      ]
    },
    "model_add_requests": {
      "accessible": true,
      "editable": true,
      "slug": "model_add_requests",
      "columns": {
        "id": {
          "accessible": true,
          "editable": true,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "model": {
          "accessible": true,
          "editable": true,
          "slug": "model",
          "type": "varchar(60)",
          "default_value": null
        },
        "transporter": {
          "accessible": true,
          "editable": true,
          "slug": "transporter",
          "type": "int",
          "default_value": null
        },
        "status": {
          "accessible": true,
          "editable": true,
          "slug": "status",
          "type": "int",
          "default_value": "0"
        },
        "request_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "request_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "conclusion_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "conclusion_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "conclusion_text": {
          "accessible": true,
          "editable": true,
          "slug": "conclusion_text",
          "type": "text",
          "default_value": null
        }
      },
      "key": [
        "id"
      ]
    },
    "orders": {
      "accessible": true,
      "editable": true,
      "slug": "orders",
      "columns": {
        "id": {
          "accessible": true,
          "editable": true,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "accepted_bidder": {
          "accessible": true,
          "editable": true,
          "slug": "accepted_bidder",
          "type": "int",
          "default_value": null
        },
        "bid_end_time": {
          "accessible": true,
          "editable": true,
          "slug": "bid_end_time",
          "type": "bigint",
          "default_value": null
        },
        "source_mob": {
          "accessible": true,
          "editable": true,
          "slug": "source_mob",
          "type": "varchar(15)",
          "default_value": null
        },
        "dest_mob": {
          "accessible": true,
          "editable": true,
          "slug": "dest_mob",
          "type": "varchar(15)",
          "default_value": null
        },
        "source_latitude": {
          "accessible": true,
          "editable": true,
          "slug": "source_latitude",
          "type": "double",
          "default_value": null
        },
        "source_longitude": {
          "accessible": true,
          "editable": true,
          "slug": "source_longitude",
          "type": "double",
          "default_value": null
        },
        "source_location": {
          "accessible": true,
          "editable": true,
          "slug": "source_location",
          "type": "text",
          "default_value": null
        },
        "dest_latitude": {
          "accessible": true,
          "editable": true,
          "slug": "dest_latitude",
          "type": "double",
          "default_value": null
        },
        "dest_longitude": {
          "accessible": true,
          "editable": true,
          "slug": "dest_longitude",
          "type": "double",
          "default_value": null
        },
        "dest_location": {
          "accessible": true,
          "editable": true,
          "slug": "dest_location",
          "type": "text",
          "default_value": null
        },
        "geo_hash": {
          "accessible": true,
          "editable": true,
          "slug": "geo_hash",
          "type": "bigint",
          "default_value": null
        },
        "goods_desc": {
          "accessible": true,
          "editable": true,
          "slug": "goods_desc",
          "type": "text",
          "default_value": null
        },
        "dimen_length": {
          "accessible": true,
          "editable": true,
          "slug": "dimen_length",
          "type": "smallint",
          "default_value": "0"
        },
        "dimen_width": {
          "accessible": true,
          "editable": true,
          "slug": "dimen_width",
          "type": "smallint",
          "default_value": "0"
        },
        "dimen_height": {
          "accessible": true,
          "editable": true,
          "slug": "dimen_height",
          "type": "smallint",
          "default_value": "0"
        },
        "load_time": {
          "accessible": true,
          "editable": true,
          "slug": "load_time",
          "type": "bigint",
          "default_value": null
        },
        "load_duration": {
          "accessible": true,
          "editable": true,
          "slug": "load_duration",
          "type": "float",
          "default_value": null
        },
        "customer_id": {
          "accessible": true,
          "editable": true,
          "slug": "customer_id",
          "type": "int",
          "default_value": null
        },
        "num_vehicles": {
          "accessible": true,
          "editable": true,
          "slug": "num_vehicles",
          "type": "int",
          "default_value": null
        },
        "cancelled_by": {
          "accessible": true,
          "editable": true,
          "slug": "cancelled_by",
          "type": "int",
          "default_value": "0"
        },
        "unique_key": {
          "accessible": true,
          "editable": true,
          "slug": "unique_key",
          "type": "bigint",
          "default_value": null
        },
        "payment_mode": {
          "accessible": true,
          "editable": true,
          "slug": "payment_mode",
          "type": "int",
          "default_value": null
        },
        "restart_bid_count": {
          "accessible": true,
          "editable": true,
          "slug": "restart_bid_count",
          "type": "int",
          "default_value": "0"
        },
        "status": {
          "accessible": true,
          "editable": true,
          "slug": "status",
          "type": "int",
          "default_value": "0"
        },
        "unload_duration": {
          "accessible": true,
          "editable": true,
          "slug": "unload_duration",
          "type": "float",
          "default_value": null
        },
        "vehicle": {
          "accessible": true,
          "editable": true,
          "slug": "vehicle",
          "type": "varchar(50)",
          "default_value": null
        },
        "vehicle_category": {
          "accessible": true,
          "editable": true,
          "slug": "vehicle_category",
          "type": "varchar(20)",
          "default_value": null
        },
        "goods_weight": {
          "accessible": true,
          "editable": true,
          "slug": "goods_weight",
          "type": "int",
          "default_value": null
        },
        "weight_unit": {
          "accessible": true,
          "editable": true,
          "slug": "weight_unit",
          "type": "varchar(5)",
          "default_value": null
        },
        "creation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "accept_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "accept_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "completion_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "completion_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "cancellation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "cancellation_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "net_amount": {
          "accessible": true,
          "editable": true,
          "slug": "net_amount",
          "type": "int",
          "default_value": "0"
        },
        "amount_paid": {
          "accessible": true,
          "editable": true,
          "slug": "amount_paid",
          "type": "int",
          "default_value": "0"
        },
        "rating": {
          "accessible": true,
          "editable": true,
          "slug": "rating",
          "type": "float",
          "default_value": "0"
        }
      },
      "key": [
        "id"
      ]
    },
    "partner_payments": {
      "accessible": true,
      "editable": true,
      "slug": "partner_payments",
      "columns": {
        "transaction_id": {
          "accessible": true,
          "editable": true,
          "slug": "transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "paid_amount": {
          "accessible": true,
          "editable": true,
          "slug": "paid_amount",
          "type": "int",
          "default_value": null
        },
        "order_id": {
          "accessible": true,
          "editable": true,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "payment_id": {
          "accessible": true,
          "editable": true,
          "slug": "payment_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "description": {
          "accessible": true,
          "editable": true,
          "slug": "description",
          "type": "text",
          "default_value": null
        },
        "transaction_type": {
          "accessible": true,
          "editable": true,
          "slug": "transaction_type",
          "type": "int",
          "default_value": null
        },
        "payment_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "payment_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "status": {
          "accessible": true,
          "editable": true,
          "slug": "status",
          "type": "tinyint",
          "default_value": "0"
        },
        "related_transaction_id": {
          "accessible": true,
          "editable": true,
          "slug": "related_transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "remark": {
          "accessible": true,
          "editable": true,
          "slug": "remark",
          "type": "text",
          "default_value": null
        },
        "payer_id": {
          "accessible": true,
          "editable": true,
          "slug": "payer_id",
          "type": "int",
          "default_value": null
        },
        "refund_id": {
          "accessible": true,
          "editable": true,
          "slug": "refund_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "refund_amount": {
          "accessible": true,
          "editable": true,
          "slug": "refund_amount",
          "type": "int",
          "default_value": "0"
        },
        "refund_description": {
          "accessible": true,
          "editable": true,
          "slug": "refund_description",
          "type": "text",
          "default_value": null
        },
        "cancellation_charge": {
          "accessible": true,
          "editable": true,
          "slug": "cancellation_charge",
          "type": "int",
          "default_value": "0"
        },
        "cancelled_by": {
          "accessible": true,
          "editable": true,
          "slug": "cancelled_by",
          "type": "tinyint",
          "default_value": "0"
        },
        "cancellation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "cancellation_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        }
      },
      "key": [
        "transaction_id"
      ]
    },
    "partners": {
      "accessible": true,
      "editable": true,
      "slug": "partners",
      "columns": {
        "id": {
          "accessible": true,
          "editable": true,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "name": {
          "accessible": true,
          "editable": true,
          "slug": "name",
          "type": "varchar(30)",
          "default_value": null
        },
        "mobile": {
          "accessible": true,
          "editable": true,
          "slug": "mobile",
          "type": "varchar(15)",
          "default_value": null
        },
        "email": {
          "accessible": true,
          "editable": true,
          "slug": "email",
          "type": "varchar(30)",
          "default_value": null
        },
        "company": {
          "accessible": true,
          "editable": true,
          "slug": "company",
          "type": "varchar(100)",
          "default_value": null
        },
        "location": {
          "accessible": true,
          "editable": true,
          "slug": "location",
          "type": "text",
          "default_value": null
        },
        "latitude": {
          "accessible": true,
          "editable": true,
          "slug": "latitude",
          "type": "double",
          "default_value": "0"
        },
        "longitude": {
          "accessible": true,
          "editable": true,
          "slug": "longitude",
          "type": "double",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "rated_by": {
          "accessible": true,
          "editable": true,
          "slug": "rated_by",
          "type": "int",
          "default_value": "0"
        },
        "rating": {
          "accessible": true,
          "editable": true,
          "slug": "rating",
          "type": "double",
          "default_value": "3"
        },
        "docs_mask": {
          "accessible": true,
          "editable": true,
          "slug": "docs_mask",
          "type": "int",
          "default_value": "0"
        },
        "balance": {
          "accessible": true,
          "editable": true,
          "slug": "balance",
          "type": "int",
          "default_value": "0"
        },
        "verified": {
          "accessible": true,
          "editable": true,
          "slug": "verified",
          "type": "tinyint(1)",
          "default_value": "0"
        },
        "verification_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "verification_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "enabled": {
          "accessible": true,
          "editable": true,
          "slug": "enabled",
          "type": "tinyint(1)",
          "default_value": "1"
        },
        "account_ifsc": {
          "accessible": true,
          "editable": true,
          "slug": "account_ifsc",
          "type": "varchar(30)",
          "default_value": null
        },
        "account_number": {
          "accessible": true,
          "editable": true,
          "slug": "account_number",
          "type": "varchar(30)",
          "default_value": null
        }
      },
      "key": [
        "id"
      ]
    },
    "saved_places": {
      "accessible": true,
      "editable": true,
      "slug": "saved_places",
      "columns": {
        "id": {
          "accessible": true,
          "editable": true,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "address": {
          "accessible": true,
          "editable": true,
          "slug": "address",
          "type": "varchar(50)",
          "default_value": null
        },
        "latitude": {
          "accessible": true,
          "editable": true,
          "slug": "latitude",
          "type": "double",
          "default_value": null
        },
        "longitude": {
          "accessible": true,
          "editable": true,
          "slug": "longitude",
          "type": "double",
          "default_value": null
        },
        "saved_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "saved_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "transporter_id": {
          "accessible": true,
          "editable": true,
          "slug": "transporter_id",
          "type": "int",
          "default_value": null
        },
        "notify": {
          "accessible": true,
          "editable": true,
          "slug": "notify",
          "type": "tinyint(1)",
          "default_value": "0"
        },
        "geo_hash": {
          "accessible": true,
          "editable": true,
          "slug": "geo_hash",
          "type": "bigint",
          "default_value": "0"
        }
      },
      "key": [
        "id"
      ]
    },
    "vehicle_categories": {
      "accessible": true,
      "editable": true,
      "slug": "vehicle_categories",
      "columns": {
        "id": {
          "accessible": true,
          "editable": true,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "category": {
          "accessible": true,
          "editable": true,
          "slug": "category",
          "type": "varchar(25)",
          "default_value": null
        },
        "image_path": {
          "accessible": true,
          "editable": true,
          "slug": "image_path",
          "type": "varchar(10)",
          "default_value": null
        }
      },
      "key": [
        "id"
      ]
    },
    "vehicles": {
      "accessible": true,
      "editable": true,
      "slug": "vehicles",
      "columns": {
        "vehicle_number": {
          "accessible": true,
          "editable": true,
          "slug": "vehicle_number",
          "type": "varchar(30)",
          "default_value": null
        },
        "vehicle": {
          "accessible": true,
          "editable": true,
          "slug": "vehicle",
          "type": "varchar(30)",
          "default_value": null
        },
        "verified": {
          "accessible": true,
          "editable": true,
          "slug": "verified",
          "type": "tinyint(1)",
          "default_value": "0"
        },
        "owner": {
          "accessible": true,
          "editable": true,
          "slug": "owner",
          "type": "int",
          "default_value": null
        },
        "creation_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "verification_timestamp": {
          "accessible": true,
          "editable": true,
          "slug": "verification_timestamp",
          "type": "bigint",
          "default_value": "0"
        }
      },
      "key": [
        "vehicle_number"
      ]
    }
  }
}