const fs = require('fs');
const User = require('./user');
const pool = require('../utils/pool');

describe('User model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('insert a new user into the data', async() => {
    const testUser = await User.insert({
      email: 'test@test.test',
      buy: '$100'
    });

    const { rows } = await pool.query(
      'SELECT * FROM Users WHERE id = $1',
      [testUser.id]
    );

    expect(rows[0]).toEqual({
      id: testUser.id,
      email: 'test@test.test',
      buy: '$100'
    });
  });
});
