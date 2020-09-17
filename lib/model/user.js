const pool = require('../utils/pool');

class User {
    id;
    email;
    buy;

    constructor(row) {
      this.id = row.id;
      this.email = row.email;
      this.buy = row.buy;
    }

    static async insert(user) {
      const { rows } = await pool.query(
        'INSERT INTO users (email, buy) VALUES ($1, $2) RETURNING *', [user.email, user.buy]
      );

      return new User(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM users'
      );
      return rows.map(row => new User(row));
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING *', [id]
      );
      return new User(rows[0]);
    }
}

module.exports = User;
