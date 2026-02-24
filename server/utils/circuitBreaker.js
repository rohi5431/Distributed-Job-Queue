let failureCount = 0;
const MAX_FAILURE = 3;

const circuitBreaker = async (fn) => {
  if (failureCount >= MAX_FAILURE) {
    throw new Error("Circuit breaker open");
  }

  try {
    const result = await fn();
    failureCount = 0;
    return result;
  } catch (err) {
    failureCount++;
    throw err;
  }
};

module.exports = circuitBreaker;