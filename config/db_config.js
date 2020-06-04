module.exports = {
  "dbType": "mysql",
  "user": "root",
  "password": "md*#aamir",
  "database": "deporter",
  "host": "localhost",
  "port": 3306,
  "tables": {
    "allowed_vehicles": {
      "accessible": true,
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "allowed_vehicles",
      "columns": {
        "id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "id",
          "type": "varchar(10)",
          "default_value": null
        },
        "brand": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "brand",
          "type": "varchar(25)",
          "default_value": null
        },
        "name": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "name",
          "type": "varchar(100)",
          "default_value": null
        },
        "image_path": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "image_path",
          "type": "varchar(10)",
          "default_value": null
        },
        "payload_kgs": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payload_kgs",
          "type": "int",
          "default_value": "0"
        },
        "category": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "bidding",
      "columns": {
        "order_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "bidder_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "bidder_id",
          "type": "int",
          "default_value": null
        },
        "amount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "amount",
          "type": "int",
          "default_value": null
        },
        "customer_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "customer_id",
          "type": "int",
          "default_value": null
        },
        "delivery_time": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "delivery_time",
          "type": "int",
          "default_value": null
        },
        "bid_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "bid_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "collapsed": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "customer_offline_invoice",
      "columns": {
        "order_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "net_amount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "net_amount",
          "type": "int",
          "default_value": null
        },
        "description": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "description",
          "type": "text",
          "default_value": null
        },
        "transaction_type": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transaction_type",
          "type": "int",
          "default_value": null
        },
        "payer_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payer_id",
          "type": "int",
          "default_value": null
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "gst_rate": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "gst_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "discount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "discount",
          "type": "double(10,2)",
          "default_value": "0.00"
        },
        "base_amount": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "customer_payments",
      "columns": {
        "transaction_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "paid_amount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "paid_amount",
          "type": "int",
          "default_value": null
        },
        "order_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "payment_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "description": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "description",
          "type": "text",
          "default_value": null
        },
        "transaction_type": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transaction_type",
          "type": "int",
          "default_value": null
        },
        "payment_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "status": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "status",
          "type": "tinyint",
          "default_value": "0"
        },
        "related_transaction_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "related_transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "remark": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "remark",
          "type": "text",
          "default_value": null
        },
        "payer_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payer_id",
          "type": "int",
          "default_value": null
        },
        "refund_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "refund_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "refund_amount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "refund_amount",
          "type": "int",
          "default_value": "0"
        },
        "refund_description": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "refund_description",
          "type": "text",
          "default_value": null
        },
        "cancellation_charge": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "cancellation_charge",
          "type": "int",
          "default_value": "0"
        },
        "cancelled_by": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "cancelled_by",
          "type": "tinyint",
          "default_value": "0"
        },
        "cancellation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "cancellation_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "gst_rate": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "gst_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "discount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "discount",
          "type": "double(10,2)",
          "default_value": "0.00"
        },
        "base_amount": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "customers",
      "columns": {
        "id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "name": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "name",
          "type": "varchar(30)",
          "default_value": null
        },
        "mobile": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "mobile",
          "type": "varchar(15)",
          "default_value": null
        },
        "email": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "email",
          "type": "varchar(30)",
          "default_value": null
        },
        "company": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "company",
          "type": "varchar(100)",
          "default_value": null
        },
        "location": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "location",
          "type": "text",
          "default_value": null
        },
        "latitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "latitude",
          "type": "double",
          "default_value": "0"
        },
        "longitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "longitude",
          "type": "double",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "balance": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "balance",
          "type": "int",
          "default_value": "0"
        },
        "enabled": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "discounts",
      "columns": {
        "id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "coupon_code": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "coupon_code",
          "type": "varchar(10)",
          "default_value": null
        },
        "title": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "title",
          "type": "varchar(50)",
          "default_value": null
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "message": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "message",
          "type": "text",
          "default_value": null
        },
        "exp_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "exp_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "discount_type": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "discount_type",
          "type": "tinyint",
          "default_value": null
        },
        "discount_val": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "discount_val",
          "type": "int",
          "default_value": null
        },
        "max_cap": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "max_cap",
          "type": "int",
          "default_value": null
        },
        "valid": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "valid",
          "type": "tinyint(1)",
          "default_value": "1"
        },
        "counter": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "counter",
          "type": "int",
          "default_value": "0"
        },
        "max_counter": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "max_counter",
          "type": "int",
          "default_value": null
        },
        "user_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "user_id",
          "type": "int",
          "default_value": "0"
        },
        "group_id": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "driver_payments",
      "columns": {
        "transaction_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "paid_amount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "paid_amount",
          "type": "int",
          "default_value": null
        },
        "order_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "payment_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "description": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "description",
          "type": "text",
          "default_value": null
        },
        "transaction_type": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transaction_type",
          "type": "int",
          "default_value": null
        },
        "payment_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "status": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "status",
          "type": "tinyint",
          "default_value": "0"
        },
        "related_transaction_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "related_transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "remark": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "remark",
          "type": "text",
          "default_value": null
        },
        "payer_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payer_id",
          "type": "int",
          "default_value": null
        },
        "refund_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "refund_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "refund_amount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "refund_amount",
          "type": "int",
          "default_value": "0"
        },
        "refund_description": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "refund_description",
          "type": "text",
          "default_value": null
        },
        "cancellation_charge": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "cancellation_charge",
          "type": "int",
          "default_value": "0"
        },
        "cancelled_by": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "cancelled_by",
          "type": "tinyint",
          "default_value": "0"
        },
        "cancellation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "cancellation_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "driver_trips",
      "columns": {
        "order_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "customer_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "customer_id",
          "type": "int",
          "default_value": null
        },
        "bidder_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "bidder_id",
          "type": "int",
          "default_value": null
        },
        "driver_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "driver_id",
          "type": "int",
          "default_value": null
        },
        "status": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "status",
          "type": "int",
          "default_value": "0"
        },
        "start_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "start_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "load_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "load_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "onroad_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "onroad_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "unload_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "unload_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "completion_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "completion_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "latitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "latitude",
          "type": "double",
          "default_value": "0"
        },
        "longitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "longitude",
          "type": "double",
          "default_value": "0"
        },
        "vehicle_number": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "vehicle_number",
          "type": "varchar(30)",
          "default_value": null
        },
        "assign_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "assign_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "last_update_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "last_update_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "receive_payment": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "receive_payment",
          "type": "tinyint(1)",
          "default_value": null
        },
        "payment_received": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_received",
          "type": "int",
          "default_value": "0"
        },
        "payment_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "payment_confirmed": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_confirmed",
          "type": "tinyint(1)",
          "default_value": "0"
        },
        "final_payment": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "final_payment",
          "type": "int",
          "default_value": "0"
        },
        "loading_code": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "loading_code",
          "type": "int",
          "default_value": null
        },
        "unloading_code": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "unloading_code",
          "type": "int",
          "default_value": null
        },
        "final_payment_received": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "final_payment_received",
          "type": "int",
          "default_value": "0"
        },
        "final_payment_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "final_payment_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "final_payment_confirmed": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "drivers",
      "columns": {
        "id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "name": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "name",
          "type": "varchar(30)",
          "default_value": null
        },
        "mobile": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "mobile",
          "type": "varchar(15)",
          "default_value": null
        },
        "email": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "email",
          "type": "varchar(30)",
          "default_value": null
        },
        "company": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "company",
          "type": "varchar(100)",
          "default_value": null
        },
        "current_trip": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "current_trip",
          "type": "int",
          "default_value": "0"
        },
        "location": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "location",
          "type": "text",
          "default_value": null
        },
        "latitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "latitude",
          "type": "double",
          "default_value": "0"
        },
        "longitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "longitude",
          "type": "double",
          "default_value": "0"
        },
        "docs_mask": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "docs_mask",
          "type": "int",
          "default_value": "0"
        },
        "balance": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "balance",
          "type": "int",
          "default_value": "0"
        },
        "verified": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "verified",
          "type": "tinyint(1)",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "verification_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "verification_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "code": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "code",
          "type": "int",
          "default_value": "0"
        },
        "code_exp_time": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "code_exp_time",
          "type": "bigint",
          "default_value": "0"
        },
        "transporter_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transporter_id",
          "type": "int",
          "default_value": "0"
        },
        "enabled": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "dues_payments",
      "columns": {
        "transaction_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "paid_amount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "paid_amount",
          "type": "int",
          "default_value": null
        },
        "payment_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "payment_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "payer_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payer_id",
          "type": "int",
          "default_value": null
        },
        "paid_by": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "paid_by",
          "type": "int",
          "default_value": null
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "meta",
      "columns": {
        "id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "min_supported_customer_app": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "min_supported_customer_app",
          "type": "double(10,2)",
          "default_value": "0.00"
        },
        "min_supported_partner_app": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "min_supported_partner_app",
          "type": "double(10,2)",
          "default_value": "0.00"
        },
        "min_supported_driver_app": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "min_supported_driver_app",
          "type": "double(10,2)",
          "default_value": "0.00"
        },
        "customer_cancellation_rate": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "customer_cancellation_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "transporter_cancellation_rate": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transporter_cancellation_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "gst_rate": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "gst_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "service_rate": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "service_rate",
          "type": "double(10,2)",
          "default_value": null
        },
        "config_last_updated": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "mob_mapping",
      "columns": {
        "source_number": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "source_number",
          "type": "varchar(15)",
          "default_value": null
        },
        "target_number": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "model_add_requests",
      "columns": {
        "id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "model": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "model",
          "type": "varchar(60)",
          "default_value": null
        },
        "transporter": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transporter",
          "type": "int",
          "default_value": null
        },
        "status": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "status",
          "type": "int",
          "default_value": "0"
        },
        "request_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "request_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "conclusion_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "conclusion_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "conclusion_text": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "orders",
      "columns": {
        "id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "accepted_bidder": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "accepted_bidder",
          "type": "int",
          "default_value": null
        },
        "bid_end_time": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "bid_end_time",
          "type": "bigint",
          "default_value": null
        },
        "source_mob": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "source_mob",
          "type": "varchar(15)",
          "default_value": null
        },
        "dest_mob": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "dest_mob",
          "type": "varchar(15)",
          "default_value": null
        },
        "source_latitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "source_latitude",
          "type": "double",
          "default_value": null
        },
        "source_longitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "source_longitude",
          "type": "double",
          "default_value": null
        },
        "source_location": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "source_location",
          "type": "text",
          "default_value": null
        },
        "dest_latitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "dest_latitude",
          "type": "double",
          "default_value": null
        },
        "dest_longitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "dest_longitude",
          "type": "double",
          "default_value": null
        },
        "dest_location": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "dest_location",
          "type": "text",
          "default_value": null
        },
        "geo_hash": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "geo_hash",
          "type": "bigint",
          "default_value": null
        },
        "goods_desc": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "goods_desc",
          "type": "text",
          "default_value": null
        },
        "dimen_length": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "dimen_length",
          "type": "smallint",
          "default_value": "0"
        },
        "dimen_width": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "dimen_width",
          "type": "smallint",
          "default_value": "0"
        },
        "dimen_height": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "dimen_height",
          "type": "smallint",
          "default_value": "0"
        },
        "load_time": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "load_time",
          "type": "bigint",
          "default_value": null
        },
        "load_duration": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "load_duration",
          "type": "float",
          "default_value": null
        },
        "customer_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "customer_id",
          "type": "int",
          "default_value": null
        },
        "num_vehicles": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "num_vehicles",
          "type": "int",
          "default_value": null
        },
        "cancelled_by": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "cancelled_by",
          "type": "int",
          "default_value": "0"
        },
        "unique_key": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "unique_key",
          "type": "bigint",
          "default_value": null
        },
        "payment_mode": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_mode",
          "type": "int",
          "default_value": null
        },
        "restart_bid_count": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "restart_bid_count",
          "type": "int",
          "default_value": "0"
        },
        "status": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "status",
          "type": "int",
          "default_value": "0"
        },
        "unload_duration": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "unload_duration",
          "type": "float",
          "default_value": null
        },
        "vehicle": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "vehicle",
          "type": "varchar(50)",
          "default_value": null
        },
        "vehicle_category": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "vehicle_category",
          "type": "varchar(20)",
          "default_value": null
        },
        "goods_weight": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "goods_weight",
          "type": "int",
          "default_value": null
        },
        "weight_unit": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "weight_unit",
          "type": "varchar(5)",
          "default_value": null
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "accept_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "accept_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "completion_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "completion_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "cancellation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "cancellation_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "net_amount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "net_amount",
          "type": "int",
          "default_value": "0"
        },
        "amount_paid": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "amount_paid",
          "type": "int",
          "default_value": "0"
        },
        "rating": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "partner_payments",
      "columns": {
        "transaction_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "paid_amount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "paid_amount",
          "type": "int",
          "default_value": null
        },
        "order_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "order_id",
          "type": "int",
          "default_value": null
        },
        "payment_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "description": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "description",
          "type": "text",
          "default_value": null
        },
        "transaction_type": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transaction_type",
          "type": "int",
          "default_value": null
        },
        "payment_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payment_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "status": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "status",
          "type": "tinyint",
          "default_value": "0"
        },
        "related_transaction_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "related_transaction_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "remark": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "remark",
          "type": "text",
          "default_value": null
        },
        "payer_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "payer_id",
          "type": "int",
          "default_value": null
        },
        "refund_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "refund_id",
          "type": "varchar(80)",
          "default_value": null
        },
        "refund_amount": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "refund_amount",
          "type": "int",
          "default_value": "0"
        },
        "refund_description": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "refund_description",
          "type": "text",
          "default_value": null
        },
        "cancellation_charge": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "cancellation_charge",
          "type": "int",
          "default_value": "0"
        },
        "cancelled_by": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "cancelled_by",
          "type": "tinyint",
          "default_value": "0"
        },
        "cancellation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "cancellation_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "partners",
      "columns": {
        "id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "name": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "name",
          "type": "varchar(30)",
          "default_value": null
        },
        "mobile": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "mobile",
          "type": "varchar(15)",
          "default_value": null
        },
        "email": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "email",
          "type": "varchar(30)",
          "default_value": null
        },
        "company": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "company",
          "type": "varchar(100)",
          "default_value": null
        },
        "location": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "location",
          "type": "text",
          "default_value": null
        },
        "latitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "latitude",
          "type": "double",
          "default_value": "0"
        },
        "longitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "longitude",
          "type": "double",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "rated_by": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "rated_by",
          "type": "int",
          "default_value": "0"
        },
        "rating": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "rating",
          "type": "double",
          "default_value": "3"
        },
        "docs_mask": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "docs_mask",
          "type": "int",
          "default_value": "0"
        },
        "balance": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "balance",
          "type": "int",
          "default_value": "0"
        },
        "verified": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "verified",
          "type": "tinyint(1)",
          "default_value": "0"
        },
        "verification_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "verification_timestamp",
          "type": "bigint",
          "default_value": "0"
        },
        "enabled": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "enabled",
          "type": "tinyint(1)",
          "default_value": "1"
        },
        "account_ifsc": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "account_ifsc",
          "type": "varchar(30)",
          "default_value": null
        },
        "account_number": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "saved_places",
      "columns": {
        "id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "address": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "address",
          "type": "varchar(50)",
          "default_value": null
        },
        "latitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "latitude",
          "type": "double",
          "default_value": null
        },
        "longitude": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "longitude",
          "type": "double",
          "default_value": null
        },
        "saved_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "saved_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "transporter_id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "transporter_id",
          "type": "int",
          "default_value": null
        },
        "notify": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "notify",
          "type": "tinyint(1)",
          "default_value": "0"
        },
        "geo_hash": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "vehicle_categories",
      "columns": {
        "id": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "category": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "category",
          "type": "varchar(25)",
          "default_value": null
        },
        "image_path": {
          "accessible": true,
          "update": true,
          "delete": false,
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
      "update_rows": true,
      "insert_rows": false,
      "delete_rows": false,
      "slug": "vehicles",
      "columns": {
        "vehicle_number": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "vehicle_number",
          "type": "varchar(30)",
          "default_value": null
        },
        "vehicle": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "vehicle",
          "type": "varchar(30)",
          "default_value": null
        },
        "verified": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "verified",
          "type": "tinyint(1)",
          "default_value": "0"
        },
        "owner": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "owner",
          "type": "int",
          "default_value": null
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "verification_timestamp": {
          "accessible": true,
          "update": true,
          "delete": false,
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