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

  it('finds all users with find', async() => {
    await Promise.all([
      User.insert({
        email: 'test1',
        buy: '$100'
      }),
      User.insert({
        email: 'test2',
        buy: '$200'
      }),
      User.insert({
        email: 'test3',
        buy: '$300'
      })
    ]);
    const users = await User.find();

    expect(users).toEqual(expect.arrayContaining([
      { id: expect.any(String), email: 'test1', buy: '$100' },
      { id: expect.any(String), email: 'test2', buy: '$200' },
      { id: expect.any(String), email: 'test3', buy: '$300' }
    ]));
  });

  it('deletes a row by id with delete', async() => {
    const testUser = await User.insert({
      email: 'test@test.test',
      buy: '$100'
    });

    const deletedUser = await User.delete(testUser.id);

    expect(deletedUser).toEqual({
      id: testUser.id,
      email: 'test@test.test',
      buy: '$100'
    });
  });
});
