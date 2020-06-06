module.exports = {
  user: 'root',
  password: 'md*#aamir',
  database: 'deporter',
  host: 'localhost',
  port: 3306,
  serverPort: 5000,
  dbType: 'mysql',
  tables: {
    allowed_vehicles: {
      accessible: true,
      update_rows: true,
      insert_rows: true,
      delete_rows: true,
      slug: 'allowed_vehicles',
      columns: {
        id: {
          accessible: true,
          update: true,
          insert: true,
          slug: 'id',
          type: 'text',
          otype: 'varchar(10)',
          default: null,
          nullable: false
        },
        brand: {
          accessible: true,
          update: true,
          insert: true,
          slug: 'brand',
          type: 'text',
          otype: 'varchar(25)',
          default: null,
          nullable: false
        },
        name: {
          accessible: true,
          update: true,
          insert: true,
          slug: 'name',
          type: 'text',
          otype: 'varchar(100)',
          default: null,
          nullable: false
        },
        image_path: {
          accessible: true,
          update: true,
          insert: true,
          slug: 'image_path',
          type: 'text',
          otype: 'varchar(10)',
          default: null,
          nullable: true
        },
        payload_kgs: {
          accessible: true,
          update: true,
          insert: true,
          slug: 'payload_kgs',
          type: 'number',
          otype: 'int',
          default: '0',
          nullable: true
        },
        category: {
          accessible: true,
          update: true,
          insert: true,
          slug: 'category',
          type: 'text',
          otype: 'varchar(25)',
          default: null,
          nullable: true
        }
      },
      key: [
        'id'
      ]
    }
  }
}
