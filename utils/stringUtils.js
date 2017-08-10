export default function initialCase(str) {
  return str.length ? str[0].toUpperCase() + str.slice(1) : ''
}