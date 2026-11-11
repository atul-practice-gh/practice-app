const MAX_NAME_LENGTH = 50;

// Returns a greeting for `name`. A missing or blank name greets the world.
// Names longer than MAX_NAME_LENGTH are cut, so the reply stays short.
export function greet(name) {
  const trimmed = typeof name === 'string' ? name.trim() : '';
  if (trimmed === '') {
    return 'Hello, world!';
  }
  return `Hello, ${trimmed.slice(0, MAX_NAME_LENGTH)}!`;
}
