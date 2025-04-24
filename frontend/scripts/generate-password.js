const bcrypt = require('bcryptjs')

async function generateHash(password) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  console.log('Password hash:', hash)
}

generateHash('admin123') 