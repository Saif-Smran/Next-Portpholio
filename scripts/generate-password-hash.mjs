import bcrypt from 'bcryptjs';

const password = process.argv[2] || 'admin123';
const saltRounds = 10;

const hash = bcrypt.hashSync(password, saltRounds);

console.log(`\nGenerated bcrypt password hash for "${password}":\n`);
console.log(hash);
console.log('\nAdd this to your .env file as:');
console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
