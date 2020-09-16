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
}

module.exports = User;
