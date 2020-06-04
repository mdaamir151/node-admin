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
          "slug": "id",
          "type": "varchar(10)",
          "default_value": null
        },
        "brand": {
          "accessible": true,
          "update": true,
          "slug": "brand",
          "type": "varchar(25)",
          "default_value": null
        },
        "name": {
          "accessible": true,
          "update": true,
          "slug": "name",
          "type": "varchar(100)",
          "default_value": null
        },
        "image_path": {
          "accessible": true,
          "update": true,
          "slug": "image_path",
          "type": "varchar(10)",
          "default_value": null
        },
        "payload_kgs": {
          "accessible": true,
          "update": true,
          "slug": "payload_kgs",
          "type": "int",
          "default_value": "0"
        },
        "category": {
          "accessible": true,
          "update": true,
          "slug": "category",
          "type": "varchar(25)",
          "default_value": null
        }
      },
      "key": [
        "id"
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
          "slug": "id",
          "type": "int",
          "default_value": null
        },
        "name": {
          "accessible": true,
          "update": true,
          "slug": "name",
          "type": "varchar(30)",
          "default_value": null
        },
        "mobile": {
          "accessible": true,
          "update": true,
          "slug": "mobile",
          "type": "varchar(15)",
          "default_value": null
        },
        "email": {
          "accessible": true,
          "update": true,
          "slug": "email",
          "type": "varchar(30)",
          "default_value": null
        },
        "company": {
          "accessible": true,
          "update": true,
          "slug": "company",
          "type": "varchar(100)",
          "default_value": null
        },
        "location": {
          "accessible": true,
          "update": true,
          "slug": "location",
          "type": "text",
          "default_value": null
        },
        "latitude": {
          "accessible": true,
          "update": true,
          "slug": "latitude",
          "type": "double",
          "default_value": "0"
        },
        "longitude": {
          "accessible": true,
          "update": true,
          "slug": "longitude",
          "type": "double",
          "default_value": "0"
        },
        "creation_timestamp": {
          "accessible": true,
          "update": true,
          "slug": "creation_timestamp",
          "type": "bigint",
          "default_value": null
        },
        "balance": {
          "accessible": true,
          "update": true,
          "slug": "balance",
          "type": "int",
          "default_value": "0"
        },
        "enabled": {
          "accessible": true,
          "update": true,
          "slug": "enabled",
          "type": "tinyint(1)",
          "default_value": "1"
        }
      },
      "key": [
        "id"
      ]
    }
  }
}