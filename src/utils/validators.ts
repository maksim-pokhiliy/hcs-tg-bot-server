export const validateEmail = (email: string): boolean => {
  return Boolean(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
};
